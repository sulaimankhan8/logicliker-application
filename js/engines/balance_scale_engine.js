/**
 * LogicLike Stage 2: Drag & Drop Balance Scale Physics Engine
 * Universal Pointer & Touch Drag-and-Drop + Tap-to-Place Engine
 * Features:
 * - HTML5, Pointer Events, and Touch Drag-and-Drop onto Scale Pans
 * - Real-time physics beam tilt animation based on mass differential
 * - Interactive weight removal by clicking placed weight chips
 * - Equilibrium status badge (Balanced vs Tilted Left/Right)
 * - 3-step hint engine for physics deduction
 */

import { sound } from '../audio.js';

export class BalanceScaleEngine {
  constructor(appController) {
    this.app = appController;
    this.currentStage = null;
    this.leftWeights = [];
    this.rightWeights = [];
    this.hintStep = 0;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.leftWeights = [...(stage.leftWeights || [])];
    this.rightWeights = [...(stage.rightWeights || [])];
    this.hintStep = 0;

    containerEl.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'balance-engine-wrapper';

    wrapper.innerHTML = `
      <div class="equilibrium-status-bar" id="equilibrium-status">
        <span class="status-icon">⚖️</span>
        <span class="status-text" id="status-text">Scale Unbalanced</span>
      </div>

      <div class="balance-beam-wrapper">
        <div class="scale-beam" id="scale-beam">
          <div class="scale-pan-hanger left">
            <div class="pan-string"></div>
            <div class="scale-pan" id="left-pan"></div>
          </div>
          <div class="scale-pan-hanger right">
            <div class="pan-string"></div>
            <div class="scale-pan target-dropzone" id="right-pan"></div>
          </div>
        </div>
        <div class="scale-fulcrum"></div>
      </div>

      <p class="weights-bank-title">Available Weights (Drag or Click to place on Right Pan):</p>

      <div class="weights-bank" id="weights-bank">
        ${stage.availableWeights.map(w => `
          <div class="weight-chip draggable" draggable="true" data-weight="${w}">
            ⚖️ ${typeof w === 'number' ? w + ' kg' : w}
          </div>
        `).join('')}
      </div>

      <div class="engine-toolbar">
        <button class="btn-balance-check" id="btn-verify-balance">⚖️ Check Balance & Submit</button>
        <button class="btn-engine-hint" id="btn-trigger-hint">💡 Use Hint (Step 1/3)</button>
      </div>
    `;

    // Dropzone listeners for Right Pan
    const rightPan = wrapper.querySelector('#right-pan');

    rightPan.addEventListener('dragover', (e) => {
      e.preventDefault();
      rightPan.classList.add('drag-over');
    });

    rightPan.addEventListener('dragleave', () => {
      rightPan.classList.remove('drag-over');
    });

    rightPan.addEventListener('drop', (e) => {
      e.preventDefault();
      rightPan.classList.remove('drag-over');
      const weightVal = e.dataTransfer.getData('text/plain');
      const numericW = parseInt(weightVal) || weightVal;
      if (numericW) {
        sound.playTap();
        this.rightWeights.push(numericW);
        this.updatePhysicsBeam(wrapper);
      }
    });

    // Draggable weights bank click & universal pointer drag handlers
    wrapper.querySelectorAll('.weight-chip.draggable').forEach(chip => {
      const weightVal = chip.getAttribute('data-weight');
      const numericW = parseInt(weightVal) || weightVal;

      this.bindUniversalWeightDrag(chip, numericW, wrapper);
    });

    // Verify button handler
    wrapper.querySelector('#btn-verify-balance').addEventListener('click', () => {
      this.verifyEquilibrium();
    });

    // Hint button handler
    wrapper.querySelector('#btn-trigger-hint').addEventListener('click', () => {
      this.executeHint(wrapper);
    });

    containerEl.appendChild(wrapper);
    setTimeout(() => this.updatePhysicsBeam(wrapper), 50);
  }

  bindUniversalWeightDrag(chipEl, numericW, wrapper) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let floatingAvatar = null;

    const onPointerDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;

      isDragging = false;
      startX = e.clientX;
      startY = e.clientY;

      const onPointerMove = (moveEvt) => {
        const dx = moveEvt.clientX - startX;
        const dy = moveEvt.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 5) {
          isDragging = true;
          floatingAvatar = document.createElement('div');
          floatingAvatar.className = 'dragging-floating-chip';
          floatingAvatar.innerHTML = `<span>⚖️ ${numericW} kg</span>`;
          document.body.appendChild(floatingAvatar);
        }

