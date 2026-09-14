/**
 * LogicLike Listen & Choose (Spoken Word & Select Image) Engine
 * Features:
 * - Automatically speaks the target word/question on stage load.
 * - Pulsing animated speaker box with dynamic sound wave bars.
 * - Tap speaker to replay pronunciation with phonetic syllable display.
 * - Visual option cards with icons, labels, and rewarding tactile animations.
 * - 3-step hint engine (Slow pronunciation -> Eliminate 1 wrong choice -> Highlight correct choice).
 */

import { sound } from '../audio.js';

export class ListenAndChooseEngine {
  constructor(appController) {
    this.app = appController;
    this.currentStage = null;
    this.hintStep = 0;
    this.eliminatedOptionIds = new Set();
    this.isSpeaking = false;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.hintStep = 0;
    this.eliminatedOptionIds.clear();
    this.isSpeaking = false;

    containerEl.innerHTML = '';

    const targetWord = stage.spokenWord || stage.targetWord || 'Star';
    const phonetic = stage.phonetic || targetWord;

    const wrapper = document.createElement('div');
    wrapper.className = 'listen-engine-wrapper';

    // Center Hero Audio Speaker Station
    const speakerStation = document.createElement('div');
    speakerStation.className = 'listen-speaker-station';
    speakerStation.innerHTML = `
      <div class="listen-speaker-card" id="listen-speaker-card">
        <button class="btn-main-speaker" id="btn-main-speaker" title="Click to hear word">
          <span class="speaker-icon">🔊</span>
          <div class="sound-wave-bars" id="sound-wave-bars">
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
          </div>
        </button>
        <div class="listen-info-group">
          <span class="listen-tag">👂 LISTEN & IDENTIFY</span>
          <h3 class="listen-instruction-text">Tap speaker to hear the word again</h3>
          <div class="phonetic-pill" id="phonetic-pill" style="display:none;">
            <span>Phonics: <strong>${phonetic}</strong></span>
          </div>
        </div>
      </div>
    `;

    wrapper.appendChild(speakerStation);

    // Options Grid
    const options = stage.options || [
      { id: 'opt1', icon: '⭐', label: 'Star', isCorrect: true },
      { id: 'opt2', icon: '🌙', label: 'Moon', isCorrect: false },
      { id: 'opt3', icon: '☀️', label: 'Sun', isCorrect: false },
      { id: 'opt4', icon: '🪐', label: 'Planet', isCorrect: false }
    ];

    const gridEl = document.createElement('div');
    const cols = options.length <= 3 ? options.length : (options.length === 4 ? 2 : 3);
    gridEl.className = `listen-options-grid grid-cols-${cols}`;
    gridEl.id = 'listen-options-grid';

    options.forEach((opt, idx) => {
      const card = document.createElement('div');
      card.className = 'interactive-card-node listen-choice-card';
      card.setAttribute('data-option-id', opt.id);
      card.setAttribute('data-option-index', idx);

      card.innerHTML = `
        <div class="card-inner-content">
          <div class="card-visual-icon">${opt.icon}</div>
          <div class="card-visual-label">${opt.label}</div>
        </div>
        <div class="card-selection-indicator">✓</div>
      `;

      card.addEventListener('click', () => {
        if (this.eliminatedOptionIds.has(opt.id)) return;
        this.handleOptionClick(opt, card, targetWord);
      });

      gridEl.appendChild(card);
    });

    wrapper.appendChild(gridEl);

    // Toolbar (Hint & Replay)
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar listen-toolbar';
    toolbar.innerHTML = `
      <button class="btn-secondary" id="btn-listen-slow">🐢 Slow Voice</button>
      <button class="btn-engine-hint" id="btn-listen-hint">💡 Hint</button>
    `;

    toolbar.querySelector('#btn-listen-slow').addEventListener('click', () => {
      this.playWordAudio(targetWord, true);
    });

    toolbar.querySelector('#btn-listen-hint').addEventListener('click', () => {
      this.executeHint(wrapper, targetWord, options);
    });

    wrapper.appendChild(toolbar);
    containerEl.appendChild(wrapper);

    // Bind Speaker click
    const btnSpeaker = speakerStation.querySelector('#btn-main-speaker');
    btnSpeaker.addEventListener('click', () => {
      this.playWordAudio(targetWord);
    });

    // Auto speak word upon stage start
    setTimeout(() => {
      this.playWordAudio(targetWord);
    }, 350);
  }

