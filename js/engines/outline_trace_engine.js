/**
 * LogicLike Outline Tracing Engine - Loader Bar Pull Mechanic
 * Kids pull an interactive glowing tracer knob along the shape outline.
 * The shape fills up smoothly like a glowing loader/progress bar.
 * Features:
 * - Direct path-constrained slider/loader pulling along SVG geometry
 * - Glowing liquid progress stroke fill (stroke-dashoffset)
 * - Milestone checkpoints (25%, 50%, 75%, 100%) with audio chimes & sparkle burst
 * - Interactive draggable glowing handle with pulsing ring and direction hint
 * - Show Guide Demo animation and assist hint
 */

import { sound } from '../audio.js';

// Predefined shape paths in a 400x340 bounding box
const SHAPE_DEFINITIONS = {
  'star': {
    name: 'Five-Point Star',
    icon: '⭐',
    d: 'M 200,35 L 245,130 L 355,135 L 270,205 L 300,310 L 200,245 L 100,310 L 130,205 L 45,135 L 155,130 Z',
    color: '#F59E0B'
  },
  'heart': {
    name: 'Love Heart',
    icon: '❤️',
    d: 'M 200,105 C 200,75 170,45 130,45 C 80,45 50,90 50,135 C 50,215 140,265 200,305 C 260,265 350,215 350,135 C 350,90 320,45 270,45 C 230,45 200,75 200,105 Z',
    color: '#EC4899'
  },
  'triangle': {
    name: 'Equilateral Triangle',
    icon: '🔺',
    d: 'M 200,45 L 350,290 L 50,290 Z',
    color: '#3B82F6'
  },
  'diamond': {
    name: 'Sparkling Diamond',
    icon: '💎',
    d: 'M 200,35 L 340,170 L 200,305 L 60,170 Z',
    color: '#06B6D4'
  },
  'number-8': {
    name: 'Number 8',
    icon: '8️⃣',
    d: 'M 200,175 C 245,175 275,140 275,95 C 275,50 240,30 200,30 C 160,30 125,50 125,95 C 125,140 155,175 200,175 C 250,175 285,210 285,260 C 285,310 245,330 200,330 C 155,330 115,310 115,260 C 115,210 150,175 200,175 Z',
    color: '#8B5CF6'
  },
  'letter-a': {
    name: 'Letter A',
    icon: '🔤',
    d: 'M 90,295 L 200,45 L 310,295 L 265,205 L 135,205',
    color: '#10B981'
  },
  'moon': {
    name: 'Crescent Moon',
    icon: '🌙',
    d: 'M 250,45 C 140,55 80,140 80,210 C 80,280 150,315 240,315 C 170,280 160,160 250,45 Z',
    color: '#FBBF24'
  },
  'rocket': {
    name: 'Space Rocket',
    icon: '🚀',
    d: 'M 200,30 C 240,80 255,160 250,250 L 290,280 L 245,270 L 200,305 L 155,270 L 110,280 L 150,250 C 145,160 160,80 200,30 Z',
    color: '#EF4444'
  },
  'butterfly': {
    name: 'Butterfly Wings',
    icon: '🦋',
    d: 'M 200,140 C 220,60 330,50 340,130 C 350,180 280,210 200,180 C 280,230 330,300 270,300 C 220,300 210,240 200,200 C 190,240 180,300 130,300 C 70,300 120,230 200,180 C 120,210 50,180 60,130 C 70,50 180,60 200,140 Z',
    color: '#A855F7'
  }
};