        if (isDragging && floatingAvatar) {
          floatingAvatar.style.left = `${moveEvt.clientX}px`;
          floatingAvatar.style.top = `${moveEvt.clientY}px`;

          const elemBelow = document.elementFromPoint(moveEvt.clientX, moveEvt.clientY);
          const isOverPan = elemBelow ? elemBelow.closest('#right-pan') : null;
          const rightPan = wrapper.querySelector('#right-pan');
          if (rightPan) rightPan.classList.toggle('drag-over', !!isOverPan);
        }
      };

      const onPointerUp = (upEvt) => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);

        const rightPan = wrapper.querySelector('#right-pan');
        if (rightPan) rightPan.classList.remove('drag-over');

        if (isDragging) {
          if (floatingAvatar) {
            floatingAvatar.remove();
            floatingAvatar = null;
          }

          const elemBelow = document.elementFromPoint(upEvt.clientX, upEvt.clientY);
          const isOverPan = elemBelow ? elemBelow.closest('#right-pan') : null;

          if (isOverPan) {
            sound.playTap();
            this.rightWeights.push(numericW);
            this.updatePhysicsBeam(wrapper);
            return;
          }
        } else {
          // It was a tap / click: place weight directly on right pan
          sound.playTap();
          this.rightWeights.push(numericW);
          this.updatePhysicsBeam(wrapper);
        }
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    };

    chipEl.addEventListener('pointerdown', onPointerDown);

    chipEl.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', numericW);
    });
  }

  sumWeights(arr) {
    return arr.reduce((acc, w) => {
      if (typeof w === 'number') return acc + w;
      return acc + (this.currentStage.objectValues?.[w] || 1);
    }, 0);
  }

  updatePhysicsBeam(wrapperEl) {
    const leftTotal = this.sumWeights(this.leftWeights);
    const rightTotal = this.sumWeights(this.rightWeights);

    const beam = wrapperEl.querySelector('#scale-beam');
    const leftPanEl = wrapperEl.querySelector('#left-pan');
    const rightPanEl = wrapperEl.querySelector('#right-pan');
    const statusText = wrapperEl.querySelector('#status-text');
    const statusBar = wrapperEl.querySelector('#equilibrium-status');

    if (!beam || !leftPanEl || !rightPanEl) return;

    // Beam tilt calculation (-25° to +25°)
    const diff = rightTotal - leftTotal;
    const tiltAngle = Math.max(-25, Math.min(25, diff * 4.5));
    beam.style.transform = `rotate(${tiltAngle}deg)`;

    leftPanEl.style.transform = `rotate(${-tiltAngle}deg)`;
    rightPanEl.style.transform = `rotate(${-tiltAngle}deg)`;

    // Render Left Pan items
    leftPanEl.innerHTML = this.leftWeights.map(w => `
      <div class="weight-chip static-weight">${typeof w === 'number' ? w + ' kg' : w}</div>
    `).join('');

    // Render Right Pan items with click-to-remove capability
    rightPanEl.innerHTML = this.rightWeights.map((w, idx) => `
      <div class="weight-chip removable-weight" data-remove-index="${idx}" title="Click to remove">
        ${typeof w === 'number' ? w + ' kg' : w} <span class="remove-x">×</span>
      </div>
    `).join('');

    // Re-bind removal clicks
    rightPanEl.querySelectorAll('.removable-weight').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const removeIdx = parseInt(el.getAttribute('data-remove-index'));
        sound.playTap();
        this.rightWeights.splice(removeIdx, 1);
        this.updatePhysicsBeam(wrapperEl);
      });
    });

    // Update Status Indicator
    if (diff === 0 && leftTotal > 0) {
      statusBar.className = 'equilibrium-status-bar balanced';
      statusText.textContent = `⚖️ Balanced in Perfect Equilibrium (${leftTotal} kg = ${rightTotal} kg)`;
    } else if (diff > 0) {
      statusBar.className = 'equilibrium-status-bar tilted-right';
      statusText.textContent = `⚖️ Tilting Right ➔ (Right ${rightTotal} kg > Left ${leftTotal} kg)`;
    } else {
      statusBar.className = 'equilibrium-status-bar tilted-left';
      statusText.textContent = `⚖️ Tilting Left ⬅️ (Left ${leftTotal} kg > Right ${rightTotal} kg)`;
    }
  }

  verifyEquilibrium() {
    const leftTotal = this.sumWeights(this.leftWeights);
    const rightTotal = this.sumWeights(this.rightWeights);

    if (rightTotal === 0) {
      sound.playError();
      alert("⚠️ Place weights on the Right Pan first!");
      return;
    }

    if (leftTotal === rightTotal && rightTotal === this.currentStage.requiredRightTotal) {
      sound.playSuccess();
      this.app.handleCorrectAnswer();
    } else {
      sound.playError();
      this.app.handleWrongAnswer(this.currentStage.review);
    }
  }

  executeHint(wrapperEl) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapperEl.querySelector('#btn-trigger-hint');

    if (this.hintStep === 1) {
      btnHint.textContent = '💡 Hint: Step 2/3 (Highlight Weight)';
      const targetW = this.currentStage.correctWeightToDrop;
      const targetChip = wrapperEl.querySelector(`.weight-chip.draggable[data-weight="${targetW}"]`);
      if (targetChip) {
        targetChip.classList.add('hint-clue-pulse');
        setTimeout(() => targetChip.classList.remove('hint-clue-pulse'), 2500);
      }
    } else if (this.hintStep === 2) {
      btnHint.textContent = '💡 Hint: Step 3/3 (Auto Place)';
      alert(`💡 BALANCE PHYSICS HINT:\n\nLeft pan total is ${this.sumWeights(this.leftWeights)} kg. Right pan currently has ${this.sumWeights(this.rightWeights)} kg.`);
    } else if (this.hintStep === 3) {
      btnHint.textContent = '💡 Hint Used (Reset)';
      const targetW = this.currentStage.correctWeightToDrop;
      this.rightWeights = [this.currentStage.requiredRightTotal];
      this.updatePhysicsBeam(wrapperEl);
      alert(`💡 GUIDED REASONING:\n\n${this.currentStage.review}`);
    }
  }
}
