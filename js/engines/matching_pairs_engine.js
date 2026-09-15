/**
 * Kiddy Learn - Matching Pairs Connection Engine
 */

import { sound } from '../audio.js';
import { getSvgIcon } from '../icons.js';

const PAIR_COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#3B82F6'];

export class MatchingPairsEngine {
  constructor(appController) {
    this.app = appController;
    this.currentStage = null;
    this.connections = new Map(); // leftId -> rightId
    this.selectedLeft = null;
    this.selectedRight = null;
    this.hintStep = 0;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.connections.clear();
    this.selectedLeft = null;
    this.selectedRight = null;
    this.hintStep = 0;

    containerEl.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'matching-engine-wrapper';

    const board = document.createElement('div');
    board.className = 'matching-board';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'matching-svg-overlay');
    svg.setAttribute('id', 'matching-svg-overlay');
    board.appendChild(svg);

    // Left Column
    const leftCol = document.createElement('div');
    leftCol.className = 'matching-column left-column';

    stage.pairs.forEach((pair) => {
      const card = document.createElement('div');
      card.className = 'matching-node left-node';
      card.setAttribute('data-left-id', pair.id);
      card.innerHTML = `
        <div class="node-content">
          ${pair.leftIcon ? `<span class="node-icon">${getSvgIcon(pair.leftIcon, 'icon-sm')}</span>` : ''}
          <span class="node-text">${pair.leftText}</span>
        </div>
        <div class="connect-port-dot port-right"></div>
      `;

      card.addEventListener('click', () => {
        sound.playTap();
        this.handleLeftClick(pair.id, wrapper);
      });

      leftCol.appendChild(card);
    });

    board.appendChild(leftCol);

    // Right Column
    const rightCol = document.createElement('div');
    rightCol.className = 'matching-column right-column';

    const rightItems = stage.rightItems || [...stage.pairs].reverse();

