/**
 * LogicLike Stage 1: Card Grid Selection Engine
 * Full-fledged engine for Odd One Out, Sequence Completion, Pattern Matching, and Classification.
 * Supports:
 * - 2x2, 3x3, 4x4 grids & horizontal sequence rows
 * - Magnetic card selection with visual/audio feedback
 * - Non-punitive error wobble animation
 * - 3-Step Guided Hint System:
 *   Step 1: Glow highlight on key visual clue
 *   Step 2: Eliminate 1 incorrect card from grid
 *   Step 3: Step-by-step guided deduction rule modal
 */

import { sound } from '../audio.js';

export class CardGridEngine {
  constructor(appController) {
    this.app = appController;
    this.currentStage = null;
    this.hintStep = 0;
    this.eliminatedCards = new Set();
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.hintStep = 0;
    this.eliminatedCards.clear();

    containerEl.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'card-engine-wrapper';

    // Sequence Banner (for pattern/sequence puzzle types)
    if (stage.sequenceDisplay) {
      const seqBanner = document.createElement('div');
      seqBanner.className = 'sequence-display-banner';
      seqBanner.innerHTML = `
        <span class="seq-label">Sequence:</span>
        <div class="seq-items-row">
          ${stage.sequenceDisplay.map(item => `<span class="seq-item-chip">${item}</span>`).join('')}
        </div>
      `;
      wrapper.appendChild(seqBanner);
    }

    // Grid Layout determination
    const cardCount = stage.cards.length;
    let gridClass = 'cards-grid-4';
    if (stage.layout === '2x2' || cardCount === 4) gridClass = 'cards-grid-2x2';
    else if (stage.layout === '3x3' || cardCount === 9) gridClass = 'cards-grid-3x3';
    else if (stage.layout === 'sequence-row') gridClass = 'cards-grid-row';

    const gridEl = document.createElement('div');
    gridEl.className = `cards-grid-container ${gridClass}`;

    stage.cards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'interactive-card-node';
      cardEl.setAttribute('data-card-id', card.id);
      cardEl.setAttribute('data-card-index', index);

      cardEl.innerHTML = `
        <div class="card-inner-content">
          <div class="card-visual-icon">${card.icon}</div>
          ${card.label ? `<div class="card-visual-label">${card.label}</div>` : ''}
        </div>
        <div class="card-selection-indicator">✓</div>
      `;

      cardEl.addEventListener('click', () => {
        if (this.eliminatedCards.has(card.id)) return;
        this.handleCardClick(card, cardEl);
      });

      gridEl.appendChild(cardEl);
    });

    wrapper.appendChild(gridEl);

    // Engine Control Toolbar (Hint counter & Audio read out)
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar';
    toolbar.innerHTML = `
      <button class="btn-engine-hint" id="btn-trigger-hint">💡 Use Hint (Step 1/3)</button>
    `;

    toolbar.querySelector('#btn-trigger-hint').addEventListener('click', () => {
      this.executeHint(wrapper);
    });

    wrapper.appendChild(toolbar);
    containerEl.appendChild(wrapper);
  }

  handleCardClick(card, cardEl) {
    if (card.isCorrect) {
      sound.playSuccess();
      cardEl.classList.add('correct-glow');
      setTimeout(() => {
        this.app.handleCorrectAnswer();
      }, 400);
    } else {
      sound.playError();
      cardEl.classList.add('wrong-wobble');
      setTimeout(() => {
        cardEl.classList.remove('wrong-wobble');
        this.app.handleWrongAnswer(card.review || this.currentStage.review);
      }, 500);
    }
  }

  /**
   * 3-Step Guided Hint Engine
   */
  executeHint(wrapperEl) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapperEl.querySelector('#btn-trigger-hint');

    if (this.hintStep === 1) {
      // Step 1: Highlight visual clue
      btnHint.textContent = '💡 Hint: Step 2/3 (Eliminate Option)';
      const correctCard = this.currentStage.cards.find(c => c.isCorrect);
      if (correctCard) {
        const correctEl = wrapperEl.querySelector(`[data-card-id="${correctCard.id}"]`);
        if (correctEl) {
          correctEl.classList.add('hint-clue-pulse');
          setTimeout(() => correctEl.classList.remove('hint-clue-pulse'), 2500);
        }
      }
    } else if (this.hintStep === 2) {
      // Step 2: Eliminate 1 wrong option
      btnHint.textContent = '💡 Hint: Step 3/3 (Show Reasoning)';
      const wrongCards = this.currentStage.cards.filter(c => !c.isCorrect && !this.eliminatedCards.has(c.id));
      if (wrongCards.length > 0) {
        const targetElim = wrongCards[0];
        this.eliminatedCards.add(targetElim.id);
        const elimEl = wrapperEl.querySelector(`[data-card-id="${targetElim.id}"]`);
        if (elimEl) {
          elimEl.classList.add('eliminated-fade');
        }
      }
    } else if (this.hintStep === 3) {
      // Step 3: Step-by-step guided deduction
      btnHint.textContent = '💡 Hint Used (Reset)';
      alert(`💡 GUIDED LOGIC REASONING:\n\n${this.currentStage.hint}`);
    }
  }
}