export class OutlineTraceEngine {
  constructor(appController) {
    this.app = appController;
    this.currentStage = null;
    this.svgEl = null;
    this.basePathEl = null;
    this.loaderPathEl = null;
    this.handleEl = null;
    this.totalLength = 0;
    this.progress = 0; // 0.0 to 1.0
    this.isDragging = false;
    this.isCompleted = false;
    this.samples = []; // Precomputed points { len, x, y }
    this.brushColor = '#22C55E';
    this.hintStep = 0;
    this.isGuideAnimating = false;
    this.guideAnimId = null;
    this.lastMilestone = 0;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.isCompleted = false;
    this.progress = 0;
    this.hintStep = 0;
    this.lastMilestone = 0;
    this.isGuideAnimating = false;
    if (this.guideAnimId) cancelAnimationFrame(this.guideAnimId);

    containerEl.innerHTML = '';

    const shapeKey = stage.shape || 'star';
    const shapeDef = SHAPE_DEFINITIONS[shapeKey] || SHAPE_DEFINITIONS['star'];
    const pathD = stage.customPath || shapeDef.d;
    this.brushColor = stage.brushColor || shapeDef.color || '#22C55E';

    const wrapper = document.createElement('div');
    wrapper.className = 'outline-trace-wrapper';

    // Top status banner
    const headerBar = document.createElement('div');
    headerBar.className = 'trace-header-bar';
    headerBar.innerHTML = `
      <div class="trace-target-badge">
        <span class="trace-target-icon">${shapeDef.icon}</span>
        <span class="trace-target-name">${stage.shapeName || shapeDef.name}</span>
      </div>
      <div class="trace-progress-pill">
        <div class="trace-progress-ring">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle" id="trace-circle-fill" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
        </div>
        <span class="trace-progress-text" id="trace-pct-text">Pull handle to trace!</span>
      </div>
    `;
    wrapper.appendChild(headerBar);

    // Tracing Stage Board with SVG Loader Bar Track
    const stageBoard = document.createElement('div');
    stageBoard.className = 'trace-stage-board loader-trace-board';
    stageBoard.id = 'trace-stage-board';

    stageBoard.innerHTML = `
      <svg class="trace-guide-svg" id="trace-svg-elem" viewBox="0 0 400 340" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="trace-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="trace-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${this.brushColor}" />
            <stop offset="100%" stop-color="#38BDF8" />
          </linearGradient>
          <filter id="handle-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="rgba(0,0,0,0.35)"/>
          </filter>
        </defs>

        <!-- Wide background track -->
        <path class="trace-track-bg" id="trace-track-bg" d="${pathD}" />

        <!-- Dashed centerline guide -->
        <path class="trace-track-dash" id="trace-track-dash" d="${pathD}" />

        <!-- Milestone Checkpoint markers -->
        <g id="trace-milestones"></g>

        <!-- Active Loader Bar Fill Path (Grows as user pulls) -->
        <path class="trace-loader-path" id="trace-loader-path" d="${pathD}" stroke="${this.brushColor}" />

        <!-- Start Flag Indicator -->
        <g id="trace-start-node" class="trace-start-node">
          <circle cx="0" cy="0" r="14" fill="#22C55E" stroke="#FFFFFF" stroke-width="3" />
          <text x="0" y="4" font-size="10" font-weight="900" fill="#FFF" text-anchor="middle">START</text>
        </g>

        <!-- Draggable Glowing Pull Knob / Handle -->
        <g id="trace-pull-handle" class="trace-pull-handle" filter="url(#handle-shadow)" style="cursor: grab;">
          <!-- Pulsing halo -->
          <circle class="handle-halo" cx="0" cy="0" r="26" fill="${this.brushColor}" opacity="0.35"></circle>
          <!-- Main knob circle -->
          <circle class="handle-body" cx="0" cy="0" r="19" fill="#FFFFFF" stroke="${this.brushColor}" stroke-width="4"></circle>
          <!-- Inner icon / chevron -->
          <text class="handle-icon" id="handle-icon" x="0" y="6" font-size="14" font-weight="900" text-anchor="middle" fill="${this.brushColor}">${shapeDef.icon || '✨'}</text>
          <!-- Tooltip badge -->
          <g id="handle-tooltip" class="handle-tooltip">
            <rect x="-35" y="-36" width="70" height="20" rx="10" fill="#1E293B" opacity="0.9"></rect>
            <text x="0" y="-22" font-size="10" font-weight="800" fill="#FFF" text-anchor="middle">PULL ME ➡️</text>
          </g>
        </g>
      </svg>
      <div class="trace-sparkle-layer" id="trace-sparkle-layer"></div>
    `;

    wrapper.appendChild(stageBoard);

    // Toolbar (Clear, Demo Guide, Hint)
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar trace-toolbar';
    toolbar.innerHTML = `
      <button class="btn-secondary" id="btn-trace-clear">🔄 Reset</button>
      <button class="btn-engine-hint" id="btn-trace-guide">✨ Watch Demo</button>
      <button class="btn-engine-hint" id="btn-trace-hint">💡 Hint</button>
    `;

    toolbar.querySelector('#btn-trace-clear').addEventListener('click', () => {
      sound.playTap();
      this.resetProgress();
    });

    toolbar.querySelector('#btn-trace-guide').addEventListener('click', () => {
      sound.playTap();
      this.runGuideDemo();
    });

    toolbar.querySelector('#btn-trace-hint').addEventListener('click', () => {
      this.executeHint(wrapper);
    });

    wrapper.appendChild(toolbar);
    containerEl.appendChild(wrapper);

    // Setup Engine Elements and Interaction
    setTimeout(() => {
      this.initLoaderEngine(stageBoard, pathD);
    }, 40);
  }

