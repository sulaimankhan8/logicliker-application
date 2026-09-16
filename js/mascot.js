/**
 * Kiddy Learn - Living Mascot Companion Engine ("Leo the Lion Cub")
 * Handles animated vector mascot, mood states, interactive speech bubbles, and costume rendering.
 */

import { sound } from './audio.js';

export class MascotCompanion {
  constructor(containerId = 'mascot-root') {
    this.container = document.getElementById(containerId);
    this.mood = 'idle'; // 'idle', 'curious', 'cheering', 'thinking', 'encouraging', 'sleepy'
    this.activeHat = 'party-hat'; // 'none', 'party-hat', 'crown', 'detective', 'cape'
    this.speechTimeout = null;
    this.idleTimer = null;
    this.isSleeping = false;
    
    this.quips = {
      idle: [
        "I'm ready for another fun puzzle! 🚀",
        "You're super smart! Let's play! ⭐",
        "Tap me for a high five! 🐾",
        "I wonder what exciting challenge is next! 🎈"
      ],
      curious: [
        "Ooh, let's explore this one! 👀",
        "What do you think the answer is? 🧐",
        "Look closely at the clues! 🔍"
      ],
      thinking: [
        "Hmm, let's put on our thinking caps! 🧠",
        "Take your time, no rush at all! ⏳",
        "You've got this! 🌟"
      ],
      cheering: [
        "WOOHOO! Brilliant job! 🎉",
        "High five! You nailed it! 🌟🐾",
        "You're a super brain star! ⭐✨",
        "Awesome teamwork! Let's keep going! 🏆"
      ],
      encouraging: [
        "Oopsie! That's okay, let's try again! 🌈",
        "Mistakes help our brain grow stronger! 💪",
        "So close! Take another look! 🔎"
      ],
      sleepy: [
        "*Yaaawn* Great learning today! Time for bed! 🌙💤",
        "Sleep tight little champion! See you tomorrow! ⭐😴"
      ]
    };

    this.init();
  }

  init() {
    if (!this.container) return;
    this.render();
    this.attachEvents();
    this.startIdleBlinkCycle();
  }

  render() {
    this.container.innerHTML = `
      <div class="mascot-companion-wrapper" id="mascot-wrapper" role="button" aria-label="Mascot Companion Leo" tabindex="0">
        <!-- Mascot Speech Bubble -->
        <div class="mascot-speech-bubble" id="mascot-bubble">
          <span class="bubble-text" id="mascot-bubble-text">Hi friend! Let's learn & play! 🦁✨</span>
          <button class="bubble-speaker-btn" id="btn-mascot-speak" title="Listen">
            <svg class="kiddy-icon icon-xs" viewBox="0 0 24 24" fill="none"><path d="M11 5L6 9H3C2.4 9 2 9.4 2 10V14C2 14.6 2.4 15 3 15H6L11 19V5Z" fill="currentColor"/><path d="M15.5 8.5C16.5 9.4 17 10.7 17 12C17 13.3 16.5 14.6 15.5 15.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>

        <!-- Living SVG Character -->
        <div class="mascot-avatar mood-${this.mood}" id="mascot-avatar">
          <!-- Mascot Body SVG -->
          <svg class="mascot-svg" viewBox="0 0 120 120" fill="none">
            <defs>
              <linearGradient id="leo-fur" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F59E0B"/>
                <stop offset="1" stop-color="#D97706"/>
              </linearGradient>
              <linearGradient id="leo-mane" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
                <stop stop-color="#EA580C"/>
                <stop offset="1" stop-color="#C2410C"/>
              </linearGradient>
              <linearGradient id="leo-muzzle" x1="40" y1="60" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FEF3C7"/>
                <stop offset="1" stop-color="#FDE68A"/>
              </linearGradient>
            </defs>

            <!-- Fluffy Mane -->
            <circle class="mascot-mane" cx="60" cy="60" r="48" fill="url(#leo-mane)"/>
            
            <!-- Mane Bumps for extra cuteness -->
            <circle cx="30" cy="30" r="14" fill="url(#leo-mane)"/>
            <circle cx="90" cy="30" r="14" fill="url(#leo-mane)"/>
            <circle cx="20" cy="60" r="14" fill="url(#leo-mane)"/>
            <circle cx="100" cy="60" r="14" fill="url(#leo-mane)"/>
            <circle cx="30" cy="90" r="14" fill="url(#leo-mane)"/>
            <circle cx="90" cy="90" r="14" fill="url(#leo-mane)"/>

            <!-- Ears -->
            <circle cx="32" cy="28" r="10" fill="url(#leo-fur)"/>
            <circle cx="32" cy="28" r="5" fill="#F472B6"/>
            <circle cx="88" cy="28" r="10" fill="url(#leo-fur)"/>
            <circle cx="88" cy="28" r="5" fill="#F472B6"/>

            <!-- Head Face -->
            <circle class="mascot-head" cx="60" cy="62" r="36" fill="url(#leo-fur)"/>

            <!-- Rosy Cheeks -->
            <circle cx="38" cy="68" r="6" fill="#FB7185" opacity="0.6"/>
            <circle cx="82" cy="68" r="6" fill="#FB7185" opacity="0.6"/>

            <!-- Eyes -->
            <g class="mascot-eyes" id="mascot-eyes">
              <!-- Left Eye -->
              <ellipse class="eye eye-left" cx="46" cy="54" rx="6" ry="7" fill="#1E1B4B"/>
              <circle cx="48" cy="52" r="2.5" fill="#FFFFFF"/>
              <circle cx="44" cy="57" r="1.2" fill="#FFFFFF"/>

              <!-- Right Eye -->
              <ellipse class="eye eye-right" cx="74" cy="54" rx="6" ry="7" fill="#1E1B4B"/>
              <circle cx="76" cy="52" r="2.5" fill="#FFFFFF"/>
              <circle cx="72" cy="57" r="1.2" fill="#FFFFFF"/>
            </g>

            <!-- Muzzle & Cute Nose -->
            <ellipse cx="60" cy="72" rx="16" ry="12" fill="url(#leo-muzzle)"/>
            <path d="M56 66 C56 64, 64 64, 64 66 C64 68, 60 71, 60 71 C60 71, 56 68, 56 66 Z" fill="#9A3412"/>
            
            <!-- Mouth -->
            <path class="mascot-mouth" id="mascot-mouth" d="M54 73 Q60 78 66 73" stroke="#9A3412" stroke-width="2.5" stroke-linecap="round" fill="none"/>

            <!-- Paws -->
            <g class="mascot-paws">
              <ellipse cx="42" cy="94" rx="8" ry="6" fill="url(#leo-fur)" stroke="#B45309" stroke-width="1.5"/>
              <ellipse cx="78" cy="94" rx="8" ry="6" fill="url(#leo-fur)" stroke="#B45309" stroke-width="1.5"/>
            </g>

            <!-- Dynamic Costume Overlay -->
            <g class="mascot-costume" id="mascot-costume">
              ${this.renderCostumeSvg()}
            </g>
          </svg>
        </div>
      </div>
    `;
  }