  playWordAudio(word, isSlow = false) {
    const speakerBtn = document.getElementById('btn-main-speaker');
    const waveBars = document.getElementById('sound-wave-bars');
    
    if (speakerBtn) speakerBtn.classList.add('is-active-speaker');
    if (waveBars) waveBars.classList.add('playing');

    sound.init();
    sound.playTap();

    if (window.speechSynthesis && !sound.muted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = isSlow ? 0.65 : 0.9;
      utterance.pitch = 1.15;

      utterance.onstart = () => {
        if (speakerBtn) speakerBtn.classList.add('is-active-speaker');
        if (waveBars) waveBars.classList.add('playing');
      };

      utterance.onend = () => {
        if (speakerBtn) speakerBtn.classList.remove('is-active-speaker');
        if (waveBars) waveBars.classList.remove('playing');
      };

      utterance.onerror = () => {
        if (speakerBtn) speakerBtn.classList.remove('is-active-speaker');
        if (waveBars) waveBars.classList.remove('playing');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        if (speakerBtn) speakerBtn.classList.remove('is-active-speaker');
        if (waveBars) waveBars.classList.remove('playing');
      }, 1200);
    }
  }

  handleOptionClick(opt, cardEl, targetWord) {
    if (opt.isCorrect) {
      sound.playSuccess();
      sound.playSparkle();
      cardEl.classList.add('correct-glow');

      sound.speak(`Awesome! That is ${opt.label}!`);

      setTimeout(() => {
        this.app.handleCorrectAnswer();
      }, 700);
    } else {
      sound.playError();
      cardEl.classList.add('wrong-wobble');

      sound.speak(`That is ${opt.label}! Listen again for ${targetWord}.`);

      setTimeout(() => {
        cardEl.classList.remove('wrong-wobble');
        this.app.handleWrongAnswer(`You selected "${opt.label}", but the spoken word was "${targetWord}". Listen closely to the sound!`);
      }, 600);
    }
  }

  executeHint(wrapperEl, targetWord, options) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapperEl.querySelector('#btn-listen-hint');
    const phoneticPill = wrapperEl.querySelector('#phonetic-pill');

    if (this.hintStep === 1) {
      btnHint.textContent = '💡 Hint: Step 2/3 (Eliminate Option)';
      if (phoneticPill) phoneticPill.style.display = 'inline-flex';
      this.playWordAudio(targetWord, true);
    } else if (this.hintStep === 2) {
      btnHint.textContent = '💡 Hint: Step 3/3 (Show Answer)';
      const wrongOptions = options.filter(o => !o.isCorrect && !this.eliminatedOptionIds.has(o.id));
      if (wrongOptions.length > 0) {
        const toElim = wrongOptions[0];
        this.eliminatedOptionIds.add(toElim.id);
        const cardEl = wrapperEl.querySelector(`[data-option-id="${toElim.id}"]`);
        if (cardEl) cardEl.classList.add('eliminated-fade');
      }
      this.playWordAudio(targetWord);
    } else {
      btnHint.textContent = '💡 Hint Used (Reset)';
      const correctOpt = options.find(o => o.isCorrect);
      if (correctOpt) {
        const cardEl = wrapperEl.querySelector(`[data-option-id="${correctOpt.id}"]`);
        if (cardEl) {
          cardEl.classList.add('hint-clue-pulse');
          setTimeout(() => cardEl.classList.remove('hint-clue-pulse'), 2500);
        }
      }
      alert(`💡 LISTENING HINT:\n\n${this.currentStage.hint || `The target word is "${targetWord}". Choose the image that shows ${correctOpt ? correctOpt.label : 'it'}!`}`);
    }
  }
}
