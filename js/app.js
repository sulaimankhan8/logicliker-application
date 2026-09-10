/**
 * LogicLike Application Controller & Multi-Engine Educational Platform
 * Features:
 * - 3 Comprehensive Courses for Kids: Mathematics 📐, Science & Nature 🔬, Aptitude & Logic 💡
 * - 5-Level Structured Progression with Milestone Headers & Badges
 * - Dynamic Mix of 7 Game Engines:
 *   1. 🎴 cards-grid (Selection & Odd-One-Out)
 *   2. 🎯 drag-drop-zones (Habitat & Category Sorting)
 *   3. 🔗 matching-pairs (Two-column Connecting Cords)
 *   4. ⚖️ balance-scale (Mass & Physics Balance)
 *   5. 🔢 rebus-keypad (Picture Arithmetic & Equations)
 *   6. 📦 spatial-3d (3D Isometric Spatial Projection)
 *   7. 🧩 sudoku-matrix (Deductive Constraint Grids)
 * - Gamification Economy (Stars, 7-Day Streaks, Level Titles, Badges, Analytics, Official Diploma)
 */

import { sound } from './audio.js';
import { GAMES_CATALOG } from './games.js';
import { CardGridEngine } from './engines/card_grid_engine.js';
import { DragDropZonesEngine } from './engines/drag_drop_zones_engine.js';
import { MatchingPairsEngine } from './engines/matching_pairs_engine.js';
import { BalanceScaleEngine } from './engines/balance_scale_engine.js';
import { RebusKeypadEngine } from './engines/rebus_keypad_engine.js';
import { Spatial3DEngine } from './engines/spatial_3d_engine.js';
import { SudokuMatrixEngine } from './engines/sudoku_matrix_engine.js';

const BADGES_CATALOG = [
  { id: 'first_step', icon: '🌟', name: 'First Steps', desc: 'Solve your first logic puzzle', check: (state, totalSolved) => totalSolved >= 1 },
  { id: 'math_prodigy', icon: '📐', name: 'Math Prodigy', desc: 'Complete 10+ Math stages', check: (state) => Object.keys(state.completedStages['math-course'] || {}).length >= 10 },
  { id: 'science_hero', icon: '🔬', name: 'Science Explorer', desc: 'Complete 10+ Science stages', check: (state) => Object.keys(state.completedStages['science-course'] || {}).length >= 10 },
  { id: 'aptitude_ace', icon: '💡', name: 'Aptitude Ace', desc: 'Complete 10+ Aptitude stages', check: (state) => Object.keys(state.completedStages['aptitude-course'] || {}).length >= 10 },
  { id: 'level_master', icon: '🚀', name: 'Level Conqueror', desc: 'Unlock Level 3 in any course', check: (state) => Object.values(state.completedStages).some(map => Object.keys(map).length >= 10) },
  { id: 'engine_expert', icon: '🎛️', name: 'All-Engine Master', desc: 'Solve 20+ puzzles across the engines', check: (state, totalSolved) => totalSolved >= 20 },
  { id: 'streak_champ', icon: '🔥', name: 'Streak Champion', desc: 'Reach a 5-day daily streak', check: (state) => state.streak >= 5 },
  { id: 'grandmaster', icon: '👑', name: 'Logic Grandmaster', desc: 'Earn 100+ stars across courses', check: (state) => state.stars >= 100 }
];

const ENGINE_META = {
  'cards-grid': { icon: '🎴', label: 'Card Grid' },
  'drag-drop-zones': { icon: '🎯', label: 'Drag & Sort' },
  'matching-pairs': { icon: '🔗', label: 'Match Pairs' },
  'balance-scale': { icon: '⚖️', label: 'Balance Scale' },
  'rebus-keypad': { icon: '🔢', label: 'Rebus Math' },
  'spatial-3d': { icon: '📦', label: '3D Spatial' },
  'sudoku-matrix': { icon: '🧩', label: 'Sudoku Matrix' }
};