  initLoaderEngine(stageBoard, pathD) {
    this.svgEl = stageBoard.querySelector('#trace-svg-elem');
    this.basePathEl = stageBoard.querySelector('#trace-track-bg');
    this.loaderPathEl = stageBoard.querySelector('#trace-loader-path');
    this.handleEl = stageBoard.querySelector('#trace-pull-handle');

    if (!this.svgEl || !this.basePathEl || !this.loaderPathEl || !this.handleEl) return;

    this.totalLength = this.basePathEl.getTotalLength() || 1000;

    // Set stroke dasharray for the loader path
    this.loaderPathEl.style.strokeDasharray = `${this.totalLength} ${this.totalLength}`;
    this.loaderPathEl.style.strokeDashoffset = `${this.totalLength}`;

    // Sample path points at high density (300 points) for precise snap & pull
    this.samples = [];
    const sampleCount = 300;
    for (let i = 0; i <= sampleCount; i++) {
      const len = (i / sampleCount) * this.totalLength;
      const pt = this.basePathEl.getPointAtLength(len);
      this.samples.push({ len, x: pt.x, y: pt.y, ratio: i / sampleCount });
    }

    // Set start node position
    const startPt = this.basePathEl.getPointAtLength(0);
    const startNode = stageBoard.querySelector('#trace-start-node');
    if (startNode) {
      startNode.setAttribute('transform', `translate(${startPt.x}, ${startPt.y})`);
    }

    // Render Milestone checkpoint dots (25%, 50%, 75%, 100%)
    const milestonesG = stageBoard.querySelector('#trace-milestones');
    if (milestonesG) {
      milestonesG.innerHTML = '';
      [0.25, 0.5, 0.75, 1.0].forEach((ratio) => {
        const pt = this.basePathEl.getPointAtLength(ratio * this.totalLength);
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pt.x);
        circle.setAttribute('cy', pt.y);
        circle.setAttribute('r', '7');
        circle.setAttribute('class', 'trace-milestone-dot');
        circle.setAttribute('data-ratio', ratio);
        circle.setAttribute('fill', '#FFFFFF');
        circle.setAttribute('stroke', '#94A3B8');
        circle.setAttribute('stroke-width', '3');
        milestonesG.appendChild(circle);
      });
    }

    // Position Handle at start (progress 0)
    this.updateLoaderVisuals(0);

