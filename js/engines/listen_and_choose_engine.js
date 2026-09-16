/**
 * Kiddy Learn - Listen & Choose Engine
 */

import { sound } from '../audio.js';
import { getSvgIcon } from '../icons.js';

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
        <button class="btn-main-speaker" id="btn-main-speaker" title="Tap to listen">
          <span class="speaker-icon">${getSvgIcon('speaker', 'icon-md')}</span>
          <div class="sound-wave-bars" id="sound-wave-bars">
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
            <span class="wave-bar"></span>
          </div>
        </button>
        <div class="listen-info-group">
          <span class="listen-tag">${getSvgIcon('listen-and-choose', 'icon-xs')} Listen & Tap</span>
          <h3 class="listen-instruction-text">Tap speaker to listen again</h3>
          <div class="phonetic-pill" id="phonetic-pill" style="display:none;">
            <span>Phonics: <strong>${phonetic}</strong></span>
          </div>
        </div>
      </div>
    `;

    wrapper.appendChild(speakerStation);

    // Options Grid
    const options = stage.options || [
      { id: 'opt1', icon: 'star', label: 'Star', isCorrect: true },
      { id: 'opt2', icon: 'shape-moon', label: 'Moon', isCorrect: false },
      { id: 'opt3', icon: 'star-filled', label: 'Sun', isCorrect: false },
      { id: 'opt4', icon: 'spatial-3d', label: 'Planet', isCorrect: false }
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
          <div class="card-visual-icon">${getSvgIcon(opt.icon, 'icon-lg')}</div>
          <div class="card-visual-label">${opt.label}</div>
        </div>
        <div class="card-selection-indicator">${getSvgIcon('check', 'icon-xs')}</div>
      `;

      card.addEventListener('click', () => {
        if (this.eliminatedOptionIds.has(opt.id)) return;
        this.handleOptionClick(opt, card, targetWord);
      });

      gridEl.appendChild(card);
    });

    wrapper.appendChild(gridEl);

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar listen-toolbar';
    toolbar.innerHTML = `
      <button class="btn-secondary" id="btn-listen-slow">${getSvgIcon('speaker', 'icon-xs')} <span>Slow</span></button>
      <button class="btn-engine-hint" id="btn-listen-hint">${getSvgIcon('hint', 'icon-xs')} <span>Hint</span></button>
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
  }

  playWordAudio(word, isSlow = false, onComplete = null) {
    const speakerBtn = document.getElementById('btn-main-speaker');
    const waveBars = document.getElementById('sound-wave-bars');

    sound.init();
    sound.stopSpeech();

    const onStart = () => {
      if (speakerBtn) speakerBtn.classList.add('is-active-speaker');
      if (waveBars) waveBars.classList.add('playing');
    };

    const onEnd = () => {
      if (speakerBtn) speakerBtn.classList.remove('is-active-speaker');
      if (waveBars) waveBars.classList.remove('playing');
      if (onComplete) onComplete();
    };

    sound.speak(word, onStart, onEnd);
  }

  handleOptionClick(opt, cardEl, targetWord) {
    if (opt.isCorrect) {
      sound.playSuccess();
      sound.playStar();
      cardEl.classList.add('correct-glow');

      setTimeout(() => {
        this.app.handleCorrectAnswer();
      }, 500);
    } else {
      sound.playError();
      cardEl.classList.add('wrong-wobble');

      setTimeout(() => {
        cardEl.classList.remove('wrong-wobble');
        this.app.handleWrongAnswer(`You chose "${opt.label}". Listen closely for "${targetWord}"!`);
      }, 500);
    }
  }

  executeHint(wrapperEl, targetWord, options) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapperEl.querySelector('#btn-listen-hint');
    const phoneticPill = wrapperEl.querySelector('#phonetic-pill');

    if (this.hintStep === 1) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint (2/3)</span>`;
      if (phoneticPill) phoneticPill.style.display = 'inline-flex';
      this.playWordAudio(targetWord, true);
    } else if (this.hintStep === 2) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint (3/3)</span>`;
      const wrongOptions = options.filter(o => !o.isCorrect && !this.eliminatedOptionIds.has(o.id));
      if (wrongOptions.length > 0) {
        const toElim = wrongOptions[0];
        this.eliminatedOptionIds.add(toElim.id);
        const cardEl = wrapperEl.querySelector(`[data-option-id="${toElim.id}"]`);
        if (cardEl) cardEl.classList.add('eliminated-fade');
      }
      this.playWordAudio(targetWord);
    } else {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint Used</span>`;
      const correctOpt = options.find(o => o.isCorrect);
      if (correctOpt) {
        const cardEl = wrapperEl.querySelector(`[data-option-id="${correctOpt.id}"]`);
        if (cardEl) {
          cardEl.classList.add('hint-clue-pulse');
          setTimeout(() => cardEl.classList.remove('hint-clue-pulse'), 2500);
        }
      }
    }
  }
}
