/**
 * Kiddy Learn - Outline Tracing Engine - Refined Loader Bar Pull Mechanic
 * Features:
 * - Ultra-smooth path-constrained dragging with pointer capture
 * - Tangent-aligned rotating tracer head (guides along curves & sharp corners)
 * - Liquid shape silhouette fill that illuminates with progress
 * - Dynamic audio pitch ticking and milestone starbursts
 * - Directional motion cues & glowing neon trail
 * - Zero-snag vertex interpolation for all shapes
 */

import { sound } from '../audio.js';
import { getSvgIcon } from '../icons.js';

// Predefined shape paths in a 400x340 bounding box
const SHAPE_DEFINITIONS = {
  'star': {
    name: 'Five-Point Star',
    iconKey: 'shape-star',
    d: 'M 200,35 L 245,130 L 355,135 L 270,205 L 300,310 L 200,245 L 100,310 L 130,205 L 45,135 L 155,130 Z',
    color: '#F59E0B'
  },
  'heart': {
    name: 'Love Heart',
    iconKey: 'shape-heart',
    d: 'M 200,105 C 200,75 170,45 130,45 C 80,45 50,90 50,135 C 50,215 140,265 200,305 C 260,265 350,215 350,135 C 350,90 320,45 270,45 C 230,45 200,75 200,105 Z',
    color: '#EC4899'
  },
  'triangle': {
    name: 'Equilateral Triangle',
    iconKey: 'shape-triangle',
    d: 'M 200,45 L 350,290 L 50,290 Z',
    color: '#3B82F6'
  },
  'diamond': {
    name: 'Sparkling Diamond',
    iconKey: 'shape-diamond',
    d: 'M 200,35 L 340,170 L 200,305 L 60,170 Z',
    color: '#06B6D4'
  },
  'number-8': {
    name: 'Number 8',
    iconKey: 'rebus-keypad',
    d: 'M 200,175 C 245,175 275,140 275,95 C 275,50 240,30 200,30 C 160,30 125,50 125,95 C 125,140 155,175 200,175 C 250,175 285,210 285,260 C 285,310 245,330 200,330 C 155,330 115,310 115,260 C 115,210 150,175 200,175 Z',
    color: '#8B5CF6'
  },
  'letter-a': {
    name: 'Letter A',
    iconKey: 'cards-grid',
    d: 'M 90,295 L 200,45 L 310,295 L 265,205 L 135,205',
    color: '#10B981'
  },
  'moon': {
    name: 'Crescent Moon',
    iconKey: 'shape-moon',
    d: 'M 250,45 C 140,55 80,140 80,210 C 80,280 150,315 240,315 C 170,280 160,160 250,45 Z',
    color: '#FBBF24'
  },
  'rocket': {
    name: 'Space Rocket',
    iconKey: 'rocket',
    d: 'M 200,30 C 240,80 255,160 250,250 L 290,280 L 245,270 L 200,305 L 155,270 L 110,280 L 150,250 C 145,160 160,80 200,30 Z',
    color: '#EF4444'
  },
  'butterfly': {
    name: 'Butterfly Wings',
    iconKey: 'shape-butterfly',
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
    this.shapeFillEl = null;
    this.handleEl = null;
    this.totalLength = 0;
    this.progress = 0; // 0.0 to 1.0
    this.isDragging = false;
    this.isCompleted = false;
    this.samples = []; // High resolution points { len, x, y, ratio, angle }
    this.brushColor = '#22C55E';
    this.hintStep = 0;
    this.isGuideAnimating = false;
    this.guideAnimId = null;
    this.lastMilestone = 0;
    this.lastSoundProgress = 0;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.isCompleted = false;
    this.progress = 0;
    this.hintStep = 0;
    this.lastMilestone = 0;
    this.lastSoundProgress = 0;
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
        <span class="trace-target-icon">${getSvgIcon(shapeDef.iconKey, 'icon-sm')}</span>
        <span class="trace-target-name">${stage.shapeName || shapeDef.name}</span>
      </div>
      <div class="trace-progress-pill">
        <div class="trace-progress-ring">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle" id="trace-circle-fill" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
        </div>
        <span class="trace-progress-text" id="trace-pct-text">Drag handle to trace!</span>
      </div>
    `;
    wrapper.appendChild(headerBar);

    // Tracing Stage Board
    const stageBoard = document.createElement('div');
    stageBoard.className = 'trace-stage-board loader-trace-board';
    stageBoard.id = 'trace-stage-board';

    stageBoard.innerHTML = `
      <svg class="trace-guide-svg" id="trace-svg-elem" viewBox="0 0 400 340" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="trace-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1"/>
            <feMerge>
              <feMergeNode in="blur1"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="handle-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="rgba(0,0,0,0.25)"/>
          </filter>
        </defs>

        <path class="trace-shape-fill" id="trace-shape-fill" d="${pathD}" fill="${this.brushColor}" fill-opacity="0.04" />
        <path class="trace-track-bg" id="trace-track-bg" d="${pathD}" />
        <path class="trace-track-dash" id="trace-track-dash" d="${pathD}" />
        <path class="trace-loader-path" id="trace-loader-path" d="${pathD}" stroke="${this.brushColor}" />

        <g id="trace-pull-handle" class="trace-pull-handle" filter="url(#handle-shadow)">
          <circle class="handle-body" cx="0" cy="0" r="14" fill="#FFFFFF" stroke="${this.brushColor}" stroke-width="4"></circle>
          <circle class="handle-core" cx="0" cy="0" r="5" fill="${this.brushColor}"></circle>
        </g>
      </svg>
      <div class="trace-sparkle-layer" id="trace-sparkle-layer"></div>
    `;

    wrapper.appendChild(stageBoard);

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar trace-toolbar';
    toolbar.innerHTML = `
      <button class="btn-secondary" id="btn-trace-clear">${getSvgIcon('replay', 'icon-xs')} <span>Reset</span></button>
      <button class="btn-engine-hint" id="btn-trace-guide">${getSvgIcon('star', 'icon-xs')} <span>Demo</span></button>
      <button class="btn-engine-hint" id="btn-trace-hint">${getSvgIcon('hint', 'icon-xs')} <span>Hint</span></button>
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
    this.shapeFillEl = stageBoard.querySelector('#trace-shape-fill');
    this.handleEl = stageBoard.querySelector('#trace-pull-handle');

    if (!this.svgEl || !this.basePathEl || !this.loaderPathEl || !this.handleEl) return;

    this.totalLength = this.basePathEl.getTotalLength() || 1000;

    // Set stroke dasharray for the loader path
    this.loaderPathEl.style.strokeDasharray = `${this.totalLength} ${this.totalLength}`;
    this.loaderPathEl.style.strokeDashoffset = `${this.totalLength}`;

    // Pre-sample 600 points for silky smooth drag interpolation & tangent orientation
    this.samples = [];
    const sampleCount = 600;
    for (let i = 0; i <= sampleCount; i++) {
      const len = (i / sampleCount) * this.totalLength;
      const pt = this.basePathEl.getPointAtLength(len);
      
      // Compute tangent angle
      const p1 = this.basePathEl.getPointAtLength(Math.max(0, len - 2));
      const p2 = this.basePathEl.getPointAtLength(Math.min(this.totalLength, len + 2));
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

      this.samples.push({ len, x: pt.x, y: pt.y, ratio: i / sampleCount, angle });
    }

    // Initial positioning at 0%
    this.updateLoaderVisuals(0);

    // Bind rock-solid Pointer Drag Events
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

    // 2. Dynamic Silhouette Fill illumination
    if (this.shapeFillEl) {
      this.shapeFillEl.setAttribute('fill-opacity', `${0.04 + this.progress * 0.22}`);
    }

    // 3. Position Handle Knob
    if (this.basePathEl && this.handleEl) {
      const pt = this.basePathEl.getPointAtLength(currentLen);
      this.handleEl.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
    }

    // 4. Update Header Progress Bar
    const pct = Math.round(this.progress * 100);
    const circle = document.getElementById('trace-circle-fill');
    const text = document.getElementById('trace-pct-text');
    if (circle) circle.setAttribute('stroke-dasharray', `${pct}, 100`);
    if (text) {
      if (pct >= 95) text.textContent = `⭐ Complete (100%)!`;
      else if (pct >= 75) text.textContent = `🔥 Super close (${pct}%)!`;
      else if (pct >= 50) text.textContent = `🌟 Halfway (${pct}%)!`;
      else if (pct > 0) text.textContent = `⚡ ${pct}% Traced`;
      else text.textContent = `Drag handle along outline`;
    }

    // Audio milestone chimes
    const currentMilestone = Math.floor(this.progress * 4);
    if (currentMilestone > this.lastMilestone && currentMilestone > 0) {
      this.lastMilestone = currentMilestone;
      sound.playSparkle();
      this.emitHandleSparkles(8);
    }
  }

  bindPullEvents(stageBoard) {
    const getSvgPoint = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
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

    const onPointerDown = (e) => {
      if (this.isCompleted || this.isGuideAnimating) return;
      if (e.button !== undefined && e.button !== 0) return; // Primary button only

      const pt = getSvgPoint(e);
      const currentPt = this.basePathEl.getPointAtLength(this.progress * this.totalLength);
      const dist = Math.hypot(pt.x - currentPt.x, pt.y - currentPt.y);

      // Must grab directly on the handle (within 32px)
      if (dist <= 32) {
        e.preventDefault();
        this.isDragging = true;
        this.handleEl.classList.add('is-dragging');
        this.handleEl.classList.remove('is-off-track');
        try { stageBoard.setPointerCapture?.(e.pointerId); } catch (_) {}
        sound.playTap();
      }
    };

    const onPointerMove = (e) => {
      // Must be actively dragging
      if (!this.isDragging || this.isCompleted || this.isGuideAnimating) return;

      // Verify mouse button is actively pressed
      if (e.buttons === 0 && e.pointerType !== 'touch') {
        onPointerUp(e);
        return;
      }

      e.preventDefault();
      const pt = getSvgPoint(e);

      // Strict forward tracing window
      const currentIdx = Math.round(this.progress * (this.samples.length - 1));
      const lookahead = Math.floor(this.samples.length * 0.05);
      const lookbehind = Math.floor(this.samples.length * 0.02);
      const startIdx = Math.max(0, currentIdx - lookbehind);
      const endIdx = Math.min(this.samples.length - 1, currentIdx + Math.max(8, lookahead));

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

      const MAX_CORRIDOR_DIST = 30; // Strict corridor

      if (bestSample && bestDist <= MAX_CORRIDOR_DIST) {
        this.handleEl.classList.remove('is-off-track');

        if (bestSample.ratio >= this.progress) {
          this.updateLoaderVisuals(bestSample.ratio);
          if (Math.random() < 0.2) this.emitHandleSparkles(2);
        } else if (this.progress - bestSample.ratio < 0.02) {
          this.updateLoaderVisuals(bestSample.ratio);
        }

        if (this.progress >= 0.97 && !this.isCompleted) {
          this.updateLoaderVisuals(1.0);
          this.triggerVictory();
        }
      } else {
        this.handleEl.classList.add('is-off-track');
      }
    };

    const onPointerUp = (e) => {
      this.isDragging = false;
      this.handleEl?.classList.remove('is-dragging');
      this.handleEl?.classList.remove('is-off-track');
      try {
        if (e && e.pointerId && stageBoard.hasPointerCapture?.(e.pointerId)) {
          stageBoard.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}
    };

    stageBoard.addEventListener('pointerdown', onPointerDown);
    stageBoard.addEventListener('pointermove', onPointerMove);
    stageBoard.addEventListener('pointerup', onPointerUp);
    stageBoard.addEventListener('pointercancel', onPointerUp);

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('blur', onPointerUp);
  }

  emitHandleSparkles(count = 6) {
    const layer = document.getElementById('trace-sparkle-layer');
    if (!layer || !this.basePathEl) return;

    const currentPt = this.basePathEl.getPointAtLength(this.progress * this.totalLength);
    const rect = this.svgEl.getBoundingClientRect();
    const px = (currentPt.x / 400) * rect.width;
    const py = (currentPt.y / 340) * rect.height;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'trace-sparkle-particle';
      const angle = Math.random() * Math.PI * 2;
      const dist = 14 + Math.random() * 32;
      spark.style.cssText = `
        position: absolute;
        left: ${px}px;
        top: ${py}px;
        width: 8px;
        height: 8px;
        background: ${this.brushColor};
        border-radius: 50%;
        box-shadow: 0 0 10px ${this.brushColor}, 0 0 4px #FFF;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: all 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
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

    const duration = 2200; // ms
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
        }, 400);
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

    // Pulse victory on board and handle
    if (this.handleEl) {
      this.handleEl.classList.add('victory-pop');
    }
    if (this.shapeFillEl) {
      this.shapeFillEl.setAttribute('fill-opacity', '0.45');
      this.shapeFillEl.classList.add('victory-fill-glow');
    }

    setTimeout(() => {
      this.app.handleCorrectAnswer();
    }, 700);
  }

  createConfettiSparkles() {
    const layer = document.getElementById('trace-sparkle-layer');
    if (!layer) return;

    layer.innerHTML = '';
    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#06B6D4', '#FBBF24'];
    const count = 42;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'trace-sparkle-particle';
      const angle = (i / count) * 360;
      const dist = 70 + Math.random() * 120;
      const color = colors[i % colors.length];

      spark.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: ${8 + Math.random() * 10}px;
        height: ${8 + Math.random() * 10}px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 12px ${color};
        transform: translate(-50%, -50%) rotate(${angle}deg) translate(${dist}px);
        opacity: 1;
        transition: all 0.65s cubic-bezier(0.2, 0.8, 0.2, 1);
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
      const newProg = Math.min(0.9, this.progress + 0.40);
      this.updateLoaderVisuals(newProg);
      sound.playSparkle();
    } else {
      btnHint.textContent = '💡 Hint Used (Reset)';
      alert(`💡 TRACING GUIDE:\n\n${this.currentStage.hint || 'Grab the glowing handle and pull it along the shape outline like a loader bar until it reaches 100%!'}`);
    }
  }
}


