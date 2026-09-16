/**
 * Kiddy Learn - 3-Tier Adaptive Hint & Scaffolding Engine
 * Provides non-punitive guidance:
 * Tier 1: Soft Audio & Mascot Clue
 * Tier 2: Visual Target Highlight & Dimming Distractors
 * Tier 3: "Ghost Hand" gesture demo
 */

import { sound } from './audio.js';

export class HintEngine {
  constructor(mascot) {
    this.mascot = mascot;
    this.consecutiveMistakes = 0;
    this.currentGame = null;
    this.ghostHandEl = null;
  }

  setGame(gameContext) {
    this.currentGame = gameContext;
    this.consecutiveMistakes = 0;
    this.removeGhostHand();
    this.clearVisualHints();
  }

  recordMistake(clueText = null, targetSelector = null, fromSelector = null) {
    this.consecutiveMistakes++;
    if (this.mascot) {
      this.mascot.reactToMistake();
    }

    if (this.consecutiveMistakes === 1) {
      // Tier 1: Spoken gentle hint
      const prompt = clueText || "Look carefully at the colors and shapes! 🌈";
      setTimeout(() => {
        if (this.mascot) this.mascot.say(`💡 Hint: ${prompt}`, 'thinking', 4000, true);
      }, 800);
    } else if (this.consecutiveMistakes === 2) {
      // Tier 2: Visual glow highlight on target
      this.applyVisualHighlight(targetSelector);
      const prompt = clueText ? `Here is a clue: ${clueText}` : "Look at the glowing spot! ✨";
      setTimeout(() => {
        if (this.mascot) this.mascot.say(`✨ ${prompt}`, 'encouraging', 4000, true);
      }, 600);
    } else if (this.consecutiveMistakes >= 3) {
      // Tier 3: Ghost Hand demonstration
      this.applyVisualHighlight(targetSelector);
      this.showGhostHand(fromSelector, targetSelector);
      setTimeout(() => {
        if (this.mascot) this.mascot.say("Let's follow the magical pointer! 👆✨", 'cheering', 4000, true);
      }, 500);
    }
  }

  recordSuccess() {
    this.consecutiveMistakes = 0;
    this.removeGhostHand();
    this.clearVisualHints();
  }

  applyVisualHighlight(targetSelector) {
    this.clearVisualHints();
    if (!targetSelector) {
      // Fallback: look for primary option buttons in active game area
      const activeArea = document.getElementById('game-canvas-area') || document.querySelector('.game-board');
      if (activeArea) {
        const buttons = activeArea.querySelectorAll('.game-card, .matrix-cell, .option-pill, .drag-item');
        if (buttons.length > 0) {
          buttons[0].classList.add('hint-glow-pulse');
        }
      }
      return;
    }

    const targets = document.querySelectorAll(targetSelector);
    targets.forEach(el => el.classList.add('hint-glow-pulse'));
  }

  clearVisualHints() {
    document.querySelectorAll('.hint-glow-pulse').forEach(el => el.classList.remove('hint-glow-pulse'));
    document.querySelectorAll('.hint-dimmed').forEach(el => el.classList.remove('hint-dimmed'));
  }

  showGhostHand(fromSelector, toSelector) {
    this.removeGhostHand();

    const fromEl = fromSelector ? document.querySelector(fromSelector) : null;
    const toEl = toSelector ? document.querySelector(toSelector) : null;

    if (!fromEl && !toEl) return;

    const startRect = fromEl ? fromEl.getBoundingClientRect() : (toEl ? toEl.getBoundingClientRect() : null);
    const endRect = toEl ? toEl.getBoundingClientRect() : startRect;

    if (!startRect || !endRect) return;

    const ghost = document.createElement('div');
    ghost.className = 'ghost-hand-helper';
    ghost.id = 'active-ghost-hand';
    ghost.innerHTML = `
      <svg class="ghost-hand-svg" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" fill="#FBBF24" opacity="0.35"/>
        <path d="M22 18 C22 14, 28 14, 28 18 L28 32 C28 30, 32 30, 32 32 C32 30, 36 30, 36 32 L36 34 C36 32, 40 32, 40 34 L40 40 C40 48, 32 54, 24 54 C18 54, 14 48, 14 42 L14 30 C14 26, 22 26, 22 30 Z" fill="#FFFFFF" stroke="#D97706" stroke-width="2.5" stroke-linejoin="round"/>
        <circle cx="28" cy="18" r="3" fill="#FEF08A"/>
      </svg>
    `;

    document.body.appendChild(ghost);
    this.ghostHandEl = ghost;

    // Position ghost hand
    ghost.style.left = `${startRect.left + startRect.width / 2}px`;
    ghost.style.top = `${startRect.top + startRect.height / 2}px`;

    // Animate to target
    ghost.animate([
      { transform: 'translate(-50%, -50%) scale(1)', left: `${startRect.left + startRect.width / 2}px`, top: `${startRect.top + startRect.height / 2}px` },
      { transform: 'translate(-50%, -50%) scale(0.9)', left: `${startRect.left + startRect.width / 2}px`, top: `${startRect.top + startRect.height / 2}px`, offset: 0.2 },
      { transform: 'translate(-50%, -50%) scale(1)', left: `${endRect.left + endRect.width / 2}px`, top: `${endRect.top + endRect.height / 2}px`, offset: 0.8 },
      { transform: 'translate(-50%, -50%) scale(0.9)', left: `${endRect.left + endRect.width / 2}px`, top: `${endRect.top + endRect.height / 2}px`, offset: 1.0 }
    ], {
      duration: 1800,
      iterations: 3,
      easing: 'ease-in-out'
    }).onfinish = () => {
      this.removeGhostHand();
    };
  }

  removeGhostHand() {
    const hand = document.getElementById('active-ghost-hand');
    if (hand) hand.remove();
    this.ghostHandEl = null;
  }
}
