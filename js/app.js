/**
 * LogicLike Application Controller & 5 Game Mechanics Engine
 * Stage 1: Card Grid Selection Engine Integrated.
 * Stage 2: Drag & Drop Balance Scale Physics Engine Integrated.
 * Stage 3: Numeric Keypad & Rebus Math Engine Integrated.
 * Stage 4: 3D Isometric Cube Counter Engine Integrated.
 * Stage 5: Sudoku & Matrix Grid Engine Integrated.
 * Stage 6: Unified Platform Shell, Persistence & Gamification Economy Integrated.
 */

import { sound } from './audio.js';
import { GAMES_CATALOG } from './games.js';
import { CardGridEngine } from './engines/card_grid_engine.js';
import { BalanceScaleEngine } from './engines/balance_scale_engine.js';
import { RebusKeypadEngine } from './engines/rebus_keypad_engine.js';
import { Spatial3DEngine } from './engines/spatial_3d_engine.js';
import { SudokuMatrixEngine } from './engines/sudoku_matrix_engine.js';

const BADGES_CATALOG = [
  { id: 'first_step', icon: '🌟', name: 'First Steps', desc: 'Solve your first logic puzzle', check: (state, totalSolved) => totalSolved >= 1 },
  { id: 'card_master', icon: '🎴', name: 'Card Detective', desc: 'Complete 5 Card Grid stages', check: (state) => Object.keys(state.completedStages['logic-odd-one-out'] || {}).length >= 5 },
  { id: 'balance_guru', icon: '⚖️', name: 'Physics Master', desc: 'Complete 5 Balance Scale stages', check: (state) => Object.keys(state.completedStages['math-balance-scales'] || {}).length >= 5 },
  { id: 'rebus_wizard', icon: '🔢', name: 'Rebus Wizard', desc: 'Complete 5 Rebus Math stages', check: (state) => Object.keys(state.completedStages['math-rebus-keypad'] || {}).length >= 5 },
  { id: 'cube_architect', icon: '📦', name: 'Spatial Architect', desc: 'Complete 5 3D Isometric stages', check: (state) => Object.keys(state.completedStages['spatial-3d-cubes'] || {}).length >= 5 },
  { id: 'sudoku_genius', icon: '🧩', name: 'Sudoku Genius', desc: 'Complete 5 Sudoku Matrix stages', check: (state) => Object.keys(state.completedStages['sudoku-matrix-grid'] || {}).length >= 5 },
  { id: 'streak_champ', icon: '🔥', name: 'Streak Champion', desc: 'Reach a 5-day daily streak', check: (state) => state.streak >= 5 },
  { id: 'grandmaster', icon: '👑', name: 'Logic Grandmaster', desc: 'Earn 150+ stars across all courses', check: (state) => state.stars >= 150 }
];

class AppController {
  constructor() {
    this.activeCategory = "cards-grid";
    this.activeGame = GAMES_CATALOG[0];
    this.activeStageIndex = 0;
    this.currentStageData = null;

    // Sub-engines
    this.cardGridEngine = new CardGridEngine(this);
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
    this.renderCategoryNav();
    this.renderRoadmap();
  }