    // Bind touch / mouse dragging events
    this.bindPullEvents(stageBoard);
  }

  updateLoaderVisuals(progressRatio) {
    this.progress = Math.max(0, Math.min(1.0, progressRatio));
    const currentLen = this.progress * this.totalLength;

    // 1. Update SVG filled loader bar length
    if (this.loaderPathEl) {
      const offset = this.totalLength - currentLen;
      this.loaderPathEl.style.strokeDashoffset = `${offset}`;
    }

    // 2. Position Draggable Handle Knob
    if (this.basePathEl && this.handleEl) {
      const pt = this.basePathEl.getPointAtLength(currentLen);
      this.handleEl.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);

      // Hide "PULL ME" tooltip once user has started pulling
      const tooltip = document.getElementById('handle-tooltip');
      if (tooltip) {
        tooltip.style.display = this.progress > 0.05 ? 'none' : 'block';
      }
    }

    // 3. Update Milestones status
    const milestoneDots = this.svgEl.querySelectorAll('.trace-milestone-dot');
    milestoneDots.forEach(dot => {
      const dotRatio = parseFloat(dot.getAttribute('data-ratio') || '0');
      if (this.progress >= dotRatio) {
        dot.setAttribute('fill', this.brushColor);
        dot.setAttribute('stroke', '#FFFFFF');
        dot.classList.add('reached');
      } else {
        dot.setAttribute('fill', '#FFFFFF');
        dot.setAttribute('stroke', '#94A3B8');
        dot.classList.remove('reached');
      }
    });

    // 4. Update Header Progress Bar
    const pct = Math.round(this.progress * 100);
    const circle = document.getElementById('trace-circle-fill');
    const text = document.getElementById('trace-pct-text');
    if (circle) circle.setAttribute('stroke-dasharray', `${pct}, 100`);
    if (text) {
      if (pct >= 95) text.textContent = `⭐ Complete (100%)!`;
      else if (pct >= 75) text.textContent = `🔥 Almost there (${pct}%)!`;
      else if (pct >= 50) text.textContent = `🌟 Halfway (${pct}%)!`;
      else if (pct > 0) text.textContent = `⚡ ${pct}% Traced`;
      else text.textContent = `Pull handle to trace!`;
    }

    // Audio milestone chimes
    const currentMilestone = Math.floor(this.progress * 4);
    if (currentMilestone > this.lastMilestone && currentMilestone > 0) {
      this.lastMilestone = currentMilestone;
      sound.playSparkle();
      this.emitHandleSparkles();
    }
  }

  bindPullEvents(stageBoard) {
    const getSvgPoint = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const pt = this.svgEl.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = this.svgEl.getScreenCTM();
      if (ctm) {
        return pt.matrixTransform(ctm.inverse());
      }
      const rect = this.svgEl.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * 400,
        y: ((clientY - rect.top) / rect.height) * 340
      };
    };

    const startPull = (e) => {
      if (this.isCompleted || this.isGuideAnimating) return;
      const pt = getSvgPoint(e);
      const currentPt = this.basePathEl.getPointAtLength(this.progress * this.totalLength);
      const dist = Math.hypot(pt.x - currentPt.x, pt.y - currentPt.y);

      // Allow grabbing within 65px radius of knob, or anywhere near current progress
      if (dist <= 65 || this.progress === 0) {
        e.preventDefault();
        this.isDragging = true;
        this.handleEl.style.cursor = 'grabbing';
        sound.playTap();
      }
    };

    const movePull = (e) => {
      if (!this.isDragging || this.isCompleted || this.isGuideAnimating) return;
      e.preventDefault();
      const pt = getSvgPoint(e);

      // Find closest sample point within an allowable advance window ahead of current progress
      const currentIdx = Math.round(this.progress * (this.samples.length - 1));
      // Look forward up to ~25% of the path to allow smooth pull without skipping
      const searchLookahead = Math.floor(this.samples.length * 0.28);
      const searchLookbehind = Math.floor(this.samples.length * 0.10);
      const startIdx = Math.max(0, currentIdx - searchLookbehind);
      const endIdx = Math.min(this.samples.length - 1, currentIdx + searchLookahead);

      let bestDist = Infinity;
      let bestSample = null;

      for (let i = startIdx; i <= endIdx; i++) {
        const s = this.samples[i];
        const d = Math.hypot(pt.x - s.x, pt.y - s.y);
        if (d < bestDist) {
          bestDist = d;
          bestSample = s;
        }
      }

      // If user pointer is close enough to the path geometry (within 60px)
      if (bestSample && bestDist <= 65) {
        // Advance loader bar progress
        if (bestSample.ratio > this.progress) {
          this.updateLoaderVisuals(bestSample.ratio);
        } else if (bestSample.ratio < this.progress && this.progress - bestSample.ratio < 0.05) {
          // Allow slight nudge backwards if desired
          this.updateLoaderVisuals(bestSample.ratio);
        }

        // Check completion (>= 96%)
        if (this.progress >= 0.96 && !this.isCompleted) {
          this.updateLoaderVisuals(1.0);
          this.triggerVictory();
        }
      }
    };

    const endPull = () => {
      if (this.isDragging) {
        this.isDragging = false;
        if (this.handleEl) this.handleEl.style.cursor = 'grab';
      }
    };

    stageBoard.addEventListener('mousedown', startPull);
    window.addEventListener('mousemove', movePull);
    window.addEventListener('mouseup', endPull);

    stageBoard.addEventListener('touchstart', startPull, { passive: false });
    window.addEventListener('touchmove', movePull, { passive: false });
    window.addEventListener('touchend', endPull);
  }

  emitHandleSparkles() {
    const layer = document.getElementById('trace-sparkle-layer');
    if (!layer || !this.basePathEl) return;

    const currentPt = this.basePathEl.getPointAtLength(this.progress * this.totalLength);
    const rect = this.svgEl.getBoundingClientRect();
    const px = (currentPt.x / 400) * rect.width;
    const py = (currentPt.y / 340) * rect.height;

    for (let i = 0; i < 8; i++) {
      const spark = document.createElement('div');
      spark.className = 'trace-sparkle-particle';
      const angle = Math.random() * Math.PI * 2;
      const dist = 15 + Math.random() * 30;
      spark.style.cssText = `
        position: absolute;
        left: ${px}px;
        top: ${py}px;
        width: 8px;
        height: 8px;
        background: ${this.brushColor};
        border-radius: 50%;
        box-shadow: 0 0 8px ${this.brushColor};
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: all 0.45s ease-out;
      `;
      layer.appendChild(spark);
      requestAnimationFrame(() => {
        spark.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
        spark.style.opacity = '0';
      });
      setTimeout(() => spark.remove(), 480);
    }
  }

  resetProgress() {
    if (this.isGuideAnimating) {
      if (this.guideAnimId) cancelAnimationFrame(this.guideAnimId);
      this.isGuideAnimating = false;
    }
    this.isCompleted = false;
    this.lastMilestone = 0;
    this.updateLoaderVisuals(0);
  }

  runGuideDemo() {
    if (this.isGuideAnimating) return;
    this.resetProgress();
    this.isGuideAnimating = true;

    const duration = 2400; // ms
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const r = Math.min(1.0, elapsed / duration);

      this.updateLoaderVisuals(r);

      if (r < 1.0) {
        this.guideAnimId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          this.isGuideAnimating = false;
          this.resetProgress();
          const text = document.getElementById('trace-pct-text');
          if (text) text.textContent = '👉 Your turn! Pull the handle!';
        }, 500);
      }
    };

    this.guideAnimId = requestAnimationFrame(animate);
  }

  triggerVictory() {
    this.isCompleted = true;
    sound.playSuccess();
    sound.playStar();

    // Trigger celebration sparkles
    this.createConfettiSparkles();

    // Pulse knob victory
    if (this.handleEl) {
      this.handleEl.classList.add('victory-pop');
    }

    setTimeout(() => {
      this.app.handleCorrectAnswer();
    }, 700);
  }

  createConfettiSparkles() {
    const layer = document.getElementById('trace-sparkle-layer');
    if (!layer) return;

    layer.innerHTML = '';
    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#06B6D4'];
    const count = 36;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'trace-sparkle-particle';
      const angle = (i / count) * 360;
      const dist = 60 + Math.random() * 110;
      const color = colors[i % colors.length];

      spark.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: ${8 + Math.random() * 8}px;
        height: ${8 + Math.random() * 8}px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 10px ${color};
        transform: translate(-50%, -50%) rotate(${angle}deg) translate(${dist}px);
        opacity: 1;
        transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
      `;
      layer.appendChild(spark);
    }
  }

  executeHint(wrapperEl) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapperEl.querySelector('#btn-trace-hint');

    if (this.hintStep === 1) {
      btnHint.textContent = '💡 Hint 1/3 (Demo Guide)';
      this.runGuideDemo();
    } else if (this.hintStep === 2) {
      btnHint.textContent = '💡 Hint 2/3 (+40% Assist)';
      // Pull loader bar forward 40%
      const newProg = Math.min(0.9, this.progress + 0.40);
      this.updateLoaderVisuals(newProg);
      sound.playSparkle();
    } else {
      btnHint.textContent = '💡 Hint Used (Reset)';
      alert(`💡 TRACING GUIDE:\n\n${this.currentStage.hint || 'Grab the glowing handle and pull it along the shape outline like a loader bar until it fills 100%!'}`);
    }
  }
}