    rightItems.forEach((rItem) => {
      const card = document.createElement('div');
      card.className = 'matching-node right-node';
      card.setAttribute('data-right-id', rItem.id);
      card.innerHTML = `
        <div class="connect-port-dot port-left"></div>
        <div class="node-content">
          ${rItem.rightIcon ? `<span class="node-icon">${getSvgIcon(rItem.rightIcon, 'icon-sm')}</span>` : ''}
          <span class="node-text">${rItem.rightText}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        sound.playTap();
        this.handleRightClick(rItem.id, wrapper);
      });

      rightCol.appendChild(card);
    });

    board.appendChild(rightCol);
    wrapper.appendChild(board);

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar';
    toolbar.innerHTML = `
      <button class="btn-balance-check" id="btn-submit-matching">${getSvgIcon('check', 'icon-xs')} <span>Check</span></button>
      <button class="btn-engine-hint" id="btn-trigger-hint">${getSvgIcon('hint', 'icon-xs')} <span>Hint (1/3)</span></button>
    `;

    toolbar.querySelector('#btn-submit-matching').addEventListener('click', () => {
      this.verifyPairs();
    });

    toolbar.querySelector('#btn-trigger-hint').addEventListener('click', () => {
      this.executeHint(wrapper);
    });

    wrapper.appendChild(toolbar);
    containerEl.appendChild(wrapper);

    window.addEventListener('resize', () => this.drawLines(wrapper));
    setTimeout(() => this.drawLines(wrapper), 50);
  }

  handleLeftClick(leftId, wrapper) {
    if (this.connections.has(leftId)) {
      this.connections.delete(leftId);
      this.selectedLeft = null;
      this.updateSelectionStyles(wrapper);
      this.drawLines(wrapper);
      return;
    }

    if (this.selectedLeft === leftId) {
      this.selectedLeft = null;
    } else {
      this.selectedLeft = leftId;
      if (this.selectedRight) {
        this.makeConnection(this.selectedLeft, this.selectedRight, wrapper);
        this.selectedLeft = null;
        this.selectedRight = null;
      }
    }

    this.updateSelectionStyles(wrapper);
  }

  handleRightClick(rightId, wrapper) {
    for (const [lId, rId] of this.connections.entries()) {
      if (rId === rightId) {
        this.connections.delete(lId);
        this.selectedRight = null;
        this.updateSelectionStyles(wrapper);
        this.drawLines(wrapper);
        return;
      }
    }

    if (this.selectedRight === rightId) {
      this.selectedRight = null;
    } else {
      this.selectedRight = rightId;
      if (this.selectedLeft) {
        this.makeConnection(this.selectedLeft, this.selectedRight, wrapper);
        this.selectedLeft = null;
        this.selectedRight = null;
      }
    }

    this.updateSelectionStyles(wrapper);
  }

  makeConnection(leftId, rightId, wrapper) {
    sound.playStar();
    for (const [lId, rId] of this.connections.entries()) {
      if (lId === leftId || rId === rightId) {
        this.connections.delete(lId);
      }
    }

    this.connections.set(leftId, rightId);
    this.updateSelectionStyles(wrapper);
    this.drawLines(wrapper);
  }

  updateSelectionStyles(wrapper) {
    const leftNodes = wrapper.querySelectorAll('.left-node');
    leftNodes.forEach(node => {
      const id = node.getAttribute('data-left-id');
      const isSelected = this.selectedLeft === id;
      const isConnected = this.connections.has(id);
      node.classList.toggle('selected-node', isSelected);
      node.classList.toggle('connected-node', isConnected);
    });

    const rightNodes = wrapper.querySelectorAll('.right-node');
    rightNodes.forEach(node => {
      const id = node.getAttribute('data-right-id');
      const isSelected = this.selectedRight === id;
      let isConnected = false;
      for (const rId of this.connections.values()) {
        if (rId === id) { isConnected = true; break; }
      }
      node.classList.toggle('selected-node', isSelected);
      node.classList.toggle('connected-node', isConnected);
    });
  }

  drawLines(wrapper) {
    const svg = wrapper.querySelector('#matching-svg-overlay');
    if (!svg) return;

    const board = wrapper.querySelector('.matching-board');
    if (!board) return;

    const boardRect = board.getBoundingClientRect();
    svg.setAttribute('width', boardRect.width);
    svg.setAttribute('height', boardRect.height);

    const activeKeys = new Set();
    let colorIdx = 0;

    for (const [leftId, rightId] of this.connections.entries()) {
      const key = `${leftId}->${rightId}`;
      activeKeys.add(key);

      const leftEl = wrapper.querySelector(`.left-node[data-left-id="${leftId}"] .port-right`);
      const rightEl = wrapper.querySelector(`.right-node[data-right-id="${rightId}"] .port-left`);

      if (leftEl && rightEl) {
        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();

        const x1 = leftRect.left + leftRect.width / 2 - boardRect.left;
        const y1 = leftRect.top + leftRect.height / 2 - boardRect.top;
        const x2 = rightRect.left + rightRect.width / 2 - boardRect.left;
        const y2 = rightRect.top + rightRect.height / 2 - boardRect.top;

        const color = PAIR_COLORS[colorIdx % PAIR_COLORS.length];
        colorIdx++;

        const dx = (x2 - x1) * 0.5;
        const pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

        let existingPath = svg.querySelector(`path[data-conn-key="${key}"]`);
        if (existingPath) {
          existingPath.setAttribute('d', pathData);
        } else {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('data-conn-key', key);
          path.setAttribute('d', pathData);
          path.setAttribute('stroke', color);
          path.setAttribute('stroke-width', '4');
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke-linecap', 'round');
          path.setAttribute('class', 'matching-cable-line matching-cable-new');
          svg.appendChild(path);

          setTimeout(() => {
            path.classList.remove('matching-cable-new');
          }, 350);
        }
      }
    }

    const allPaths = svg.querySelectorAll('path[data-conn-key]');
    allPaths.forEach(path => {
      const key = path.getAttribute('data-conn-key');
      if (!activeKeys.has(key)) {
        path.remove();
      }
    });
  }

  verifyPairs() {
    const totalPairs = this.currentStage.pairs.length;
    if (this.connections.size < totalPairs) {
      sound.playError();
      alert(`Connect all ${totalPairs} pairs before checking!`);
      return;
    }

    let isAllCorrect = true;
    for (const pair of this.currentStage.pairs) {
      if (this.connections.get(pair.id) !== pair.id) {
        isAllCorrect = false;
        break;
      }
    }

    if (isAllCorrect) {
      sound.playSuccess();
      this.app.handleCorrectAnswer();
    } else {
      sound.playError();
      this.app.handleWrongAnswer(this.currentStage.review);
    }
  }

  executeHint(wrapper) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapper.querySelector('#btn-trigger-hint');

    if (this.hintStep === 1) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint (2/3)</span>`;
      alert(`Clue: ${this.currentStage.hint}`);
    } else if (this.hintStep === 2) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint (3/3)</span>`;
      const targetPair = this.currentStage.pairs.find(p => this.connections.get(p.id) !== p.id);
      if (targetPair) {
        this.makeConnection(targetPair.id, targetPair.id, wrapper);
      }
    } else if (this.hintStep === 3) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint Used</span>`;
      alert(`Reasoning: ${this.currentStage.review}`);
    }
  }
}
