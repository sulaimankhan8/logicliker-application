/**
 * LogicLike Outline Tracing Engine
 * Kids trace over geometric shapes, letters, numbers, and animals.
 * Features:
 * - High-DPI Canvas drawing with glowing neon brush
 * - Waypoint Checkpoint tracker for accurate completion calculation (0% -> 100%)
 * - Animated guide dot/indicator to show children where to trace
 * - Sparkle particle system upon reaching checkpoints and completing shape
 * - Clear & Retry controls and 3-step hint system
 */

import { sound } from '../audio.js';

// Predefined shape paths in a 400x320 bounding box
const SHAPE_DEFINITIONS = {
  'star': {
    name: 'Five-Point Star',
    icon: '⭐',
    d: 'M 200,30 L 245,130 L 355,135 L 270,205 L 300,310 L 200,245 L 100,310 L 130,205 L 45,135 L 155,130 Z',
    color: '#F59E0B'
  },
  'heart': {
    name: 'Love Heart',
    icon: '❤️',
    d: 'M 200,100 C 200,70 170,40 130,40 C 80,40 50,85 50,130 C 50,210 140,265 200,300 C 260,265 350,210 350,130 C 350,85 320,40 270,40 C 230,40 200,70 200,100 Z',
    color: '#EC4899'
  },
  'triangle': {
    name: 'Equilateral Triangle',
    icon: '🔺',
    d: 'M 200,40 L 350,290 L 50,290 Z',
    color: '#3B82F6'
  },
  'diamond': {
    name: 'Sparkling Diamond',
    icon: '💎',
    d: 'M 200,35 L 340,165 L 200,295 L 60,165 Z',
    color: '#06B6D4'
  },
  'number-8': {
    name: 'Number 8',
    icon: '8️⃣',
    d: 'M 200,165 C 240,165 270,135 270,95 C 270,55 240,35 200,35 C 160,35 130,55 130,95 C 130,135 160,165 200,165 Z M 200,165 C 245,165 285,195 285,245 C 285,295 245,315 200,315 C 155,315 115,295 115,245 C 115,195 155,165 200,165 Z',
    color: '#8B5CF6'
  },
  'letter-a': {
    name: 'Letter A',
    icon: '🔤',
    d: 'M 90,295 L 200,45 L 310,295 M 135,210 L 265,210',
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
    this.canvas = null;
    this.ctx = null;
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.checkpoints = [];
    this.coveredCount = 0;
    this.totalPoints = 0;
    this.isCompleted = false;
    this.brushColor = '#22C55E';
    this.brushRadius = 22;
    this.hintStep = 0;
    this.animatingGuide = false;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.isCompleted = false;
    this.hintStep = 0;
    this.animatingGuide = false;

    containerEl.innerHTML = '';

    const shapeKey = stage.shape || 'star';
    const shapeDef = SHAPE_DEFINITIONS[shapeKey] || SHAPE_DEFINITIONS['star'];
    const pathD = stage.customPath || shapeDef.d;
    this.brushColor = stage.brushColor || shapeDef.color || '#22C55E';

    const wrapper = document.createElement('div');
    wrapper.className = 'outline-trace-wrapper';

    // Top status banner (Progress percentage + Target info)
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
        <span class="trace-progress-text" id="trace-pct-text">0% Traced</span>
      </div>
    `;
    wrapper.appendChild(headerBar);

    // Tracing Canvas & SVG Board
    const stageBoard = document.createElement('div');
    stageBoard.className = 'trace-stage-board';
    stageBoard.id = 'trace-stage-board';

    // Background Outline SVG
    stageBoard.innerHTML = `
      <svg class="trace-guide-svg" viewBox="0 0 400 340" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow-outline" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="${this.brushColor}" flood-opacity="0.6"/>
          </filter>
        </defs>
        <!-- Shadow guide track -->
        <path class="guide-track-bg" d="${pathD}" />
        <!-- Animated dashed guide path -->
        <path class="guide-track-dash" id="guide-track-dash" d="${pathD}" stroke="${this.brushColor}" />
        <!-- Guiding animated tracer point -->
        <circle id="guide-tracer-dot" class="guide-tracer-dot" r="9" fill="#FFF" stroke="${this.brushColor}" stroke-width="4"></circle>
      </svg>
      <canvas class="trace-draw-canvas" id="trace-draw-canvas"></canvas>
      <div class="trace-sparkle-layer" id="trace-sparkle-layer"></div>
    `;

    wrapper.appendChild(stageBoard);

    // Toolbar (Clear, Hint, Change Color)
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar trace-toolbar';
    toolbar.innerHTML = `
      <button class="btn-secondary" id="btn-trace-clear">🔄 Clear</button>
      <button class="btn-engine-hint" id="btn-trace-guide">✨ Show Guide Animation</button>
      <button class="btn-engine-hint" id="btn-trace-hint">💡 Hint</button>
    `;

    toolbar.querySelector('#btn-trace-clear').addEventListener('click', () => {
      sound.playTap();
      this.clearCanvas();
    });

    toolbar.querySelector('#btn-trace-guide').addEventListener('click', () => {
      sound.playTap();
      this.runGuideAnimation();
    });

    toolbar.querySelector('#btn-trace-hint').addEventListener('click', () => {
      this.executeHint(wrapper);
    });

    wrapper.appendChild(toolbar);
    containerEl.appendChild(wrapper);

    // Initialize Canvas & Checkpoints
    setTimeout(() => {
      this.initCanvas(stageBoard, pathD);
      this.runGuideAnimation();
    }, 50);
  }

  initCanvas(stageBoard, pathD) {
    this.canvas = stageBoard.querySelector('#trace-draw-canvas');
    if (!this.canvas) return;

    const rect = stageBoard.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(dpr, dpr);
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    // Generate Checkpoints along SVG Path
    this.generateCheckpoints(stageBoard, pathD, rect.width, rect.height);

    // Bind touch / mouse events
    this.bindDrawingEvents(this.canvas);
  }

  generateCheckpoints(stageBoard, pathD, width, height) {
    this.checkpoints = [];
    this.coveredCount = 0;

    // Create a temporary SVG path to sample points along length
    const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('d', pathD);
    tempSvg.appendChild(pathEl);
    document.body.appendChild(tempSvg);

    const totalLen = pathEl.getTotalLength() || 1000;
    const sampleCount = Math.max(30, Math.min(60, Math.floor(totalLen / 18)));
    
    // Scale factor from 400x340 viewBox to actual canvas size
    const scaleX = width / 400;
    const scaleY = height / 340;

    for (let i = 0; i <= sampleCount; i++) {
      const pt = pathEl.getPointAtLength((i / sampleCount) * totalLen);
      this.checkpoints.push({
        x: pt.x * scaleX,
        y: pt.y * scaleY,
        covered: false
      });
    }

    document.body.removeChild(tempSvg);
    this.totalPoints = this.checkpoints.length;
    this.updateProgress(0);
  }

  bindDrawingEvents(canvas) {
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const startDraw = (e) => {
      if (this.isCompleted) return;
      e.preventDefault();
      this.isDrawing = true;
      const pos = getPos(e);
      this.lastX = pos.x;
      this.lastY = pos.y;
      this.checkDistanceToCheckpoints(pos.x, pos.y);
      this.drawPoint(pos.x, pos.y);
    };

    const draw = (e) => {
      if (!this.isDrawing || this.isCompleted) return;
      e.preventDefault();
      const pos = getPos(e);

      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.strokeStyle = this.brushColor;
      this.ctx.lineWidth = this.brushRadius;
      this.ctx.shadowColor = this.brushColor;
      this.ctx.shadowBlur = 12;
      this.ctx.stroke();

      this.checkDistanceToCheckpoints(pos.x, pos.y);
      this.lastX = pos.x;
      this.lastY = pos.y;
    };

    const endDraw = () => {
      this.isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', endDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', endDraw);
  }

  drawPoint(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.brushRadius / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.brushColor;
    this.ctx.shadowColor = this.brushColor;
    this.ctx.shadowBlur = 12;
    this.ctx.fill();
  }

  checkDistanceToCheckpoints(x, y) {
    const hitRadius = this.brushRadius * 1.5;
    let newlyCovered = 0;

    for (let i = 0; i < this.checkpoints.length; i++) {
      const cp = this.checkpoints[i];
      if (!cp.covered) {
        const dx = cp.x - x;
        const dy = cp.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= hitRadius) {
          cp.covered = true;
          this.coveredCount++;
          newlyCovered++;
        }
      }
    }

    if (newlyCovered > 0) {
      const pct = Math.round((this.coveredCount / this.totalPoints) * 100);
      this.updateProgress(pct);

      if (pct % 25 === 0 || pct === 100) {
        sound.playSparkle();
      }

      if (pct >= 85 && !this.isCompleted) {
        this.triggerVictory();
      }
    }
  }

  updateProgress(pct) {
    const circle = document.getElementById('trace-circle-fill');
    const text = document.getElementById('trace-pct-text');
    if (circle) circle.setAttribute('stroke-dasharray', `${pct}, 100`);
    if (text) {
      if (pct >= 85) text.textContent = `⭐ Mastered (${pct}%)!`;
      else if (pct >= 50) text.textContent = `🌟 Halfway (${pct}%)!`;
      else text.textContent = `${pct}% Traced`;
    }
  }

  clearCanvas() {
    if (!this.ctx || !this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);
    this.checkpoints.forEach(cp => (cp.covered = false));
    this.coveredCount = 0;
    this.isCompleted = false;
    this.updateProgress(0);
  }

  runGuideAnimation() {
    const guideDot = document.getElementById('guide-tracer-dot');
    const guidePath = document.getElementById('guide-track-dash');
    if (!guideDot || !guidePath) return;

    guideDot.style.display = 'block';
    const totalLen = guidePath.getTotalLength() || 1000;
    let startTime = null;
    const duration = 2800; // ms

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        const pt = guidePath.getPointAtLength(progress * totalLen);
        guideDot.setAttribute('cx', pt.x);
        guideDot.setAttribute('cy', pt.y);
        requestAnimationFrame(animate);
      } else {
        const pt = guidePath.getPointAtLength(0);
        guideDot.setAttribute('cx', pt.x);
        guideDot.setAttribute('cy', pt.y);
      }
    };

    requestAnimationFrame(animate);
  }

  triggerVictory() {
    this.isCompleted = true;
    sound.playSuccess();
    sound.playStar();

    // Sparkle explosion
    this.createConfettiSparkles();

    setTimeout(() => {
      this.app.handleCorrectAnswer();
    }, 700);
  }

  createConfettiSparkles() {
    const layer = document.getElementById('trace-sparkle-layer');
    if (!layer) return;

    layer.innerHTML = '';
    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#FBBF24'];
    const count = 36;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'trace-sparkle-particle';
      const angle = (i / count) * 360;
      const dist = 60 + Math.random() * 100;
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
      btnHint.textContent = '💡 Hint: Step 2/3 (Auto-guide)';
      this.runGuideAnimation();
    } else if (this.hintStep === 2) {
      btnHint.textContent = '💡 Hint: Step 3/3 (Assist Stroke)';
      this.runGuideAnimation();
      // Auto fill 35% of checkpoints as assistance
      const unfilled = this.checkpoints.filter(cp => !cp.covered);
      const toFill = unfilled.slice(0, Math.floor(this.checkpoints.length * 0.35));
      toFill.forEach(cp => {
        cp.covered = true;
        this.coveredCount++;
        this.drawPoint(cp.x, cp.y);
      });
      this.updateProgress(Math.round((this.coveredCount / this.totalPoints) * 100));
    } else {
      btnHint.textContent = '💡 Hint Used (Reset)';
      alert(`💡 TRACING GUIDE:\n\n${this.currentStage.hint || 'Follow the dashed line with your finger or mouse cursor until the shape is completely filled with glowing color!'}`);
    }
  }
}