  renderCostumeSvg() {
    if (this.activeHat === 'party-hat') {
      return `
        <!-- Party Cone Hat -->
        <polygon points="60,8 44,38 76,38" fill="#EC4899" stroke="#BE185D" stroke-width="1.5"/>
        <circle cx="60" cy="8" r="4" fill="#FBBF24"/>
        <circle cx="54" cy="24" r="2.5" fill="#38BDF8"/>
        <circle cx="66" cy="30" r="2.5" fill="#4ADE80"/>
      `;
    } else if (this.activeHat === 'crown') {
      return `
        <!-- Golden Crown -->
        <path d="M42 36 L46 20 L60 30 L74 20 L78 36 Z" fill="#FBBF24" stroke="#D97706" stroke-width="2"/>
        <circle cx="46" cy="18" r="2.5" fill="#EF4444"/>
        <circle cx="60" cy="28" r="2.5" fill="#3B82F6"/>
        <circle cx="74" cy="18" r="2.5" fill="#10B981"/>
      `;
    } else if (this.activeHat === 'detective') {
      return `
        <!-- Detective Cap & Glasses -->
        <ellipse cx="60" cy="32" rx="24" ry="7" fill="#78350F"/>
        <path d="M44 32 C44 20, 76 20, 76 32 Z" fill="#92400E"/>
        <!-- Glasses -->
        <circle cx="46" cy="54" r="9" fill="none" stroke="#F59E0B" stroke-width="2.5"/>
        <circle cx="74" cy="54" r="9" fill="none" stroke="#F59E0B" stroke-width="2.5"/>
        <line x1="55" y1="54" x2="65" y2="54" stroke="#F59E0B" stroke-width="2.5"/>
      `;
    }
    return '';
  }

  setCostume(hatName) {
    this.activeHat = hatName;
    const costumeEl = document.getElementById('mascot-costume');
    if (costumeEl) {
      costumeEl.innerHTML = this.renderCostumeSvg();
      sound.playSparkle();
      this.say("Look at my cool new look! ⭐🦁", 'cheering');
    }
  }

