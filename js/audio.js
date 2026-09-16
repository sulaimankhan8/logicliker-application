import { NeuralVoicePack } from './neural_voice_pack.js';
import { LocalHumanAudioEngine } from './local_human_audio.js';
import { PreCompiledAudioPlayer } from './audio_registry.js';

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.speechSynth = (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis : null;
    this.isSpeaking = false;
    this.voices = [];
    this.selectedVoice = null;
    this.voicePersona = 'playful-leo'; // 'storyteller', 'playful-leo', 'teacher'
    this.neuralPack = new NeuralVoicePack(null);
    this.localHuman = new LocalHumanAudioEngine(null);
    this.preCompiled = new PreCompiledAudioPlayer();
    this.activeSequenceTimers = [];
    
    this.initVoices();
  }

  getPersona() {
    return this.preCompiled ? this.preCompiled.getPersona() : 'child';
  }

  setPersona(persona) {
    if (this.preCompiled) {
      this.preCompiled.setPersona(persona);
    }
    this.voicePersona = persona === 'teacher' ? 'teacher' : 'playful-leo';
    this.selectedVoice = this.pickBestNaturalVoice();
    return this.getPersona();
  }

  togglePersona() {
    if (this.preCompiled) {
      const next = this.preCompiled.togglePersona();
      this.voicePersona = next === 'teacher' ? 'teacher' : 'playful-leo';
      this.selectedVoice = this.pickBestNaturalVoice();
      // Play switch confirmation voice clip
      const switchAudio = this.preCompiled.getPersonaSwitchAudio(next);
      if (switchAudio) {
        this.preCompiled.play(switchAudio);
      }
      return next;
    }
    return 'child';
  }

  initVoices() {
    if (!this.speechSynth) return;
    
    const loadVoices = () => {
      this.voices = this.speechSynth.getVoices() || [];
      this.selectedVoice = this.pickBestNaturalVoice();
    };

    loadVoices();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = loadVoices;
    }
  }

  pickBestNaturalVoice() {
    if (!this.voices || this.voices.length === 0) return null;

    // Filter English voices
    const enVoices = this.voices.filter(v => v.lang.startsWith('en'));
    const pool = enVoices.length > 0 ? enVoices : this.voices;

    const isTeacher = this.getPersona() === 'teacher';

    if (isTeacher) {
      const teacherKeywords = ['jenny', 'aria', 'susan', 'catherine', 'zira', 'female', 'natural', 'neural'];
      for (const kw of teacherKeywords) {
        const match = pool.find(v => v.name.toLowerCase().includes(kw));
        if (match) return match;
      }
    } else {
      const childKeywords = ['ana', 'emma', 'ava', 'samantha', 'victoria', 'natural', 'neural'];
      for (const kw of childKeywords) {
        const match = pool.find(v => v.name.toLowerCase().includes(kw));
        if (match) return match;
      }
    }

    return pool[0] || null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        if (this.neuralPack) this.neuralPack.setContext(this.ctx);
        if (this.localHuman) this.localHuman.setContext(this.ctx);
        if (this.kokoro) {
          this.kokoro.setContext(this.ctx);
          this.kokoro.init();
        }
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && this.speechSynth) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
    }
    return this.muted;
  }

  haptic(pattern = 15) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Safe fallback if permission not granted
      }
    }
  }

  hapticTap() {
    this.haptic(15);
  }

  hapticSuccess() {
    this.haptic([25, 40, 45, 40, 80]);
  }

  hapticError() {
    this.haptic([50, 60, 50]);
  }

  hapticStreak() {
    this.haptic([30, 40, 60, 40, 90, 40, 120]);
  }

  playTap() {
    this.hapticTap();
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playFlip() {
    this.hapticTap();
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.07);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.07);
  }

  playShuffle() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Crisp multi-card riffle shuffle audio synthesis
    const count = 6;
    for (let i = 0; i < count; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const startTime = this.ctx.currentTime + i * 0.045;
      osc.frequency.setValueAtTime(260 + (i * 35), startTime);
      osc.frequency.exponentialRampToValueAtTime(130, startTime + 0.04);
      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.04);
    }
  }

  playSparkle() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const freqs = [659.25, 830.61, 987.77, 1318.51];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const startTime = this.ctx.currentTime + idx * 0.04;
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });
  }

  playSuccess() {
    this.hapticSuccess();
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const startTime = this.ctx.currentTime + idx * 0.08;
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  playStar() {
    this.hapticTap();
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playError() {
    this.hapticError();
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(180, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playFanfare() {
    this.hapticSuccess();
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const startTime = this.ctx.currentTime + idx * 0.1;
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  playBoing() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(360, this.ctx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  playChestOpen() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const startTime = this.ctx.currentTime + idx * 0.07;
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  playGiggle() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const freqs = [600, 800, 650, 900, 750, 1000];
    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f;
      const st = this.ctx.currentTime + i * 0.04;
      gain.gain.setValueAtTime(0.15, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.035);
    });
  }

  playSnooze() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const chords = [523.25, 440.00, 349.23, 261.63]; // C5, A4, F4, C4
    chords.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f;
      const st = this.ctx.currentTime + i * 0.25;
      gain.gain.setValueAtTime(0.2, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(st);
      osc.stop(st + 0.7);
    });
  }

  speakStagePrompt(category, stageNum, fallbackText, onStart = null, onEnd = null) {
    if (this.muted) {
      if (onEnd) onEnd();
      return;
    }
    this.init();
    if (this.preCompiled) {
      const audioFile = this.preCompiled.getStagePromptAudio(category, stageNum);
      if (audioFile) {
        this.preCompiled.play(audioFile, onStart, onEnd);
        return;
      }
    }
    this.speak(fallbackText, onStart, onEnd);
  }

  speakStageHint(category, stageNum, fallbackText, onStart = null, onEnd = null) {
    if (this.muted) {
      if (onEnd) onEnd();
      return;
    }
    this.init();
    if (this.preCompiled) {
      const audioFile = this.preCompiled.getStageHintAudio(category, stageNum);
      if (audioFile) {
        this.preCompiled.play(audioFile, onStart, onEnd);
        return;
      }
    }
    this.speak(fallbackText, onStart, onEnd);
  }

  speakStageReview(category, stageNum, fallbackText, onStart = null, onEnd = null) {
    if (this.muted) {
      if (onEnd) onEnd();
      return;
    }
    this.init();
    if (this.preCompiled) {
      const audioFile = this.preCompiled.getStageReviewAudio(category, stageNum);
      if (audioFile) {
        this.preCompiled.play(audioFile, onStart, onEnd);
        return;
      }
    }
    this.speak(fallbackText, onStart, onEnd);
  }

  speakPraise(onStart = null, onEnd = null) {
    if (this.muted) {
      if (onEnd) onEnd();
      return;
    }
    this.init();
    if (this.preCompiled) {
      const audioFile = this.preCompiled.getRandomPraiseAudio();
      if (audioFile) {
        this.preCompiled.play(audioFile, onStart, onEnd);
        return;
      }
    }
    this.speak("WOOHOO! Brilliant job! You solved it!", onStart, onEnd);
  }

  speakOops(onStart = null, onEnd = null) {
    if (this.muted) {
      if (onEnd) onEnd();
      return;
    }
    this.init();
    if (this.preCompiled) {
      const audioFile = this.preCompiled.getRandomOopsAudio();
      if (audioFile) {
        this.preCompiled.play(audioFile, onStart, onEnd);
        return;
      }
    }
    this.speak("Oopsie! That's okay, let's try again!", onStart, onEnd);
  }

  speak(text, onStart = null, onEnd = null) {
    if (this.muted || !text) {
      if (onEnd) onEnd();
      return;
    }

    this.init();
    this.stopSpeech();

    // 1. If a Pre-Compiled High-Quality Human Audio Asset exists, play it instantly (0ms latency, zero CPU lag)
    if (this.preCompiled) {
      const audioFile = this.preCompiled.findAudioFile(text);
      if (audioFile) {
        this.preCompiled.play(audioFile, onStart, onEnd);
        return;
      }
    }

    // 2. Format text with natural pauses and clean emojis
    const cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    // 3. Web Speech API (Natural Browser Voices)
    if (this.speechSynth) {
      if (!this.selectedVoice && this.voices.length === 0) {
        this.voices = this.speechSynth.getVoices() || [];
        this.selectedVoice = this.pickBestNaturalVoice();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      // Persona-specific natural inflection modulation
      if (this.voicePersona === 'playful-leo') {
        utterance.rate = 0.94;
        utterance.pitch = 1.26; // warm animated kid companion
      } else if (this.voicePersona === 'teacher') {
        utterance.rate = 0.86;
        utterance.pitch = 1.06; // calm, clear & reassuring
      } else {
        utterance.rate = 0.90;
        utterance.pitch = 1.14; // friendly, enthusiastic
      }

      utterance.volume = 1.0;

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.speechSynth.speak(utterance);
      return;
    }

    // 4. Fallback: 100% Local Human Vocal Resonance Formants if speechSynth is unavailable
    if (this.localHuman) {
      this.localHuman.speakLocalHuman(cleanText, onStart, onEnd);
      return;
    }

    if (onEnd) onEnd();
  }

  speakSequence(items, onComplete = null) {
    this.stopSpeech();
    if (this.muted || !items || items.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    let currentIndex = 0;
    const playNext = () => {
      if (currentIndex >= items.length) {
        if (onComplete) onComplete();
        return;
      }
      const item = items[currentIndex++];
      const text = typeof item === 'string' ? item : item.text;
      const delayAfter = (item && item.delayAfter !== undefined) ? item.delayAfter : 350;
      const onStart = item && item.onStart ? item.onStart : null;
      const onEnd = item && item.onEnd ? item.onEnd : null;

      this.speak(text, onStart, () => {
        if (onEnd) onEnd();
        if (currentIndex < items.length) {
          const timer = setTimeout(() => {
            playNext();
          }, delayAfter);
          this.activeSequenceTimers.push(timer);
        } else {
          if (onComplete) onComplete();
        }
      });
    };

    playNext();
  }

  stopSpeech() {
    this.activeSequenceTimers.forEach(t => clearTimeout(t));
    this.activeSequenceTimers = [];

    if (this.preCompiled) {
      this.preCompiled.stop();
    }
    if (this.localHuman) {
      this.localHuman.stop();
    }
    if (this.speechSynth) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
    }
  }
}

export const sound = new AudioEngine();

