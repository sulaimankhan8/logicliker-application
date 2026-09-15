/**
 * Kiddy Learn - Rebus Math & Number Keypad Engine
 */

import { sound } from '../audio.js';
import { getSvgIcon } from '../icons.js';

export class RebusKeypadEngine {
  constructor(appController) {
    this.app = appController;
    this.currentStage = null;
    this.inputVal = '';
    this.hintStep = 0;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.inputVal = '';
    this.hintStep = 0;

    containerEl.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'rebus-engine-wrapper';

    // Equations Board
    let eqHTML = '<div class="rebus-equations-board">';
    stage.equations.forEach((eq, idx) => {
      eqHTML += `<div class="rebus-equation-row" id="rebus-eq-${idx}">`;
      eq.left.forEach(token => {
        if (['+', '-', '×', '÷', '='].includes(token)) {
          eqHTML += `<span class="rebus-op">${token}</span>`;
        } else {
          eqHTML += `<span class="rebus-symbol">${getSvgIcon(token, 'icon-sm')}</span>`;
        }
      });
      eqHTML += `<span class="rebus-op">=</span><span class="rebus-val">${eq.right}</span></div>`;
    });
    eqHTML += '</div>';

    eqHTML += `
      <div class="rebus-target-banner">
        <span>Value of ${getSvgIcon(stage.targetSymbol, 'icon-sm')} =</span>
        <div class="keypad-display-screen" id="rebus-input-screen">?</div>
      </div>
    `;

    wrapper.innerHTML = eqHTML;

    const keypad = document.createElement('div');
    keypad.className = 'keypad-grid';

    const updateDisplay = () => {
      const display = wrapper.querySelector('#rebus-input-screen');
      display.textContent = this.inputVal.length > 0 ? this.inputVal : '?';
    };

    // Numbers 1-9
    for (let i = 1; i <= 9; i++) {
      const btn = document.createElement('button');
      btn.className = 'keypad-btn';
      btn.textContent = i;
      btn.addEventListener('click', () => {
        sound.playTap();
        if (this.inputVal.length < 4) this.inputVal += i;
        updateDisplay();
      });
      keypad.appendChild(btn);
    }

    // Clear Button
    const btnClear = document.createElement('button');
    btnClear.className = 'keypad-btn action-btn';
    btnClear.textContent = 'C';
    btnClear.addEventListener('click', () => {
      sound.playTap();
      this.inputVal = '';
      updateDisplay();
    });
    keypad.appendChild(btnClear);

    // Number 0
    const btnZero = document.createElement('button');
    btnZero.className = 'keypad-btn';
    btnZero.textContent = '0';
    btnZero.addEventListener('click', () => {
      sound.playTap();
      if (this.inputVal.length > 0 && this.inputVal.length < 4) this.inputVal += '0';
      updateDisplay();
    });
    keypad.appendChild(btnZero);

    // Backspace Button
    const btnBack = document.createElement('button');
    btnBack.className = 'keypad-btn action-btn';
    btnBack.innerHTML = `${getSvgIcon('close', 'icon-xs')}`;
    btnBack.addEventListener('click', () => {
      sound.playTap();
      this.inputVal = this.inputVal.slice(0, -1);
      updateDisplay();
    });
    keypad.appendChild(btnBack);

    // Submit Button
    const btnSubmit = document.createElement('button');
    btnSubmit.className = 'keypad-btn submit';
    btnSubmit.innerHTML = `${getSvgIcon('check', 'icon-xs')} <span>SUBMIT</span>`;
    btnSubmit.addEventListener('click', () => {
      this.verifyAnswer();
    });
    keypad.appendChild(btnSubmit);

    wrapper.appendChild(keypad);

    // Hint Button Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar';
    toolbar.innerHTML = `
      <button class="btn-engine-hint" id="btn-trigger-hint">${getSvgIcon('hint', 'icon-xs')} <span>Hint (1/3)</span></button>
    `;

    toolbar.querySelector('#btn-trigger-hint').addEventListener('click', () => {
      this.executeHint(wrapper);
    });

    wrapper.appendChild(toolbar);
    containerEl.appendChild(wrapper);
  }

  verifyAnswer() {
    const num = parseInt(this.inputVal);
    if (num === this.currentStage.correctAnswer) {
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
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint (2/3)</span>`;
      const eq0 = wrapperEl.querySelector('#rebus-eq-0');
      if (eq0) {
        eq0.classList.add('hint-clue-pulse');
        setTimeout(() => eq0.classList.remove('hint-clue-pulse'), 2500);
      }
    } else if (this.hintStep === 2) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint (3/3)</span>`;
      alert(`Answer is around ${this.currentStage.correctAnswer}`);
    } else if (this.hintStep === 3) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint Used</span>`;
      alert(`Reasoning: ${this.currentStage.hint}`);
    }
  }
}
