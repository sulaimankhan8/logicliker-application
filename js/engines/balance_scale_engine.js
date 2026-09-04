/**
 * LogicLike Stage 2: Drag & Drop Balance Scale Physics Engine
 * Full-fledged engine for visual balance scales, weight physics, and algebraic equilibrium.
 * Features:
 * - HTML5 & Touch Drag-and-Drop onto Left & Right scale pans
 * - Real-time physics beam tilt animation based on mass differential
 * - Interactive weight removal by clicking/dragging off pans
 * - Equilibrium status badge (Balanced vs Tilted Left/Right)
 * - Supports metric weights (kg) & visual object weights (Apples, Cats, Blocks)
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

    // Draggable weights bank click & drag handlers
    wrapper.querySelectorAll('.weight-chip.draggable').forEach(chip => {
      chip.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', chip.getAttribute('data-weight'));
      });
      chip.addEventListener('click', () => {
        const weightVal = chip.getAttribute('data-weight');
        const numericW = parseInt(weightVal) || weightVal;
        sound.playTap();
        this.rightWeights.push(numericW);
        this.updatePhysicsBeam(wrapper);
      });
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

    // Update Equilibrium Status Text & Styling
    if (diff === 0 && leftTotal > 0) {
      statusText.textContent = `Balanced! Both Pans = ${leftTotal} kg ✅`;
      statusBar.className = 'equilibrium-status-bar balanced';
    } else if (diff < 0) {
      statusText.textContent = `Tilting Left ⬅️ (Left ${leftTotal} kg > Right ${rightTotal} kg)`;
      statusBar.className = 'equilibrium-status-bar tilted-left';
    } else {
      statusText.textContent = `Tilting Right ➡️ (Right ${rightTotal} kg > Left ${leftTotal} kg)`;
      statusBar.className = 'equilibrium-status-bar tilted-right';
    }
  }

  verifyEquilibrium() {
    const leftTotal = this.sumWeights(this.leftWeights);
    const rightTotal = this.sumWeights(this.rightWeights);

    const targetTotal = this.currentStage.requiredRightTotal || leftTotal;

    if (leftTotal === rightTotal && rightTotal === targetTotal) {
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

    const leftTotal = this.sumWeights(this.leftWeights);
    const currentRightTotal = this.sumWeights(this.rightWeights);
    const needed = leftTotal - currentRightTotal;

    if (this.hintStep === 1) {
      btnHint.textContent = '💡 Hint: Step 2/3 (Highlight Weight)';
      alert(`💡 BALANCE EQUATIONS CLUE:\n\nLeft Pan Total = ${leftTotal} kg.\nRight Pan currently has ${currentRightTotal} kg.`);
    } else if (this.hintStep === 2) {
      btnHint.textContent = '💡 Hint: Step 3/3 (Show Solution)';
      const targetWeight = this.currentStage.correctWeightToDrop;
      if (targetWeight) {
        const weightChip = wrapperEl.querySelector(`[data-weight="${targetWeight}"]`);
        if (weightChip) {
          weightChip.classList.add('hint-clue-pulse');
          setTimeout(() => weightChip.classList.remove('hint-clue-pulse'), 2500);
        }
      }
    } else if (this.hintStep === 3) {
      btnHint.textContent = '💡 Hint Used (Reset)';
      alert(`💡 GUIDED BALANCE EXPLANATION:\n\n${this.currentStage.hint}`);
    }
  }
}
