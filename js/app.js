/**
 * Kiddy Learn Application Controller & Multi-Engine Educational Platform
 * Features:
 * - 3 Comprehensive Courses for Kids: Mathematics, Science & Nature, Aptitude & Logic
 * - 5-Level Structured Progression with Milestone Headers & Badges
 * - Dynamic Mix of 10 Game Engines with Vector SVG Visual Cues
 * - Gamification Economy (Stars, 7-Day Streaks, Level Titles, Badges, Analytics, Diploma)
 */

import { sound } from './audio.js';
import { GAMES_CATALOG } from './games.js';
import { getSvgIcon } from './icons.js';
import { CardGridEngine } from './engines/card_grid_engine.js';
import { DragDropZonesEngine } from './engines/drag_drop_zones_engine.js';
import { MatchingPairsEngine } from './engines/matching_pairs_engine.js';
import { BalanceScaleEngine } from './engines/balance_scale_engine.js';
import { RebusKeypadEngine } from './engines/rebus_keypad_engine.js';
import { Spatial3DEngine } from './engines/spatial_3d_engine.js';
import { SudokuMatrixEngine } from './engines/sudoku_matrix_engine.js';
import { OutlineTraceEngine } from './engines/outline_trace_engine.js';
import { MemoryCardsEngine } from './engines/memory_cards_engine.js';
import { ListenAndChooseEngine } from './engines/listen_and_choose_engine.js';

const BADGES_CATALOG = [
  { id: 'first_step', iconKey: 'star', name: 'First Step', desc: 'Solved 1st puzzle', check: (state, totalSolved) => totalSolved >= 1 },
  { id: 'math_prodigy', iconKey: 'math-course', name: 'Math Star', desc: '10+ Math solved', check: (state) => Object.keys(state.completedStages['math-course'] || {}).length >= 10 },
  { id: 'science_hero', iconKey: 'science-course', name: 'Science Star', desc: '10+ Science solved', check: (state) => Object.keys(state.completedStages['science-course'] || {}).length >= 10 },
  { id: 'aptitude_ace', iconKey: 'aptitude-course', name: 'Logic Ace', desc: '10+ Logic solved', check: (state) => Object.keys(state.completedStages['aptitude-course'] || {}).length >= 10 },
  { id: 'level_master', iconKey: 'rocket', name: 'Level Conqueror', desc: 'Unlocked Level 3', check: (state) => Object.values(state.completedStages).some(map => Object.keys(map).length >= 10) },
  { id: 'engine_expert', iconKey: 'cards-grid', name: 'Engine Master', desc: '20+ Puzzles solved', check: (state, totalSolved) => totalSolved >= 20 },
  { id: 'streak_champ', iconKey: 'flame', name: 'Streak Champ', desc: '5-Day streak reached', check: (state) => state.streak >= 5 },
  { id: 'grandmaster', iconKey: 'crown', name: 'Grandmaster', desc: '100+ Stars collected', check: (state) => state.stars >= 100 }
];

const ENGINE_META = {
  'cards-grid': { iconKey: 'cards-grid', label: 'Cards' },
  'drag-drop-zones': { iconKey: 'drag-drop-zones', label: 'Sort' },
  'matching-pairs': { iconKey: 'matching-pairs', label: 'Pairs' },
  'balance-scale': { iconKey: 'balance-scale', label: 'Scale' },
  'rebus-keypad': { iconKey: 'rebus-keypad', label: 'Numbers' },
  'spatial-3d': { iconKey: 'spatial-3d', label: '3D Cube' },
  'sudoku-matrix': { iconKey: 'sudoku-matrix', label: 'Sudoku' },
  'outline-trace': { iconKey: 'outline-trace', label: 'Trace' },
  'memory-cards': { iconKey: 'memory-cards', label: 'Memory' },
  'listen-and-choose': { iconKey: 'listen-and-choose', label: 'Audio' }
};

class AppController {
  constructor() {
    this.activeCategory = GAMES_CATALOG[0].category;
    this.activeGame = GAMES_CATALOG[0];
    this.activeLevel = 1;
    this.activeStageIndex = 0;
    this.currentStageData = null;

    // Sub-engines
    this.cardGridEngine = new CardGridEngine(this);
    this.dragDropZonesEngine = new DragDropZonesEngine(this);
    this.matchingPairsEngine = new MatchingPairsEngine(this);
    this.balanceScaleEngine = new BalanceScaleEngine(this);
    this.rebusKeypadEngine = new RebusKeypadEngine(this);
    this.spatial3DEngine = new Spatial3DEngine(this);
    this.sudokuMatrixEngine = new SudokuMatrixEngine(this);
    this.outlineTraceEngine = new OutlineTraceEngine(this);
    this.memoryCardsEngine = new MemoryCardsEngine(this);
    this.listenAndChooseEngine = new ListenAndChooseEngine(this);

    // Player Progress State
    this.playerState = this.loadState();

    // DOM Elements
    this.initDOMElements();
    this.bindEvents();
    this.renderHeader();
    this.syncActiveLevel();
    this.renderCategoryNav();
    this.renderRoadmap();
  }