  loadState() {
    const saved = localStorage.getItem('logiclike_demo_player');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            stars: parsed.stars ?? 0,
            streak: parsed.streak ?? 1,
            rankLevel: parsed.rankLevel ?? 1,
            claimedStreakToday: parsed.claimedStreakToday ?? false,
            completedStages: parsed.completedStages || {}
          };
        }
      } catch(e) {}
    }
    return {
      stars: 0,
      streak: 1,
      rankLevel: 1,
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

  getRankTitle() {
    const totalSolved = this.getTotalStagesSolved();
    if (totalSolved >= 70) return "Lvl 15 • Grandmaster Logician";
    if (totalSolved >= 50) return "Lvl 12 • Cognitive Strategist";
    if (totalSolved >= 35) return "Lvl 9 • Logic Detective";
    if (totalSolved >= 20) return "Lvl 6 • Junior Thinker";
    return "Lvl 3 • Novice Explorer";
  }

  initDOMElements() {
    this.elStars = document.getElementById('stat-stars');
    this.elStreak = document.getElementById('stat-streak');
    this.elRank = document.getElementById('stat-rank');
    this.elAudioBtn = document.getElementById('btn-audio-toggle');
    this.elCategoryNav = document.getElementById('category-nav');

    this.elBannerTitle = document.getElementById('banner-title');
    this.elBannerDesc = document.getElementById('banner-desc');

    this.elRoadmapList = document.getElementById('roadmap-list');

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
      if (this.currentStageData && this.currentStageData.type === 'cards-grid') {
        this.cardGridEngine.executeHint(this.elGameArena);
      } else if (this.currentStageData && this.currentStageData.type === 'balance-scale') {
        this.balanceScaleEngine.executeHint(this.elGameArena);
      } else if (this.currentStageData && this.currentStageData.type === 'rebus-keypad') {
        this.rebusKeypadEngine.executeHint(this.elGameArena);
      } else if (this.currentStageData && this.currentStageData.type === 'spatial-3d') {
        this.spatial3DEngine.executeHint(this.elGameArena);
      } else if (this.currentStageData && this.currentStageData.type === 'sudoku-matrix') {
        this.sudokuMatrixEngine.executeHint(this.elGameArena);
      } else if (this.currentStageData) {
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

    this.elBtnVictoryContinue.addEventListener('click', () => {
      this.closeAllModals();
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
          claimedStreakToday: false,
          completedStages: {}
        };
        this.saveState();
        this.closeAllModals();
        this.renderRoadmap();
        this.renderCategoryNav();
      }
    });
  }

  renderHeader() {
    this.elStars.textContent = `${this.playerState.stars} ★`;
    this.elStreak.textContent = `${this.playerState.streak} Days 🔥`;
    this.elRank.textContent = `Lvl ${this.playerState.rankLevel}`;
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
        <span class="nav-tab-badge" style="font-size:11px; opacity:0.8; margin-left:6px; background:rgba(0,0,0,0.06); padding:2px 8px; border-radius:10px;">${completedCount}/${totalCount}</span>
      `;
      btn.addEventListener('click', () => {
        sound.playTap();
        this.activeCategory = game.category;
        this.activeGame = game;
        this.renderCategoryNav();
        this.renderRoadmap();
      });
      this.elCategoryNav.appendChild(btn);
    });
  }

  renderRoadmap() {
    const game = this.activeGame;
    this.elBannerTitle.textContent = `${game.icon} ${game.name}`;
    this.elBannerDesc.textContent = game.description;

    this.elRoadmapList.innerHTML = '';
    const gameProgress = this.playerState.completedStages[game.id] || {};

    game.stages.forEach((stage, idx) => {
      const isCompleted = gameProgress[stage.stageNum] !== undefined;
      const starsEarned = gameProgress[stage.stageNum] || 0;
      
      const isUnlocked = idx === 0 || gameProgress[stage.stageNum - 1] !== undefined;
      const isActive = isUnlocked && !isCompleted;

      let statusClass = 'locked';
      if (isCompleted) statusClass = 'completed';
      else if (isActive) statusClass = 'active';

      const nodeEl = document.createElement('div');
      nodeEl.className = `stage-node ${statusClass}`;
      
      let starsHTML = '';
      if (isCompleted) {
        for (let s = 1; s <= 3; s++) {
          starsHTML += `<span class="star-icon ${s <= starsEarned ? 'filled' : 'empty'}">★</span>`;
        }
      }

      nodeEl.innerHTML = `
        <div class="node-left">
          <div class="node-number">${isCompleted ? '✓' : (isUnlocked ? stage.stageNum : '🔒')}</div>
          <div class="node-info">
            <h4>Stage ${stage.stageNum}: ${stage.title}</h4>
            <p>${stage.subtitle}</p>
          </div>
        </div>
        <div class="node-right">
          ${isCompleted ? `<div class="star-rating">${starsHTML}</div>` : ''}
          ${isUnlocked ? `<button class="btn-play-stage">${isCompleted ? 'Replay' : 'Play Stage'}</button>` : '<span style="color:#94A3B8; font-weight:700;">Locked</span>'}
        </div>
      `;

      if (isUnlocked) {
        nodeEl.addEventListener('click', () => {
          sound.playTap();
          this.launchStage(idx);
        });
      }

      this.elRoadmapList.appendChild(nodeEl);
    });
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

  /* ==========================================================================
     Shell Modals: Analytics, Badges, Streaks & Diploma Certificate
     ========================================================================== */
  openAnalyticsModal() {
    sound.playTap();
    const totalSolved = this.getTotalStagesSolved();
    document.getElementById('analytics-total-stages').textContent = `${totalSolved} / 75`;
    document.getElementById('analytics-total-stars').textContent = `${this.playerState.stars} ★`;
    document.getElementById('analytics-rank-title').textContent = this.getRankTitle();

    const breakdownList = document.getElementById('analytics-breakdown-list');
    breakdownList.innerHTML = '';

    GAMES_CATALOG.forEach(game => {
      const solved = Object.keys(this.playerState.completedStages[game.id] || {}).length;
      const total = game.stages.length;
      const pct = Math.round((solved / total) * 100);

      const row = document.createElement('div');
      row.className = 'analytics-row';
      row.innerHTML = `
        <div class="analytics-row-info">
          <span>${game.icon}</span>
          <span>${game.name} (${solved}/${total})</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="analytics-progress-bar">
            <div class="analytics-progress-fill" style="width: ${pct}%;"></div>
          </div>
          <span style="font-weight:900; font-size:13px; color:var(--primary-indigo); min-width:40px; text-align:right;">${pct}%</span>
        </div>
      `;
      breakdownList.appendChild(row);
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
    const bonus = Math.min(this.playerState.streak, 7) * 5;
    this.playerState.stars += bonus;
    this.playerState.claimedStreakToday = true;
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
    
    this.playerState.completedStages[gameId][this.currentStageData.stageNum] = 3;
    this.playerState.stars += 3;
    
    // Update player rank level dynamically
    const totalSolved = this.getTotalStagesSolved();
    this.playerState.rankLevel = Math.max(this.playerState.rankLevel, Math.min(15, Math.floor(totalSolved / 5) + 1));
    this.saveState();

    this.closeGameModal();

    this.elVictoryStars.innerHTML = `
      <span class="star-icon filled">★</span>
      <span class="star-icon filled">★</span>
      <span class="star-icon filled">★</span>
    `;
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