  attachEvents() {
    const wrapper = document.getElementById('mascot-wrapper');
    const speakBtn = document.getElementById('btn-mascot-speak');

    if (wrapper) {
      wrapper.addEventListener('click', (e) => {
        if (e.target.closest('#btn-mascot-speak')) return;
        this.handleTapTickle();
      });
    }

    if (speakBtn) {
      speakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = document.getElementById('mascot-bubble-text')?.innerText || '';
        sound.speak(text);
      });
    }
  }

  handleTapTickle() {
    if (this.isSleeping) {
      this.wakeUp();
      return;
    }
    sound.playGiggle();
    this.triggerAnimation('jiggle-tickle');
    const funnyQuips = [
      "Hehehe! That tickles!",
      "Hi friend! Let's learn and play!",
      "I'm ready for another fun puzzle! Let's go!"
    ];
    const quip = funnyQuips[Math.floor(Math.random() * funnyQuips.length)];
    this.say(quip, 'cheering', 3500, true);
  }

  setMood(mood) {
    this.mood = mood;
    const avatar = document.getElementById('mascot-avatar');
    if (avatar) {
      avatar.className = `mascot-avatar mood-${mood}`;
    }

    const mouth = document.getElementById('mascot-mouth');
    if (mouth) {
      if (mood === 'cheering') {
        mouth.setAttribute('d', 'M50 72 Q60 84 70 72'); // Big happy open smile
      } else if (mood === 'encouraging' || mood === 'thinking') {
        mouth.setAttribute('d', 'M54 75 Q60 72 66 75'); // Contemplative/soft smile
      } else if (mood === 'sleepy') {
        mouth.setAttribute('d', 'M56 74 Q60 76 64 74'); // Gentle sleeping curve
      } else {
        mouth.setAttribute('d', 'M54 73 Q60 78 66 73'); // Standard smile
      }
    }
  }

  say(text, mood = 'idle', duration = 4000, autoSpeak = false) {
    this.setMood(mood);
    const bubble = document.getElementById('mascot-bubble');
    const bubbleText = document.getElementById('mascot-bubble-text');

    if (bubble && bubbleText) {
      bubbleText.innerText = text;
      bubble.classList.add('active');

      if (autoSpeak) {
        sound.speak(text);
      }

      if (this.speechTimeout) clearTimeout(this.speechTimeout);
      if (duration > 0) {
        this.speechTimeout = setTimeout(() => {
          bubble.classList.remove('active');
          if (!this.isSleeping) this.setMood('idle');
        }, duration);
      }
    }
  }

  triggerAnimation(animClass) {
    const avatar = document.getElementById('mascot-avatar');
    if (!avatar) return;
    avatar.classList.add(animClass);
    setTimeout(() => {
      avatar.classList.remove(animClass);
    }, 1000);
  }

  reactToSuccess(gameTitle = 'challenge') {
    this.triggerAnimation('bounce-victory');
    const quips = [
      "WOOHOO! Brilliant job! You solved it!",
      "SUPERSTAR! That was amazing!",
      "You are a true logic champion!",
      "High five! That was super smart!",
      "Outstanding thinking! Keep going!"
    ];
    const text = quips[Math.floor(Math.random() * quips.length)];
    this.say(text, 'cheering', 4500, true);
  }

  reactToMistake() {
    this.triggerAnimation('soft-wobble');
    const quips = [
      "Oopsie! That's okay, let's try one more time!",
      "You're super close! Take another look!",
      "No worries! We learn by trying!",
      "Mistakes help our brain grow stronger!",
      "Almost there! Give it another try!"
    ];
    const text = quips[Math.floor(Math.random() * quips.length)];
    this.say(text, 'encouraging', 4000, true);
  }

  reactToGameStart(title, category) {
    this.setMood('thinking');
    this.say(`Let's solve ${title}! Listen to the question!`, 'thinking', 4000, false);
  }

  goToSleep(onComplete) {
    this.isSleeping = true;
    this.setMood('sleepy');
    sound.playSnooze();
    this.say("Yaaaawn... Great job today! Time for some sweet dreams! 🌙💤", 'sleepy', 0, true);
    if (onComplete) setTimeout(onComplete, 2000);
  }

  wakeUp() {
    this.isSleeping = false;
    sound.playSparkle();
    this.setMood('idle');
    this.say("Good morning! Ready to play & learn? ☀️🎈", 'cheering', 3500, true);
  }

  startIdleBlinkCycle() {
    setInterval(() => {
      if (this.isSleeping) return;
      const eyes = document.getElementById('mascot-eyes');
      if (eyes) {
        eyes.classList.add('blinking');
        setTimeout(() => eyes.classList.remove('blinking'), 250);
      }
    }, 4500);
  }
}