  syncActiveLevel() {
    const game = this.activeGame;
    const gameProgress = this.playerState.completedStages[game.id] || {};
    const maxLevel = game.levelThemes ? game.levelThemes.length : Math.max(1, ...game.stages.map(s => s.level || 1));
    
    // Find earliest level with uncompleted stages
    for (let lvl = 1; lvl <= maxLevel; lvl++) {
      const lvlStages = game.stages.filter(s => s.level === lvl);
      const isLvlDone = lvlStages.length > 0 && lvlStages.every(s => gameProgress[s.stageNum] !== undefined);
      if (!isLvlDone) {
        this.activeLevel = lvl;
        return;
      }
    }
    this.activeLevel = 1;
  }

  getTodayDateKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  getYesterdayDateKey() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  loadState() {
    const saved = localStorage.getItem('kiddylearn_player') || localStorage.getItem('logiclike_demo_player');
    const todayKey = this.getTodayDateKey();
    const yesterdayKey = this.getYesterdayDateKey();

    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          let streak = parsed.streak ?? 1;
          let lastClaimDate = parsed.lastClaimDate || null;
          let claimedToday = false;

          if (lastClaimDate === todayKey) {
            claimedToday = true;
          } else if (lastClaimDate === yesterdayKey) {
            claimedToday = false;
          } else if (lastClaimDate) {
            streak = 1;
            claimedToday = false;
          }

          return {
            stars: parsed.stars ?? 0,
            streak: streak,
            rankLevel: parsed.rankLevel ?? 1,
            lastClaimDate: lastClaimDate,
            claimedStreakToday: claimedToday,
            completedStages: parsed.completedStages || {}
          };
        }
      } catch(e) {}
    }
    return {
      stars: 0,
      streak: 1,
      rankLevel: 1,
      lastClaimDate: null,
      claimedStreakToday: false,
      completedStages: {}
    };
  }

  saveState() {
    localStorage.setItem('kiddylearn_player', JSON.stringify(this.playerState));
    this.renderHeader();
  }

  getTotalStagesSolved() {
    let count = 0;
    Object.values(this.playerState.completedStages).forEach(gameMap => {
      count += Object.keys(gameMap || {}).length;
    });
    return count;
  }

  getRankLevel() {
    const totalSolved = this.getTotalStagesSolved();
    return Math.min(15, Math.floor(totalSolved / 5) + 1);
  }

  getRankTitle() {
    const totalSolved = this.getTotalStagesSolved();
    const rankNum = this.getRankLevel();
    if (totalSolved >= 60) return `Lvl ${rankNum} • Grandmaster`;
    if (totalSolved >= 45) return `Lvl ${rankNum} • Strategist`;
    if (totalSolved >= 30) return `Lvl ${rankNum} • Detective`;
    if (totalSolved >= 15) return `Lvl ${rankNum} • Thinker`;
    if (totalSolved >= 5)  return `Lvl ${rankNum} • Explorer`;
    return `Lvl ${rankNum} • Starter`;
  }

  initDOMElements() {
    this.elStars = document.getElementById('stat-stars');
    this.elStreak = document.getElementById('stat-streak');
    this.elRank = document.getElementById('stat-rank');
    this.elAudioBtn = document.getElementById('btn-audio-toggle');
    this.elCategoryNav = document.getElementById('category-nav');
    this.elMainContainerRoot = document.getElementById('main-container-root');

    // Header Pills & Buttons
    this.elPillStars = document.getElementById('pill-stars');
    this.elPillStreak = document.getElementById('pill-streak');
    this.elPillRank = document.getElementById('pill-rank');
    this.elBtnOpenBadges = document.getElementById('btn-open-badges');
    this.elBtnOpenAnalytics = document.getElementById('btn-open-analytics');
    this.elBtnOpenCertificate = document.getElementById('btn-open-certificate');

    // Game Modal Elements
    this.elGameModal = document.getElementById('game-modal');
    this.elGameTitle = document.getElementById('game-modal-title');
    this.elGameSubtitle = document.getElementById('game-modal-subtitle');
    this.elGameProgressFill = document.getElementById('game-progress-fill');
    this.elQuestionPrompt = document.getElementById('question-prompt');
    this.elAudioSpeakBtn = document.getElementById('btn-audio-speak');
    this.elHintBtn = document.getElementById('btn-hint');
    this.elCloseModalBtn = document.getElementById('btn-close-modal');
    this.elGameArena = document.getElementById('game-arena');

    // Feedback Modals
    this.elVictoryModal = document.getElementById('victory-modal');
    this.elVictoryStars = document.getElementById('victory-stars');
    this.elVictoryFeedbackSub = document.getElementById('victory-feedback-sub');
    this.elBtnVictoryNext = document.getElementById('btn-victory-next');
    this.elBtnVictoryContinue = document.getElementById('btn-victory-continue');

    this.elReviewModal = document.getElementById('review-modal');
    this.elReviewText = document.getElementById('review-text');
    this.elBtnReviewRetry = document.getElementById('btn-review-retry');

    // Shell Modals
    this.elAnalyticsModal = document.getElementById('analytics-modal');
    this.elCloseAnalytics = document.getElementById('btn-close-analytics');
    this.elBtnResetProgress = document.getElementById('btn-reset-progress');

    this.elBadgesModal = document.getElementById('badges-modal');
    this.elCloseBadges = document.getElementById('btn-close-badges');

    this.elStreakModal = document.getElementById('streak-modal');
    this.elCloseStreak = document.getElementById('btn-close-streak');
    this.elBtnClaimStreak = document.getElementById('btn-claim-streak');

    this.elCertificateModal = document.getElementById('certificate-modal');
    this.elCloseCertificate = document.getElementById('btn-close-certificate');
    this.elBtnPrintCertificate = document.getElementById('btn-print-certificate');
  }

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('open');
    });
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  bindEvents() {
    this.elAudioBtn.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      this.elAudioBtn.innerHTML = isMuted 
        ? getSvgIcon('speaker-muted', 'icon-sm')
        : getSvgIcon('speaker', 'icon-sm');
    });

    this.elAudioSpeakBtn.addEventListener('click', () => {
      if (this.currentStageData) {
        sound.speak(this.currentStageData.prompt);
      }
    });

    this.elHintBtn.addEventListener('click', () => {
      if (!this.currentStageData) return;
      
      switch (this.currentStageData.type) {
        case 'cards-grid':
          this.cardGridEngine.executeHint(this.elGameArena);
          break;
        case 'drag-drop-zones':
          this.dragDropZonesEngine.executeHint(this.elGameArena);
          break;
        case 'matching-pairs':
          this.matchingPairsEngine.executeHint(this.elGameArena);
          break;
        case 'balance-scale':
          this.balanceScaleEngine.executeHint(this.elGameArena);
          break;
        case 'rebus-keypad':
          this.rebusKeypadEngine.executeHint(this.elGameArena);
          break;
        case 'spatial-3d':
          this.spatial3DEngine.executeHint(this.elGameArena);
          break;
        case 'sudoku-matrix':
          this.sudokuMatrixEngine.executeHint(this.elGameArena);
          break;
        default:
          alert("Hint: " + this.currentStageData.hint);
          sound.playTap();
      }
    });

    // Close Buttons for all Modals
    this.elCloseModalBtn.addEventListener('click', () => this.closeAllModals());
    this.elCloseAnalytics.addEventListener('click', () => this.closeAllModals());
    this.elCloseBadges.addEventListener('click', () => this.closeAllModals());
    this.elCloseStreak.addEventListener('click', () => this.closeAllModals());
    this.elCloseCertificate.addEventListener('click', () => this.closeAllModals());

    // Backdrop Click on Overlay Closes Modal
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeAllModals();
        }
      });
    });

    // ESC Key Closes Any Open Modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    if (this.elBtnVictoryNext) {
      this.elBtnVictoryNext.addEventListener('click', () => {
        sound.playTap();
        this.advanceToNextProblem();
      });
    }

    this.elBtnVictoryContinue.addEventListener('click', () => {
      sound.playTap();
      this.closeAllModals();
      this.syncActiveLevel();
      this.renderRoadmap();
      this.renderCategoryNav();
    });

    this.elBtnReviewRetry.addEventListener('click', () => {
      this.closeAllModals();
      this.renderStageContent();
    });

    // Shell Navigation Button Events
    this.elPillStars.addEventListener('click', () => this.openAnalyticsModal());
    this.elPillRank.addEventListener('click', () => this.openAnalyticsModal());
    this.elBtnOpenAnalytics.addEventListener('click', () => this.openAnalyticsModal());

    this.elBtnOpenBadges.addEventListener('click', () => this.openBadgesModal());

    this.elPillStreak.addEventListener('click', () => this.openStreakModal());
    this.elBtnClaimStreak.addEventListener('click', () => this.claimDailyStreak());

    this.elBtnOpenCertificate.addEventListener('click', () => this.openCertificateModal());
    this.elBtnPrintCertificate.addEventListener('click', () => {
      sound.playFanfare();
      window.print();
    });

    // Mobile Bottom Navigation Bar Wireup
    const mobHome = document.getElementById('mob-nav-home');
    const mobBadges = document.getElementById('mob-nav-badges');
    const mobStreak = document.getElementById('mob-nav-streak');
    const mobAnalytics = document.getElementById('mob-nav-analytics');
    const mobCert = document.getElementById('mob-nav-certificate');

    const setActiveMobNav = (btn) => {
      document.querySelectorAll('.mobile-nav-item').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
    };

    if (mobHome) mobHome.addEventListener('click', () => { sound.playTap(); this.closeAllModals(); setActiveMobNav(mobHome); });
    if (mobBadges) mobBadges.addEventListener('click', () => { setActiveMobNav(mobBadges); this.openBadgesModal(); });
    if (mobStreak) mobStreak.addEventListener('click', () => { setActiveMobNav(mobStreak); this.openStreakModal(); });
    if (mobAnalytics) mobAnalytics.addEventListener('click', () => { setActiveMobNav(mobAnalytics); this.openAnalyticsModal(); });
    if (mobCert) mobCert.addEventListener('click', () => { setActiveMobNav(mobCert); this.openCertificateModal(); });

    this.elBtnResetProgress.addEventListener('click', () => {
      if (confirm("Reset all progress and stars?")) {
        localStorage.removeItem('kiddylearn_player');
        localStorage.removeItem('logiclike_demo_player');
        this.playerState = {
          stars: 0,
          streak: 1,
          rankLevel: 1,
          lastClaimDate: null,
          claimedStreakToday: false,
          completedStages: {}
        };
        this.activeLevel = 1;
        this.saveState();
        this.closeAllModals();
        this.renderRoadmap();
        this.renderCategoryNav();
      }
    });
  }

  renderCategoryNav() {
    this.elCategoryNav.innerHTML = '';
    GAMES_CATALOG.forEach(game => {
      const completedCount = Object.keys(this.playerState.completedStages[game.id] || {}).length;
      const totalCount = game.stages.length;

      const btn = document.createElement('button');
      btn.className = `nav-tab ${game.category === this.activeCategory ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="nav-tab-icon">${getSvgIcon(game.category, 'icon-sm')}</span>
        <span class="nav-tab-label">${game.name}</span>
        <span class="nav-tab-badge">${completedCount}/${totalCount}</span>
      `;
      btn.addEventListener('click', () => {
        sound.playTap();
        this.activeCategory = game.category;
        this.activeGame = game;
        this.syncActiveLevel();
        this.renderCategoryNav();
        this.renderRoadmap();
      });
      this.elCategoryNav.appendChild(btn);
    });
  }

  getStageHeroGraphic(stage) {
    if (stage.type === 'outline-trace') {
      const shapeIconKey = `shape-${stage.shape || 'star'}`;
      return getSvgIcon(shapeIconKey, 'icon-lg');
    }
    if (stage.type === 'memory-cards' && stage.pairs) {
      const p1 = stage.pairs[0];
      const p2 = stage.pairs[1] || p1;
      return `<div class="kiddy-icon-group">${getSvgIcon(p1.icon || p1.id, 'icon-md')} ${getSvgIcon('memory-cards', 'icon-md')} ${getSvgIcon(p2.icon || p2.id, 'icon-md')}</div>`;
    }
    if (stage.type === 'listen-and-choose') {
      const correct = (stage.options && stage.options.find(o => o.isCorrect)) || (stage.options && stage.options[0]);
      return `<div class="kiddy-icon-group">${getSvgIcon('listen-and-choose', 'icon-md')} ${correct ? getSvgIcon(correct.icon || correct.id, 'icon-md') : ''}</div>`;
    }
    if (stage.cards && stage.cards.length > 0) {
      const correctCard = stage.cards.find(c => c.isCorrect) || stage.cards[0];
      if (correctCard.icon) return getSvgIcon(correctCard.icon, 'icon-lg');
    }
    if (stage.type === 'drag-drop-zones' && stage.zones) {
      return `<div class="kiddy-icon-group">${getSvgIcon(stage.zones[0].icon || stage.zones[0].id, 'icon-md')} ${getSvgIcon('drag-drop-zones', 'icon-md')} ${stage.zones[1] ? getSvgIcon(stage.zones[1].icon || stage.zones[1].id, 'icon-md') : ''}</div>`;
    }
    if (stage.type === 'matching-pairs' && stage.pairs) {
      const p1 = stage.pairs[0];
      return `<div class="kiddy-icon-group">${getSvgIcon(p1.leftIcon || 'star', 'icon-md')} ${getSvgIcon('matching-pairs', 'icon-md')} ${getSvgIcon(p1.rightIcon || 'star', 'icon-md')}</div>`;
    }
    if (stage.type === 'balance-scale') {
      return getSvgIcon('balance-scale', 'icon-lg');
    }
    if (stage.type === 'rebus-keypad') {
      return getSvgIcon('rebus-keypad', 'icon-lg');
    }
    if (stage.type === 'spatial-3d') {
      return getSvgIcon('spatial-3d', 'icon-lg');
    }
    if (stage.type === 'sudoku-matrix') {
      return getSvgIcon('sudoku-matrix', 'icon-lg');
    }
    return getSvgIcon('star', 'icon-lg');
  }

  renderRoadmap() {
    const game = this.activeGame;
    const gameProgress = this.playerState.completedStages[game.id] || {};
    const totalSolvedInCourse = Object.keys(gameProgress).length;
    const totalStagesInCourse = game.stages.length;

    const levelDef = (game.levelThemes && game.levelThemes.find(l => l.level === this.activeLevel)) || {
      level: this.activeLevel,
      name: `Level ${this.activeLevel}`,
      desc: 'Progressive visual challenges'
    };

    const currentLevelStages = game.stages.filter(s => s.level === this.activeLevel);
    const levelSolvedCount = currentLevelStages.filter(s => gameProgress[s.stageNum] !== undefined).length;
    const isLevelComplete = levelSolvedCount === currentLevelStages.length;
    const maxLevel = game.levelThemes ? game.levelThemes.length : Math.max(1, ...game.stages.map(s => s.level || 1));

    const isLevelUnlocked = (lvlNum) => {
      if (game.allUnlocked || game.id === 'demo-course' || lvlNum === 1) return true;
      const prevLvlStages = game.stages.filter(s => s.level === lvlNum - 1);
      return prevLvlStages.every(s => gameProgress[s.stageNum] !== undefined);
    };

    // Build Level Selector Pills
    let levelTabsHTML = '';
    const levelList = game.levelThemes || Array.from({ length: maxLevel }, (_, i) => ({ level: i + 1, name: `Level ${i + 1}` }));
    levelList.forEach(lDef => {
      const lvl = lDef.level;
      const lStages = game.stages.filter(s => s.level === lvl);
      const lSolved = lStages.filter(s => gameProgress[s.stageNum] !== undefined).length;
      const isLvlDone = lStages.length > 0 && lSolved === lStages.length;
      const isUnlocked = isLevelUnlocked(lvl);
      const isActive = lvl === this.activeLevel;

      let statusBadge = `${lSolved}/${lStages.length}`;
      if (isLvlDone) statusBadge = getSvgIcon('check', 'icon-xs');
      else if (!isUnlocked) statusBadge = getSvgIcon('lock', 'icon-xs');

      levelTabsHTML += `
        <button class="level-world-pill ${isActive ? 'active' : ''} ${isLvlDone ? 'mastered' : ''} ${!isUnlocked ? 'locked' : ''}" data-level="${lvl}">
          <span class="world-pill-icon">${getSvgIcon(isLvlDone ? 'crown' : (isUnlocked ? 'star' : 'lock'), 'icon-xs')}</span>
          <span class="world-pill-text">Lvl ${lvl}</span>
          <span class="world-pill-status">${statusBadge}</span>
        </button>
      `;
    });

    // Build Stage Mission Cards
    let stageCardsHTML = '';
    currentLevelStages.forEach(stage => {
      const stageGlobalIdx = game.stages.findIndex(s => s.stageNum === stage.stageNum);
      const isCompleted = gameProgress[stage.stageNum] !== undefined;
      const starsEarned = gameProgress[stage.stageNum] || 0;
      
      const isUnlocked = game.allUnlocked || game.id === 'demo-course' || stageGlobalIdx === 0 || gameProgress[game.stages[stageGlobalIdx - 1].stageNum] !== undefined;
      const isActive = isUnlocked && !isCompleted;

      let statusClass = 'locked';
      if (isCompleted) statusClass = 'completed';
      else if (isActive) statusClass = 'active';

      const engineInfo = ENGINE_META[stage.type] || { iconKey: 'cards-grid', label: stage.type };
      const heroGraphic = this.getStageHeroGraphic(stage);

      let starsHTML = '';
      if (isCompleted) {
        for (let s = 1; s <= 3; s++) {
          starsHTML += getSvgIcon(s <= starsEarned ? 'star-filled' : 'star-empty', 'icon-sm');
        }
      } else {
        starsHTML = `<span class="star-empty-row">${getSvgIcon('star-empty', 'icon-xs')} ${getSvgIcon('star-empty', 'icon-xs')} ${getSvgIcon('star-empty', 'icon-xs')}</span>`;
      }

      stageCardsHTML += `
        <div class="deck-stage-card ${statusClass}" data-stage-idx="${stageGlobalIdx}">
          <div class="deck-card-top-row">
            <span class="deck-stage-num-badge">${isCompleted ? getSvgIcon('check', 'icon-xs') : stage.stageNum}</span>
            <span class="deck-engine-tag">${getSvgIcon(engineInfo.iconKey, 'icon-xs')} <span>${engineInfo.label}</span></span>
          </div>
          
          <div class="deck-visual-bubble">
            <span class="deck-hero-graphic">${heroGraphic}</span>
          </div>

          <div class="deck-stage-body">
            <h4 class="deck-stage-title">${stage.title}</h4>
            <div class="deck-stars-row">${starsHTML}</div>
          </div>

          <div class="deck-stage-bottom">
            <button class="btn-deck-action ${isUnlocked ? (isCompleted ? 'replay' : 'play') : 'locked'}" ${!isUnlocked ? 'disabled' : ''}>
              ${isCompleted 
                ? `${getSvgIcon('replay', 'icon-xs')} <span>Replay</span>` 
                : (isUnlocked ? `${getSvgIcon('play', 'icon-xs')} <span>Play</span>` : `${getSvgIcon('lock', 'icon-xs')} <span>Locked</span>`)}
            </button>
          </div>
        </div>
      `;
    });

    const isPrevAvailable = this.activeLevel > 1;
    const isNextAvailable = this.activeLevel < maxLevel && isLevelUnlocked(this.activeLevel + 1);

    this.elMainContainerRoot.innerHTML = `
      <section class="hub-main-deck">
        <!-- Level World Hero Banner -->
        <div class="hub-hero-banner course-${this.activeCategory}">
          <div class="hub-hero-left">
            <div class="hero-level-emblem">
              ${getSvgIcon(game.category, 'icon-lg')}
            </div>
            <div class="hero-level-info">
              <div class="hero-title-badge-row">
                <span class="hero-course-tag">${game.name}</span>
                <span class="hero-mastery-tag ${isLevelComplete ? 'mastered' : ''}">${isLevelComplete ? 'Mastered' : `${levelSolvedCount}/${currentLevelStages.length} Solved`}</span>
              </div>
              <h2 class="hero-level-heading">Level ${this.activeLevel}: ${levelDef.name}</h2>
              <p class="hero-level-sub">${levelDef.desc || 'Complete stages to earn stars'}</p>
            </div>
          </div>
          <div class="hub-hero-right">
            <div class="world-pills-bar">
              ${levelTabsHTML}
            </div>
          </div>
        </div>

        <!-- 5-Stage Mission Cards Grid -->
        <div class="hub-cards-grid">
          ${stageCardsHTML}
        </div>

        <!-- Hub Footer Level Bar -->
        <div class="hub-deck-footer">
          <button class="btn-world-nav" id="btn-prev-level" ${!isPrevAvailable ? 'disabled' : ''}>
            ${getSvgIcon('play', 'icon-xs', { rotate: 180 })} Level ${Math.max(1, this.activeLevel - 1)}
          </button>
          <div class="hub-footer-center">
            <div class="hub-level-dots">
              ${levelList.map(l => `<span class="hub-dot ${l.level === this.activeLevel ? 'active' : ''} ${game.stages.filter(s => s.level === l.level).every(s => gameProgress[s.stageNum] !== undefined) ? 'done' : ''}"></span>`).join('')}
            </div>
          </div>
          <button class="btn-world-nav" id="btn-next-level" ${!isNextAvailable ? 'disabled' : ''}>
            Level ${Math.min(maxLevel, this.activeLevel + 1)} ${getSvgIcon('play', 'icon-xs')}
          </button>
        </div>
      </section>
    `;

    // Bind Level Tab click events
    this.elMainContainerRoot.querySelectorAll('.level-world-pill:not(.locked)').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playTap();
        const lvl = parseInt(btn.getAttribute('data-level'), 10);
        this.activeLevel = lvl;
        this.renderRoadmap();
      });
    });

    // Bind Deck Stage Card click events
    this.elMainContainerRoot.querySelectorAll('.deck-stage-card:not(.locked)').forEach(card => {
      card.addEventListener('click', () => {
        sound.playTap();
        const stageIdx = parseInt(card.getAttribute('data-stage-idx'), 10);
        this.launchStage(stageIdx);
      });
    });

    // Bind Prev / Next Level Buttons
    const btnPrev = document.getElementById('btn-prev-level');
    if (btnPrev && isPrevAvailable) {
      btnPrev.addEventListener('click', () => {
        sound.playTap();
        this.activeLevel -= 1;
        this.renderRoadmap();
      });
    }

    const btnNext = document.getElementById('btn-next-level');
    if (btnNext && isNextAvailable) {
      btnNext.addEventListener('click', () => {
        sound.playTap();
        this.activeLevel += 1;
        this.renderRoadmap();
      });
    }
  }

  launchStage(stageIdx) {
    this.activeStageIndex = stageIdx;
    this.currentStageData = this.activeGame.stages[stageIdx];
    
    this.elGameTitle.innerHTML = `<span style="display:inline-flex; align-items:center; gap:6px;">${getSvgIcon(this.activeGame.category, 'icon-xs')} <span>${this.activeGame.name}</span></span>`;
    this.elGameSubtitle.textContent = `Stage ${this.currentStageData.stageNum} of ${this.activeGame.stages.length} • ${this.currentStageData.title}`;
    
    const progressPct = ((stageIdx + 1) / this.activeGame.stages.length) * 100;
    this.elGameProgressFill.style.width = `${progressPct}%`;

    this.renderStageContent();
    this.elGameModal.classList.add('open');

    setTimeout(() => {
      this.speakCurrentQuestion();
    }, 250);
  }

  speakCurrentQuestion() {
    if (!this.currentStageData) return;
    const btnSpeak = document.getElementById('btn-audio-speak');
    if (btnSpeak) btnSpeak.classList.add('is-speaking');

    sound.speak(
      this.currentStageData.prompt,
      () => {
        const btn = document.getElementById('btn-audio-speak');
        if (btn) btn.classList.add('is-speaking');
      },
      () => {
        const btn = document.getElementById('btn-audio-speak');
        if (btn) btn.classList.remove('is-speaking');
      }
    );
  }

  closeGameModal() {
    this.elGameModal.classList.remove('open');
    sound.stopSpeech();
    const btnSpeak = document.getElementById('btn-audio-speak');
    if (btnSpeak) btnSpeak.classList.remove('is-speaking');
  }

  renderStageContent() {
    const stage = this.currentStageData;
    this.elQuestionPrompt.innerHTML = `
      <span>${stage.prompt}</span>
      <button class="btn-audio-speak" id="btn-audio-speak" title="Listen">
        ${getSvgIcon('speaker', 'icon-sm')}
        <span class="speak-pulse-dot"></span>
      </button>
    `;
    
    document.getElementById('btn-audio-speak').addEventListener('click', () => {
      this.speakCurrentQuestion();
    });

    this.elGameArena.innerHTML = '';

    switch (stage.type) {
      case 'cards-grid':
        this.renderCardsGrid(stage);
        break;
      case 'drag-drop-zones':
        this.renderDragDropZones(stage);
        break;
      case 'matching-pairs':
        this.renderMatchingPairs(stage);
        break;
      case 'balance-scale':
        this.renderBalanceScale(stage);
        break;
      case 'rebus-keypad':
        this.renderRebusKeypad(stage);
        break;
      case 'spatial-3d':
        this.render3DIsoCubes(stage);
        break;
      case 'sudoku-matrix':
        this.renderSudokuGrid(stage);
        break;
      case 'outline-trace':
        this.renderOutlineTrace(stage);
        break;
      case 'memory-cards':
        this.renderMemoryCards(stage);
        break;
      case 'listen-and-choose':
        this.renderListenAndChoose(stage);
        break;
      default:
        this.renderCardsGrid(stage);
    }
  }

  renderHeader() {
    this.playerState.rankLevel = this.getRankLevel();
    this.elStars.textContent = `${this.playerState.stars} ★`;
    const streakNum = this.playerState.streak;
    this.elStreak.textContent = `${streakNum} ${streakNum === 1 ? 'Day' : 'Days'}`;
    this.elRank.textContent = `Lvl ${this.playerState.rankLevel}`;
  }

  openAnalyticsModal() {
    sound.playTap();
    const totalSolved = this.getTotalStagesSolved();
    const totalAvailable = GAMES_CATALOG.reduce((acc, g) => acc + g.stages.length, 0);

    document.getElementById('analytics-total-stages').textContent = `${totalSolved} / ${totalAvailable}`;
    document.getElementById('analytics-total-stars').textContent = `${this.playerState.stars} ★`;
    document.getElementById('analytics-rank-title').textContent = this.getRankTitle();

    const breakdownList = document.getElementById('analytics-breakdown-list');
    breakdownList.innerHTML = '';

    GAMES_CATALOG.forEach(game => {
      const gameProgress = this.playerState.completedStages[game.id] || {};
      const solved = Object.keys(gameProgress).length;
      const total = game.stages.length;
      const pct = Math.round((solved / total) * 100);

      const courseCard = document.createElement('div');
      courseCard.className = 'analytics-course-box';
      courseCard.style.cssText = 'background:#F8FAFC; border:1px solid #E2E8F0; border-radius:14px; padding:14px; margin-bottom:12px; display:flex; flex-direction:column; gap:8px;';

      let levelsHTML = '';
      if (game.levelThemes) {
        levelsHTML = '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:6px; margin-top:4px;">';
        game.levelThemes.forEach(lvl => {
          const lvlStages = game.stages.filter(s => s.level === lvl.level);
          const lvlSolved = lvlStages.filter(s => gameProgress[s.stageNum] !== undefined).length;
          const isLvlDone = lvlSolved === lvlStages.length;
          levelsHTML += `
            <div style="background:${isLvlDone ? '#ECFDF5' : '#FFFFFF'}; border:1px solid ${isLvlDone ? '#A7F3D0' : '#E2E8F0'}; border-radius:8px; padding:6px 8px; font-size:11px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; color:${isLvlDone ? '#065F46' : '#475569'}; display:flex; align-items:center; gap:4px;">${getSvgIcon(isLvlDone ? 'crown' : 'star', 'icon-xs')} L${lvl.level}</span>
              <span style="font-weight:800; color:${isLvlDone ? '#059669' : '#64748B'};">${isLvlDone ? '5/5' : `${lvlSolved}/${lvlStages.length}`}</span>
            </div>
          `;
        });
        levelsHTML += '</div>';
      }

      courseCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px; font-weight:800; font-size:14px; color:var(--text-dark);">
            <span>${getSvgIcon(game.category, 'icon-sm')}</span>
            <span>${game.name}</span>
            <span style="font-size:11px; color:var(--text-muted); font-weight:600;">(${solved}/${total})</span>
          </div>
          <span style="font-weight:900; font-size:13px; color:var(--primary-indigo);">${pct}%</span>
        </div>
        <div class="analytics-progress-bar" style="height:6px; background:#E2E8F0; border-radius:3px; overflow:hidden;">
          <div class="analytics-progress-fill" style="width:${pct}%; height:100%; background:var(--emerald-green); transition:width 0.3s ease;"></div>
        </div>
        ${levelsHTML}
      `;
      breakdownList.appendChild(courseCard);
    });

    this.elAnalyticsModal.classList.add('open');
  }

  openBadgesModal() {
    sound.playTap();
    const badgesGrid = document.getElementById('badges-grid');
    badgesGrid.innerHTML = '';

    const totalSolved = this.getTotalStagesSolved();

    BADGES_CATALOG.forEach(badge => {
      const isUnlocked = badge.check(this.playerState, totalSolved);

      const card = document.createElement('div');
      card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="badge-icon">${getSvgIcon(badge.iconKey, 'icon-lg')}</div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${badge.desc}</div>
        <div style="margin-top:6px; font-weight:900; font-size:11px; color:${isUnlocked ? '#D97706' : '#94A3B8'}; display:flex; align-items:center; justify-content:center; gap:4px;">
          ${isUnlocked ? `${getSvgIcon('check', 'icon-xs')} UNLOCKED` : `${getSvgIcon('lock', 'icon-xs')} LOCKED`}
        </div>
      `;
      badgesGrid.appendChild(card);
    });

    this.elBadgesModal.classList.add('open');
  }

  openStreakModal() {
    sound.playTap();
    const streakRow = document.getElementById('streak-days-row');
    streakRow.innerHTML = '';

    const currentDay = Math.min(this.playerState.streak, 7);

    for (let d = 1; d <= 7; d++) {
      const isPast = d < currentDay;
      const isToday = d === currentDay;
      let statusClass = '';
      if (isPast) statusClass = 'claimed';
      else if (isToday) statusClass = 'active';

      const card = document.createElement('div');
      card.className = `streak-day-card ${statusClass}`;
      card.innerHTML = `
        <span class="streak-day-lbl">Day ${d}</span>
        <span class="streak-day-star">${isPast ? getSvgIcon('check', 'icon-sm') : getSvgIcon('flame', 'icon-sm')}</span>
        <span class="streak-day-bonus">+${d * 5} ★</span>
      `;
      streakRow.appendChild(card);
    }

    if (this.playerState.claimedStreakToday) {
      this.elBtnClaimStreak.innerHTML = `${getSvgIcon('check', 'icon-xs')} <span>Claimed Today!</span>`;
      this.elBtnClaimStreak.disabled = true;
      this.elBtnClaimStreak.style.opacity = '0.6';
    } else {
      this.elBtnClaimStreak.innerHTML = `${getSvgIcon('flame', 'icon-xs')} <span>Claim Bonus (+${currentDay * 5} ★)</span>`;
      this.elBtnClaimStreak.disabled = false;
      this.elBtnClaimStreak.style.opacity = '1';
    }

    this.elStreakModal.classList.add('open');
  }

  claimDailyStreak() {
    if (this.playerState.claimedStreakToday) return;

    sound.playFanfare();
    const currentDay = Math.min(this.playerState.streak, 7);
    const bonus = currentDay * 5;
    this.playerState.stars += bonus;
    this.playerState.lastClaimDate = this.getTodayDateKey();
    this.playerState.claimedStreakToday = true;
    
    if (this.playerState.streak < 7) {
      this.playerState.streak += 1;
    }
    
    this.saveState();
    this.openStreakModal();
  }

  openCertificateModal() {
    sound.playFanfare();
    document.getElementById('cert-stars-val').textContent = `${this.playerState.stars} ★`;
    document.getElementById('cert-rank-val').textContent = this.getRankTitle();

    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('cert-date-val').textContent = dateStr;

    const skillsContainer = document.getElementById('cert-skills-container');
    if (skillsContainer) {
      skillsContainer.innerHTML = `
        <span>${getSvgIcon('cards-grid', 'icon-xs')} Selection</span>
        <span>${getSvgIcon('outline-trace', 'icon-xs')} Tracing</span>
        <span>${getSvgIcon('memory-cards', 'icon-xs')} Memory Match</span>
        <span>${getSvgIcon('listen-and-choose', 'icon-xs')} Audio</span>
        <span>${getSvgIcon('drag-drop-zones', 'icon-xs')} Sorting</span>
        <span>${getSvgIcon('matching-pairs', 'icon-xs')} Pairs</span>
        <span>${getSvgIcon('balance-scale', 'icon-xs')} Physics</span>
        <span>${getSvgIcon('rebus-keypad', 'icon-xs')} Math</span>
        <span>${getSvgIcon('spatial-3d', 'icon-xs')} 3D Cubes</span>
        <span>${getSvgIcon('sudoku-matrix', 'icon-xs')} Sudoku</span>
      `;
    }

    this.elCertificateModal.classList.add('open');
  }

  renderCardsGrid(stage) {
    this.cardGridEngine.render(stage, this.elGameArena);
  }

  renderDragDropZones(stage) {
    this.dragDropZonesEngine.render(stage, this.elGameArena);
  }

  renderMatchingPairs(stage) {
    this.matchingPairsEngine.render(stage, this.elGameArena);
  }

  renderBalanceScale(stage) {
    this.balanceScaleEngine.render(stage, this.elGameArena);
  }

  renderRebusKeypad(stage) {
    this.rebusKeypadEngine.render(stage, this.elGameArena);
  }

  render3DIsoCubes(stage) {
    this.spatial3DEngine.render(stage, this.elGameArena);
  }

  renderSudokuGrid(stage) {
    this.sudokuMatrixEngine.render(stage, this.elGameArena);
  }

  renderOutlineTrace(stage) {
    this.outlineTraceEngine.render(stage, this.elGameArena);
  }

  renderMemoryCards(stage) {
    this.memoryCardsEngine.render(stage, this.elGameArena);
  }

  renderListenAndChoose(stage) {
    this.listenAndChooseEngine.render(stage, this.elGameArena);
  }

  advanceToNextProblem() {
    this.closeAllModals();
    const nextIdx = this.activeStageIndex + 1;
    if (nextIdx < this.activeGame.stages.length) {
      const nextStage = this.activeGame.stages[nextIdx];
      if (nextStage && nextStage.level) {
        this.activeLevel = nextStage.level;
      }
      this.renderRoadmap();
      this.renderCategoryNav();
      this.launchStage(nextIdx);
    } else {
      this.renderRoadmap();
      this.renderCategoryNav();
      sound.playFanfare();
      this.openCertificateModal();
    }
  }

  handleCorrectAnswer() {
    sound.playSuccess();
    sound.playStar();

    const gameId = this.activeGame.id;
    if (!this.playerState.completedStages[gameId]) {
      this.playerState.completedStages[gameId] = {};
    }
    
    const prevStars = this.playerState.completedStages[gameId][this.currentStageData.stageNum] || 0;
    const newStars = 3;
    
    if (newStars > prevStars) {
      this.playerState.stars += (newStars - prevStars);
    }
    
    this.playerState.completedStages[gameId][this.currentStageData.stageNum] = newStars;
    this.playerState.rankLevel = this.getRankLevel();
    this.saveState();

    this.closeGameModal();

    const nextIdx = this.activeStageIndex + 1;
    const isFinalStage = nextIdx >= this.activeGame.stages.length;

    if (this.elBtnVictoryNext) {
      if (isFinalStage) {
        this.elBtnVictoryNext.innerHTML = `${getSvgIcon('trophy', 'icon-xs')} <span>Diploma</span>`;
      } else {
        const nextStage = this.activeGame.stages[nextIdx];
        this.elBtnVictoryNext.innerHTML = `${getSvgIcon('play', 'icon-xs')} <span>Next (${nextStage.stageNum}/${this.activeGame.stages.length})</span>`;
      }
    }

    if (this.elVictoryFeedbackSub) {
      this.elVictoryFeedbackSub.textContent = isFinalStage
        ? "Awesome! Course completed!"
        : "Great job! Keep going!";
    }

    this.elVictoryStars.innerHTML = `
      ${getSvgIcon('star-filled', 'icon-lg')}
      ${getSvgIcon('star-filled', 'icon-lg')}
      ${getSvgIcon('star-filled', 'icon-lg')}
    `;
    this.renderHeader();
    this.elVictoryModal.classList.add('open');
  }

  handleWrongAnswer(reviewExplanation) {
    this.elReviewText.textContent = reviewExplanation;
    this.elReviewModal.classList.add('open');
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
