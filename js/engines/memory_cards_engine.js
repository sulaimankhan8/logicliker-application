/**
 * Kiddy Learn - Memory Card Match & Shuffle Engine
 * Features:
 * - Phase 1 (Preview): Cards are shown face-up for 3 seconds with a countdown timer ("Memorize card positions!").
 * - Phase 2 (Flip & Shuffle): Cards smoothly flip face-down with 3D shuffle animation.
 * - Phase 3 (Interactive Matching): Tap to reveal cards, match pairs with emerald chimes, mismatch shake & flip back.
 * - Pair score & move counters, audio voiceover cues, and 3-step hint helper.
 */

import { sound } from '../audio.js';
import { getSvgIcon } from '../icons.js';

export class MemoryCardsEngine {
  constructor(appController) {
    this.app = appController;
    this.currentStage = null;
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairIds = new Set();
    this.movesCount = 0;
    this.totalPairs = 0;
    this.isLocked = true; // Locked during preview/shuffle
    this.previewTimer = null;
    this.previewInterval = null;
    this.hintStep = 0;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.flippedCards = [];
    this.matchedPairIds.clear();
    this.movesCount = 0;
    this.isLocked = true;
    this.hintStep = 0;
    if (this.previewTimer) clearTimeout(this.previewTimer);
    if (this.previewInterval) clearInterval(this.previewInterval);

    containerEl.innerHTML = '';

    // Generate Cards deck (2 instances per pair)
    const rawPairs = stage.pairs || [
      { id: 'p1', icon: 'puppy', label: 'Puppy' },
      { id: 'p2', icon: 'kitten', label: 'Kitten' },
      { id: 'p3', icon: 'bunny', label: 'Bunny' }
    ];

    this.totalPairs = rawPairs.length;
    let cardDeck = [];
    rawPairs.forEach((pair, pIdx) => {
      cardDeck.push({
        uid: `card_${pIdx}_a`,
        pairId: pair.id,
        icon: pair.icon,
        label: pair.label,
        color: pair.color || '#6366F1'
      });
      cardDeck.push({
        uid: `card_${pIdx}_b`,
        pairId: pair.id,
        icon: pair.icon,
        label: pair.label,
        color: pair.color || '#6366F1'
      });
    });

    // Shuffle deck
    if (stage.shuffle !== false) {
      cardDeck = this.shuffleArray(cardDeck);
    }
    this.cards = cardDeck;

    const wrapper = document.createElement('div');
    wrapper.className = 'memory-engine-wrapper';

    // Top status banner
    const topBar = document.createElement('div');
    topBar.className = 'memory-top-bar';
    topBar.innerHTML = `
      <div class="memory-phase-pill" id="memory-phase-pill">
        <span class="phase-icon" id="memory-phase-icon">${getSvgIcon('memory-cards', 'icon-xs')}</span>
        <span class="phase-text" id="memory-phase-text">Memorize cards! <strong id="memory-timer-sec">3</strong>s</span>
      </div>
      <div class="memory-score-pill">
        <span>Pairs: <strong id="memory-pairs-count">0 / ${this.totalPairs}</strong></span>
      </div>
    `;
    wrapper.appendChild(topBar);

    // Preview countdown progress bar
    const previewProgress = document.createElement('div');
    previewProgress.className = 'memory-preview-bar';
    previewProgress.innerHTML = `<div class="memory-preview-fill" id="memory-preview-fill"></div>`;
    wrapper.appendChild(previewProgress);

    // Grid of 3D Flip Cards
    const gridEl = document.createElement('div');
    const cols = this.cards.length <= 4 ? 2 : (this.cards.length <= 6 ? 3 : 4);
    gridEl.className = `memory-cards-grid grid-cols-${cols}`;
    gridEl.id = 'memory-cards-grid';

    this.cards.forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card is-flipped is-preview';
      cardEl.setAttribute('data-card-uid', card.uid);
      cardEl.setAttribute('data-pair-id', card.pairId);

      cardEl.innerHTML = `
        <div class="memory-card-inner">
          <div class="memory-card-front">
            <div class="card-pattern-symbol">${getSvgIcon('star-filled', 'icon-md')}</div>
          </div>
          <div class="memory-card-back" style="border-color:${card.color};">
            <div class="memory-card-icon">${getSvgIcon(card.icon, 'icon-lg')}</div>
            ${card.label ? `<div class="memory-card-label">${card.label}</div>` : ''}
            <div class="memory-match-badge">${getSvgIcon('check', 'icon-xs')}</div>
          </div>
        </div>
      `;

      cardEl.addEventListener('click', () => {
        if (this.isLocked) return;
        this.handleCardClick(card, cardEl);
      });

      gridEl.appendChild(cardEl);
    });

    wrapper.appendChild(gridEl);

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar memory-toolbar';
    toolbar.innerHTML = `
      <button class="btn-secondary" id="btn-memory-replay-preview">${getSvgIcon('memory-cards', 'icon-xs')} <span>Peek</span></button>
      <button class="btn-secondary" id="btn-memory-reshuffle">${getSvgIcon('replay', 'icon-xs')} <span>Reshuffle</span></button>
      <button class="btn-engine-hint" id="btn-memory-hint">${getSvgIcon('hint', 'icon-xs')} <span>Hint</span></button>
    `;

    toolbar.querySelector('#btn-memory-replay-preview').addEventListener('click', () => {
      sound.playTap();
      this.runQuickPeek();
    });

    toolbar.querySelector('#btn-memory-reshuffle').addEventListener('click', () => {
      sound.playTap();
      this.triggerReshuffle(wrapper);
    });

    toolbar.querySelector('#btn-memory-hint').addEventListener('click', () => {
      this.executeHint(wrapper);
    });

    wrapper.appendChild(toolbar);
    containerEl.appendChild(wrapper);

    // Start 3-second preview countdown
    this.startPreviewSequence(wrapper);
  }

  shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  startPreviewSequence(wrapperEl) {
    this.isLocked = true;
    let secondsLeft = 3;
    const timerText = wrapperEl.querySelector('#memory-timer-sec');
    const previewFill = wrapperEl.querySelector('#memory-preview-fill');

    if (previewFill) {
      previewFill.style.transition = 'width 3s linear';
      previewFill.style.width = '0%';
    }

    this.previewInterval = setInterval(() => {
      secondsLeft--;
      if (timerText) timerText.textContent = Math.max(0, secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(this.previewInterval);
      }
    }, 1000);

    this.previewTimer = setTimeout(() => {
      this.runPhysicalShuffleSequence(wrapperEl);
    }, 3200);
  }

  runPhysicalShuffleSequence(wrapperEl) {
    this.isLocked = true;
    const phasePill = wrapperEl.querySelector('#memory-phase-pill');
    if (phasePill) {
      phasePill.innerHTML = `<span class="phase-icon">🔀</span> <span class="phase-text">Shuffling cards...</span>`;
    }

    const gridEl = wrapperEl.querySelector('#memory-cards-grid');
    const allCards = Array.from(wrapperEl.querySelectorAll('.memory-card'));

    // Step 1: Flip all cards face down
    sound.playFlip();
    allCards.forEach((cardEl, idx) => {
      cardEl.classList.remove('is-preview');
      setTimeout(() => {
        cardEl.classList.remove('is-flipped');
      }, idx * 40);
    });

    // Step 2: Start 3D Physical Shuffle Gather & Riffle after cards flip
    setTimeout(() => {
      this.performCardDeckShuffle(gridEl, allCards, () => {
        this.isLocked = false;
        if (phasePill) {
          phasePill.innerHTML = `<span class="phase-icon">🎯</span> <span class="phase-text">Find the matching pairs!</span>`;
        }
        sound.speak('Find the matching pairs!');
      });
    }, allCards.length * 40 + 350);
  }

  performCardDeckShuffle(gridEl, allCards, onComplete) {
    if (!gridEl || allCards.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    sound.playShuffle();
    const gridRect = gridEl.getBoundingClientRect();
    const gridCenterX = gridRect.left + gridRect.width / 2;
    const gridCenterY = gridRect.top + gridRect.height / 2;

    // Phase A: Gather into center stack
    allCards.forEach((cardEl, idx) => {
      const cardRect = cardEl.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const dx = gridCenterX - cardCenterX;
      const dy = gridCenterY - cardCenterY;
      const rot = (idx % 2 === 0 ? -1 : 1) * ((idx * 3.5) % 15);

      cardEl.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
      cardEl.style.zIndex = `${50 + idx}`;
      cardEl.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(0.92)`;
      cardEl.classList.add('is-shuffling');
    });

    // Phase B: Riffle shuffle criss-cross fan out
    setTimeout(() => {
      sound.playFlip();
      allCards.forEach((cardEl, idx) => {
        const isLeft = idx % 2 === 0;
        const fanOffset = isLeft ? -75 : 75;
        const fanRot = isLeft ? -22 : 22;
        const cardRect = cardEl.getBoundingClientRect();
        const currentTransform = cardEl.style.transform;
        // Parse translate
        const match = currentTransform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
        const curDx = match ? parseFloat(match[1]) : 0;
        const curDy = match ? parseFloat(match[2]) : 0;

        cardEl.style.transition = 'transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)';
        cardEl.style.transform = `translate(${curDx + fanOffset}px, ${curDy - 15}px) rotate(${fanRot}deg) scale(0.96)`;
      });

      // Interweave back together
      setTimeout(() => {
        sound.playShuffle();
        allCards.forEach((cardEl, idx) => {
          const match = cardEl.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
          const curDx = match ? parseFloat(match[1]) : 0;
          const curDy = match ? parseFloat(match[2]) : 0;
          const newRot = (idx % 2 === 0 ? 6 : -6);

          cardEl.style.transition = 'transform 0.25s ease-in-out';
          cardEl.style.transform = `translate(${curDx * 0.2}px, ${curDy + 15}px) rotate(${newRot}deg) scale(0.94)`;
        });

        // Phase C: Deal cards out sequentially back to their slots
        setTimeout(() => {
          allCards.forEach((cardEl, idx) => {
            setTimeout(() => {
              sound.playTap();
              cardEl.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
              cardEl.style.transform = 'translate(0px, 0px) rotate(0deg) scale(1)';
              cardEl.classList.add('card-land-pop');

              setTimeout(() => {
                cardEl.style.transform = '';
                cardEl.style.transition = '';
                cardEl.style.zIndex = '';
                cardEl.classList.remove('is-shuffling', 'card-land-pop');
              }, 420);
            }, idx * 60);
          });

          setTimeout(() => {
            if (onComplete) onComplete();
          }, allCards.length * 60 + 450);
        }, 320);
      }, 300);
    }, 500);
  }

  triggerReshuffle(wrapperEl) {
    if (this.isLocked) return;
    this.isLocked = true;
    sound.playTap();

    // Reset currently flipped unmatched cards
    this.flippedCards.forEach(fc => {
      fc.cardEl.classList.remove('is-flipped');
    });
    this.flippedCards = [];

    const unmatchedCards = Array.from(wrapperEl.querySelectorAll('.memory-card:not(.is-matched)'));
    const gridEl = wrapperEl.querySelector('#memory-cards-grid');

    const phasePill = wrapperEl.querySelector('#memory-phase-pill');
    if (phasePill) {
      phasePill.innerHTML = `<span class="phase-icon">🔀</span> <span class="phase-text">Reshuffling...</span>`;
    }

    this.performCardDeckShuffle(gridEl, unmatchedCards, () => {
      this.isLocked = false;
      if (phasePill) {
        phasePill.innerHTML = `<span class="phase-icon">🎯</span> <span class="phase-text">Find the matching pairs!</span>`;
      }
    });
  }

  runQuickPeek() {
    if (this.isLocked) return;
    this.isLocked = true;
    sound.playFlip();

    const unmatchedCards = document.querySelectorAll('.memory-card:not(.is-matched)');
    unmatchedCards.forEach(c => c.classList.add('is-flipped'));

    setTimeout(() => {
      unmatchedCards.forEach(c => {
        if (!this.flippedCards.some(fc => fc.cardEl === c)) {
          c.classList.remove('is-flipped');
        }
      });
      this.isLocked = false;
    }, 1400);
  }

  handleCardClick(card, cardEl) {
    if (cardEl.classList.contains('is-flipped') || cardEl.classList.contains('is-matched')) {
      return;
    }

    if (this.flippedCards.length >= 2) return;

    sound.playFlip();
    cardEl.classList.add('is-flipped');
    this.flippedCards.push({ card, cardEl });

    if (this.flippedCards.length === 2) {
      this.movesCount++;
      this.isLocked = true;
      this.checkSelectedPair();
    }
  }

  checkSelectedPair() {
    const [c1, c2] = this.flippedCards;
    const isMatch = c1.card.pairId === c2.card.pairId;

    if (isMatch) {
      setTimeout(() => {
        sound.playSuccess();
        sound.playSparkle();

        c1.cardEl.classList.add('is-matched', 'correct-glow');
        c2.cardEl.classList.add('is-matched', 'correct-glow');

        this.matchedPairIds.add(c1.card.pairId);
        this.flippedCards = [];
        this.isLocked = false;

        const countEl = document.getElementById('memory-pairs-count');
        if (countEl) countEl.textContent = `${this.matchedPairIds.size} / ${this.totalPairs}`;

        if (this.matchedPairIds.size === this.totalPairs) {
          this.triggerVictory();
        }
      }, 350);
    } else {
      setTimeout(() => {
        sound.playError();
        c1.cardEl.classList.add('wrong-wobble');
        c2.cardEl.classList.add('wrong-wobble');

        setTimeout(() => {
          c1.cardEl.classList.remove('wrong-wobble', 'is-flipped');
          c2.cardEl.classList.remove('wrong-wobble', 'is-flipped');
          this.flippedCards = [];
          this.isLocked = false;
        }, 700);
      }, 500);
    }
  }

  triggerVictory() {
    this.isLocked = true;
    sound.playSuccess();
    sound.playFanfare();

    const grid = document.getElementById('memory-cards-grid');
    if (grid) grid.classList.add('victory-pulse');

    setTimeout(() => {
      this.app.handleCorrectAnswer();
    }, 900);
  }

  executeHint(wrapperEl) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapperEl.querySelector('#btn-memory-hint');

    if (this.hintStep === 1) {
      btnHint.textContent = '💡 Hint: Step 2/3 (Peek 1 Pair)';
      // Flash 1 unmatched pair
      const unmatchedPairId = [...this.cards.map(c => c.pairId)].find(id => !this.matchedPairIds.has(id));
      if (unmatchedPairId) {
        const pairCards = wrapperEl.querySelectorAll(`[data-pair-id="${unmatchedPairId}"]`);
        pairCards.forEach(c => c.classList.add('hint-clue-pulse', 'is-flipped'));
        setTimeout(() => {
          pairCards.forEach(c => {
            c.classList.remove('hint-clue-pulse');
            if (!c.classList.contains('is-matched')) c.classList.remove('is-flipped');
          });
        }, 1800);
      }
    } else if (this.hintStep === 2) {
      btnHint.textContent = '💡 Hint: Step 3/3 (Solve 1 Pair)';
      // Permanently lock & match 1 pair
      const unmatchedPairId = [...this.cards.map(c => c.pairId)].find(id => !this.matchedPairIds.has(id));
      if (unmatchedPairId) {
        const pairCards = wrapperEl.querySelectorAll(`[data-pair-id="${unmatchedPairId}"]`);
        pairCards.forEach(c => c.classList.add('is-flipped', 'is-matched', 'correct-glow'));
        this.matchedPairIds.add(unmatchedPairId);
        const countEl = document.getElementById('memory-pairs-count');
        if (countEl) countEl.textContent = `${this.matchedPairIds.size} / ${this.totalPairs}`;
        if (this.matchedPairIds.size === this.totalPairs) {
          this.triggerVictory();
        }
      }
    } else {
      btnHint.textContent = '💡 Hint Used (Reset)';
      alert(`💡 MEMORY MATCH TIP:\n\n${this.currentStage.hint || 'Pay close attention to where each image was during the preview, and open two cards that have the identical item!'}`);
    }
  }
}