class AppController {
  constructor() {
    this.activeCategory = "math-course";
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
    
    // Find earliest level with uncompleted stages
    for (let lvl = 1; lvl <= 5; lvl++) {
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
    const saved = localStorage.getItem('logiclike_demo_player');
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
            // Streak broken (more than 1 day missed)
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
    localStorage.setItem('logiclike_demo_player', JSON.stringify(this.playerState));
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
    if (totalSolved >= 60) return `Lvl ${rankNum} • Grandmaster Logician 👑`;
    if (totalSolved >= 45) return `Lvl ${rankNum} • Cognitive Strategist ⚡`;
    if (totalSolved >= 30) return `Lvl ${rankNum} • Master Detective 🔍`;
    if (totalSolved >= 15) return `Lvl ${rankNum} • Junior Thinker 🚀`;
    if (totalSolved >= 5)  return `Lvl ${rankNum} • Curious Explorer 🌱`;
    return `Lvl ${rankNum} • Novice Apprentice 🌟`;
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
      this.elAudioBtn.textContent = isMuted ? "🔇" : "🔊";
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
          alert("💡 HINT: " + this.currentStageData.hint);
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

    this.elBtnResetProgress.addEventListener('click', () => {
      if (confirm("Are you sure you want to reset all game progress and stars?")) {
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
        <span>${game.icon}</span> ${game.name}
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
    if (stage.cards && stage.cards.length > 0) {
      const correctCard = stage.cards.find(c => c.isCorrect) || stage.cards[0];
      if (correctCard.icon) return correctCard.icon;
    }
    if (stage.type === 'drag-drop-zones' && stage.zones) {
      const icons = stage.zones.map(z => z.icon).filter(Boolean);
      if (icons.length >= 2) return icons.slice(0, 2).join(' ⇄ ');
      if (stage.items && stage.items.length >= 2) return `${stage.items[0].icon || '🎯'} ${stage.items[1].icon || '📦'}`;
      return '🎯 📦';
    }
    if (stage.type === 'matching-pairs' && stage.pairs) {
      const p1 = stage.pairs[0];
      if (p1) return `${p1.leftIcon || '🔗'} ➔ ${p1.rightIcon || '⭐'}`;
      return '🔗 ⭐';
    }
    if (stage.type === 'balance-scale') {
      return '⚖️ 💎';
    }
    if (stage.type === 'rebus-keypad') {
      return '🔢 ➕ 🧮';
    }
    if (stage.type === 'spatial-3d') {
      return '📦 🧱 🎲';
    }
    if (stage.type === 'sudoku-matrix') {
      return '🧩 🔢 ✨';
    }
    return '🌟 💡';
  }

  renderRoadmap() {
    const game = this.activeGame;
    const gameProgress = this.playerState.completedStages[game.id] || {};
    const totalSolvedInCourse = Object.keys(gameProgress).length;
    const totalStagesInCourse = game.stages.length;
    const coursePct = Math.round((totalSolvedInCourse / totalStagesInCourse) * 100);

    const levelDef = (game.levelThemes && game.levelThemes.find(l => l.level === this.activeLevel)) || {
      level: this.activeLevel,
      name: `Level ${this.activeLevel}`,
      icon: '⭐',
      desc: 'Progression Challenges'
    };

    const currentLevelStages = game.stages.filter(s => s.level === this.activeLevel);
    const levelSolvedCount = currentLevelStages.filter(s => gameProgress[s.stageNum] !== undefined).length;
    const isLevelComplete = levelSolvedCount === currentLevelStages.length;

    // Level unlock condition
    const isLevelUnlocked = (lvlNum) => {
      if (lvlNum === 1) return true;
      const prevLvlStages = game.stages.filter(s => s.level === lvlNum - 1);
      return prevLvlStages.every(s => gameProgress[s.stageNum] !== undefined);
    };

    // Build 5 Level World Selector Pills
    let levelTabsHTML = '';
    for (let lvl = 1; lvl <= 5; lvl++) {
      const lDef = (game.levelThemes && game.levelThemes.find(l => l.level === lvl)) || { name: `Level ${lvl}`, icon: '⭐' };
      const lStages = game.stages.filter(s => s.level === lvl);
      const lSolved = lStages.filter(s => gameProgress[s.stageNum] !== undefined).length;
      const isLvlDone = lSolved === lStages.length;
      const isUnlocked = isLevelUnlocked(lvl);
      const isActive = lvl === this.activeLevel;

      let badgeIcon = `${lSolved}/5`;
      if (isLvlDone) badgeIcon = '✓';
      else if (!isUnlocked) badgeIcon = '🔒';

      levelTabsHTML += `
        <button class="level-world-pill ${isActive ? 'active' : ''} ${isLvlDone ? 'mastered' : ''} ${!isUnlocked ? 'locked' : ''}" data-level="${lvl}">
          <span class="world-pill-icon">${lDef.icon}</span>
          <span class="world-pill-text">Lvl ${lvl}</span>
          <span class="world-pill-status">${badgeIcon}</span>
        </button>
      `;
    }

    // Build 5 Stage Mission Cards
    let stageCardsHTML = '';
    currentLevelStages.forEach(stage => {
      const stageGlobalIdx = game.stages.findIndex(s => s.stageNum === stage.stageNum);
      const isCompleted = gameProgress[stage.stageNum] !== undefined;
      const starsEarned = gameProgress[stage.stageNum] || 0;
      
      const isUnlocked = stageGlobalIdx === 0 || gameProgress[game.stages[stageGlobalIdx - 1].stageNum] !== undefined;
      const isActive = isUnlocked && !isCompleted;

      let statusClass = 'locked';
      if (isCompleted) statusClass = 'completed';
      else if (isActive) statusClass = 'active';

      const engineInfo = ENGINE_META[stage.type] || { icon: '🎮', label: stage.type };
      const heroGraphic = this.getStageHeroGraphic(stage);

      let starsHTML = '';
      if (isCompleted) {
        for (let s = 1; s <= 3; s++) {
          starsHTML += `<span class="star-icon ${s <= starsEarned ? 'filled' : 'empty'}">★</span>`;
        }
      } else {
        starsHTML = `<span class="star-empty-row">★★★</span>`;
      }

      stageCardsHTML += `
        <div class="deck-stage-card ${statusClass}" data-stage-idx="${stageGlobalIdx}">
          <div class="deck-card-top-row">
            <span class="deck-stage-num-badge">${isCompleted ? '✓' : `#${stage.stageNum}`}</span>
            <span class="deck-engine-tag">${engineInfo.icon} ${engineInfo.label}</span>
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
              ${isCompleted ? '🔄 Replay' : (isUnlocked ? '▶ Play' : '🔒 Locked')}
            </button>
          </div>
        </div>
      `;
    });

    const isPrevAvailable = this.activeLevel > 1;
    const isNextAvailable = this.activeLevel < 5 && isLevelUnlocked(this.activeLevel + 1);

    this.elMainContainerRoot.innerHTML = `
      <!-- Single-Screen Hub Container -->
      <section class="hub-main-deck">
        <!-- Level World Hero Banner -->
        <div class="hub-hero-banner course-${this.activeCategory}">
          <div class="hub-hero-left">
            <div class="hero-level-emblem">${levelDef.icon}</div>
            <div class="hero-level-info">
              <div class="hero-title-badge-row">
                <span class="hero-course-tag">${game.icon} ${game.name}</span>
                <span class="hero-mastery-tag ${isLevelComplete ? 'mastered' : ''}">${isLevelComplete ? '🏆 Level Mastered!' : `${levelSolvedCount}/5 Solved`}</span>
              </div>
              <h2 class="hero-level-heading">Level ${this.activeLevel}: ${levelDef.name}</h2>
              <p class="hero-level-sub">${levelDef.desc}</p>
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
            ◀ Level ${Math.max(1, this.activeLevel - 1)}
          </button>
          <div class="hub-footer-center">
            <div class="hub-level-dots">
              ${[1, 2, 3, 4, 5].map(lvl => `<span class="hub-dot ${lvl === this.activeLevel ? 'active' : ''} ${game.stages.filter(s => s.level === lvl).every(s => gameProgress[s.stageNum] !== undefined) ? 'done' : ''}"></span>`).join('')}
            </div>
            <span class="hub-motivation-text">💡 Complete all 5 puzzles to master this level!</span>
          </div>
          <button class="btn-world-nav" id="btn-next-level" ${!isNextAvailable ? 'disabled' : ''}>
            Level ${Math.min(5, this.activeLevel + 1)} ▶
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
      card.addEventListener('click', (e) => {
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
    
    this.elGameTitle.textContent = `${this.activeGame.icon} ${this.activeGame.name}`;
    this.elGameSubtitle.textContent = `Stage ${this.currentStageData.stageNum} of ${this.activeGame.stages.length} • ${this.currentStageData.title}`;
    
    const progressPct = ((stageIdx + 1) / this.activeGame.stages.length) * 100;
    this.elGameProgressFill.style.width = `${progressPct}%`;

    this.renderStageContent();
    this.elGameModal.classList.add('open');
  }

  closeGameModal() {
    this.elGameModal.classList.remove('open');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  renderStageContent() {
    const stage = this.currentStageData;
    this.elQuestionPrompt.innerHTML = `
      <span>${stage.prompt}</span>
      <button class="btn-audio-speak" id="btn-audio-speak" title="Listen Question">🔊</button>
    `;
    
    document.getElementById('btn-audio-speak').addEventListener('click', () => {
      sound.speak(stage.prompt);
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
      default:
        this.renderCardsGrid(stage);
    }
  }

  renderHeader() {
    this.playerState.rankLevel = this.getRankLevel();
    this.elStars.textContent = `${this.playerState.stars} ★`;
    const streakNum = this.playerState.streak;
    this.elStreak.textContent = `${streakNum} ${streakNum === 1 ? 'Day' : 'Days'} 🔥`;
    this.elRank.textContent = `Lvl ${this.playerState.rankLevel}`;
  }

  /* ==========================================================================
     Shell Modals: Analytics, Badges, Streaks & Diploma Certificate
     ========================================================================== */
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
      courseCard.style.cssText = 'background:#F8FAFC; border:1px solid #E2E8F0; border-radius:14px; padding:16px; margin-bottom:14px; display:flex; flex-direction:column; gap:10px;';

      let levelsHTML = '';
      if (game.levelThemes) {
        levelsHTML = '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:8px; margin-top:4px;">';
        game.levelThemes.forEach(lvl => {
          const lvlStages = game.stages.filter(s => s.level === lvl.level);
          const lvlSolved = lvlStages.filter(s => gameProgress[s.stageNum] !== undefined).length;
          const isLvlDone = lvlSolved === lvlStages.length;
          levelsHTML += `
            <div style="background:${isLvlDone ? '#ECFDF5' : '#FFFFFF'}; border:1px solid ${isLvlDone ? '#A7F3D0' : '#E2E8F0'}; border-radius:8px; padding:6px 10px; font-size:12px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:700; color:${isLvlDone ? '#065F46' : '#475569'};">${lvl.icon} Lvl ${lvl.level}</span>
              <span style="font-weight:800; color:${isLvlDone ? '#059669' : '#64748B'};">${isLvlDone ? '✓ 5/5' : `${lvlSolved}/${lvlStages.length}`}</span>
            </div>
          `;
        });
        levelsHTML += '</div>';
      }

      courseCard.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px; font-weight:800; font-size:15px; color:var(--text-dark);">
            <span>${game.icon}</span>
            <span>${game.name}</span>
            <span style="font-size:12px; color:var(--text-muted); font-weight:600;">(${solved}/${total} Stages)</span>
          </div>
          <span style="font-weight:900; font-size:14px; color:var(--primary-indigo);">${pct}%</span>
        </div>
        <div class="analytics-progress-bar" style="height:8px; background:#E2E8F0; border-radius:4px; overflow:hidden;">
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
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${badge.desc}</div>
        <div style="margin-top:8px; font-weight:900; font-size:11px; color:${isUnlocked ? '#D97706' : '#94A3B8'};">
          ${isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
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
        <span class="streak-day-star">${isPast ? '✓' : '🔥'}</span>
        <span class="streak-day-bonus">+${d * 5} ★</span>
      `;
      streakRow.appendChild(card);
    }

    if (this.playerState.claimedStreakToday) {
      this.elBtnClaimStreak.textContent = '✓ Bonus Claimed Today!';
      this.elBtnClaimStreak.disabled = true;
      this.elBtnClaimStreak.style.opacity = '0.6';
    } else {
      this.elBtnClaimStreak.textContent = `🔥 Claim Today's Bonus (+${currentDay * 5} ★)`;
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
    
    // Advance streak day for next consecutive claim if under 7
    if (this.playerState.streak < 7) {
      this.playerState.streak += 1;
    }
    
    this.saveState();
    this.openStreakModal();
    alert(`🎉 Congratulations! You claimed +${bonus} Bonus Stars for your daily streak!`);
  }

  openCertificateModal() {
    sound.playFanfare();
    document.getElementById('cert-stars-val').textContent = `${this.playerState.stars} ★`;
    document.getElementById('cert-rank-val').textContent = this.getRankTitle();

    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    document.getElementById('cert-date-val').textContent = dateStr;

    this.elCertificateModal.classList.add('open');
  }

  /* ==========================================================================
     Engine Renders
     ========================================================================== */
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

  /* ==========================================================================
     Common Feedback Handlers
     ========================================================================== */
  handleCorrectAnswer() {
    sound.playSuccess();
    sound.playStar();

    const gameId = this.activeGame.id;
    if (!this.playerState.completedStages[gameId]) {
      this.playerState.completedStages[gameId] = {};
    }
    
    const prevStars = this.playerState.completedStages[gameId][this.currentStageData.stageNum] || 0;
    const newStars = 3;
    
    // Only grant incremental stars if first time or improved score
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
        this.elBtnVictoryNext.innerHTML = '🏆 View Diploma';
      } else {
        const nextStage = this.activeGame.stages[nextIdx];
        this.elBtnVictoryNext.innerHTML = `▶ Next Problem (${nextStage.stageNum}/${this.activeGame.stages.length})`;
      }
    }

    if (this.elVictoryFeedbackSub) {
      this.elVictoryFeedbackSub.textContent = isFinalStage
        ? "Incredible achievement! You mastered the entire course!"
        : "Outstanding logic skills! Keep up the momentum!";
    }

    this.elVictoryStars.innerHTML = `
      <span class="star-icon filled">★</span>
      <span class="star-icon filled">★</span>
      <span class="star-icon filled">★</span>
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
