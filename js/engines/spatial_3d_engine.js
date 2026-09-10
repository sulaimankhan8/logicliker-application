/**
 * LogicLike Stage 4: 3D Isometric Cube Counter Engine
 * Professional, mathematically correct 3D Axonometric/Isometric projection engine.
 * Features:
 * - True 3D polyhedral cube rendering with dynamic yaw/pitch rotation
 * - 3D Backface culling and directional sun lighting
 * - Depth-sorted Painter's algorithm (zero shape breaking at ANY angle: 0°, 45°, 90°, 180°, 270°, 360°)
 * - Interactive mouse/touch drag-to-rotate in full 3D with momentum
 * - Click-to-count raycasting/hit-testing with vibrant golden highlights & badges
 * - Smooth camera step rotation buttons (◀ Rotate Left, Rotate Right ▶, 🔄 Reset View)
 * - Auto-centering and responsive scaling for all grid dimensions (1x1 to 5x5)
 * - Plausible option answer selector & direct numeric submission
 * - 3-step spatial reasoning hint engine
 */

import { sound } from '../audio.js';

export class Spatial3DEngine {
  constructor(appController) {
    this.app = appController;
    this.currentStage = null;
    this.cameraYaw = Math.PI / 4; // 45° default isometric angle
    this.cameraPitch = Math.PI / 6; // 30° default tilt
    this.countedCubes = new Set();
    this.hintStep = 0;
    this.animId = null;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragStartYaw = 0;
    this.dragStartPitch = 0;
    this.hasDragged = false;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.cameraYaw = Math.PI / 4;
    this.cameraPitch = Math.PI / 6;
    this.countedCubes.clear();
    this.hintStep = 0;

    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }

    containerEl.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'spatial-3d-engine-wrapper';

    wrapper.innerHTML = `
      <div class="canvas-3d-wrapper">
        <div class="canvas-3d-header-bar">
          <span class="canvas-drag-hint">🖱️ Drag to rotate 3D view</span>
          <button class="btn-rot-cam btn-reset-cam" id="btn-rot-reset" title="Reset Camera View">🔄 Reset</button>
        </div>
        <canvas id="iso-canvas" width="520" height="340" class="isometric-canvas"></canvas>
        <div class="canvas-3d-controls">
          <button class="btn-rot-cam" id="btn-rot-left">◀ Rotate 45°</button>
          <div class="cube-count-badge" id="count-tally-badge" title="Click to clear counted cubes">
            Counted: 0 / ${stage.totalCubes}
          </div>
          <button class="btn-rot-cam" id="btn-rot-right">Rotate 45° ▶</button>
        </div>
      </div>

      <p class="spatial-prompt-subtitle">Click cubes on canvas to count them, or pick the total below:</p>

      <div class="answer-selector-row" id="answer-selector-row"></div>

      <div class="engine-toolbar">
        <button class="btn-engine-hint" id="btn-trigger-hint">💡 Use Hint (Step 1/3)</button>
      </div>
    `;

    const canvas = wrapper.querySelector('#iso-canvas');
    const ctx = canvas.getContext('2d');
    const tallyBadge = wrapper.querySelector('#count-tally-badge');

    // Calculate grid dimensions & dynamic scaling
    const heightMap = stage.heightMap;
    const rows = heightMap.length;
    const cols = heightMap[0].length;
    let maxHeight = 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (heightMap[r][c] > maxHeight) maxHeight = heightMap[r][c];
      }
    }

    const gridCenter = {
      x: (cols - 1) / 2,
      y: (rows - 1) / 2,
      z: maxHeight / 2
    };

    // Calculate optimal cube size to fit canvas
    const maxDim = Math.max(cols, rows, maxHeight, 2.5);
    const cubeSize = Math.min(46, Math.max(24, Math.floor(220 / (maxDim * 0.95))));

    // 8 local unit cube corners relative to cube center [dx, dy, dz]
    const localCorners = [
      [-0.5, -0.5, 0], // 0: bottom back-left
      [ 0.5, -0.5, 0], // 1: bottom back-right
      [ 0.5,  0.5, 0], // 2: bottom front-right
      [-0.5,  0.5, 0], // 3: bottom front-left
      [-0.5, -0.5, 1], // 4: top back-left
      [ 0.5, -0.5, 1], // 5: top back-right
      [ 0.5,  0.5, 1], // 6: top front-right
      [-0.5,  0.5, 1]  // 7: top front-left
    ];

    // 6 cube faces with outward unit normal and corner indices
    const cubeFaceDefs = [
      { name: 'top',    indices: [4, 5, 6, 7], normal: [ 0,  0,  1] },
      { name: 'bottom', indices: [0, 3, 2, 1], normal: [ 0,  0, -1] },
      { name: 'front',  indices: [3, 2, 6, 7], normal: [ 0,  1,  0] },
      { name: 'back',   indices: [1, 0, 4, 5], normal: [ 0, -1,  0] },
      { name: 'right',  indices: [2, 1, 5, 6], normal: [ 1,  0,  0] },
      { name: 'left',   indices: [0, 3, 7, 4], normal: [-1,  0,  0] }
    ];

    // Directional light vector (upper-left-front)
    const lightLen = Math.hypot(-0.4, -0.6, 0.85);
    const lightDir = [-0.4 / lightLen, -0.6 / lightLen, 0.85 / lightLen];

    // Project 3D point (X, Y, Z) to 2D Canvas space (u, v) and camera depth (w)
    const projectPoint = (X, Y, Z) => {
      const rx = (X - gridCenter.x);
      const ry = (Y - gridCenter.y);
      const rz = Z;

      // Yaw rotation around Z
      const cosY = Math.cos(this.cameraYaw);
      const sinY = Math.sin(this.cameraYaw);
      const x1 = rx * cosY - ry * sinY;
      const y1 = rx * sinY + ry * cosY;
      const z1 = rz;

      // Pitch rotation around X (viewing down at cameraPitch)
      const sinP = Math.sin(this.cameraPitch);
      const cosP = Math.cos(this.cameraPitch);

      const originX = canvas.width / 2;
      const originY = canvas.height * 0.52 + (maxHeight * cubeSize * 0.2);

      const u = originX + x1 * cubeSize;
      const v = originY + y1 * sinP * cubeSize - z1 * cosP * cubeSize;
      const depth = y1 * cosP + z1 * sinP;

      return { u, v, depth, x1, y1, z1 };
    };

    // Store rendered faces for hit-testing during click
    let renderedCubesData = [];

    const drawScene = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle isometric floor shadow / grid plate
      const floorPadding = 0.4;
      const floorCorners = [
        projectPoint(-floorPadding, -floorPadding, 0),
        projectPoint(cols - 1 + floorPadding, -floorPadding, 0),
        projectPoint(cols - 1 + floorPadding, rows - 1 + floorPadding, 0),
        projectPoint(-floorPadding, rows - 1 + floorPadding, 0)
      ];

      ctx.beginPath();
      ctx.moveTo(floorCorners[0].u, floorCorners[0].v);
      for (let i = 1; i < 4; i++) {
        ctx.lineTo(floorCorners[i].u, floorCorners[i].v);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(203, 213, 225, 0.45)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Collect all cubes in the heightmap
      const cubes = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const stackHeight = heightMap[y][x];
          for (let z = 0; z < stackHeight; z++) {
            // Cube center projected depth
            const centerProj = projectPoint(x, y, z + 0.5);
            const key = `${x},${y},${z}`;
            cubes.push({
              gx: x,
              gy: y,
              gz: z,
              key,
              isCounted: this.countedCubes.has(key),
              depth: centerProj.depth
            });
          }
        }
      }

      // Sort cubes ascending by camera depth (Painter's algorithm: farthest first, closest last)
      cubes.sort((a, b) => a.depth - b.depth);

      renderedCubesData = [];

      // Camera view normal component vectors for backface culling
      const cosY = Math.cos(this.cameraYaw);
      const sinY = Math.sin(this.cameraYaw);
      const sinP = Math.sin(this.cameraPitch);
      const cosP = Math.cos(this.cameraPitch);

      // Draw each cube in depth order
      cubes.forEach((cube) => {
        const { gx, gy, gz, isCounted, key } = cube;
        const visibleFaces = [];

        // Project 8 corners for this cube
        const projCorners = localCorners.map(([dx, dy, dz]) =>
          projectPoint(gx + dx, gy + dy, gz + dz)
        );

        // Process each face
        cubeFaceDefs.forEach((faceDef) => {
          const [nx, ny, nz] = faceDef.normal;

          // Rotate face normal by yaw
          const rnx = nx * cosY - ny * sinY;
          const rny = nx * sinY + ny * cosY;
          const rnz = nz;

          // Dot product with camera vector (0, cosP, sinP)
          const viewDot = rny * cosP + rnz * sinP;

          // Backface culling: only keep faces facing the camera
          if (viewDot > 0.0001) {
            // Calculate light intensity
            const lightDot = nx * lightDir[0] + ny * lightDir[1] + nz * lightDir[2];
            const intensity = Math.max(0.35, Math.min(1.0, 0.42 + 0.58 * Math.max(0, lightDot)));

            // 2D polygon vertices
            const poly = faceDef.indices.map(idx => projCorners[idx]);

            // Face center depth for micro-sorting
            const faceDepth = poly.reduce((sum, p) => sum + p.depth, 0) / poly.length;

            visibleFaces.push({
              name: faceDef.name,
              poly,
              intensity,
              faceDepth,
              normal: faceDef.normal
            });
          }
        });

        // Sort visible faces of this cube by depth
        visibleFaces.sort((a, b) => a.faceDepth - b.faceDepth);

        // Render each visible face
        visibleFaces.forEach((face) => {
          const { poly, intensity, name } = face;

          ctx.beginPath();
          ctx.moveTo(poly[0].u, poly[0].v);
          for (let i = 1; i < poly.length; i++) {
            ctx.lineTo(poly[i].u, poly[i].v);
          }
          ctx.closePath();

          if (isCounted) {
            // Glowing golden/amber style for counted blocks
            const lightness = Math.round(38 + intensity * 48);
            ctx.fillStyle = `hsl(48, 98%, ${lightness}%)`;
            ctx.strokeStyle = '#92400E';
            ctx.lineWidth = 2.2;
          } else {
            // Crisp, rich LogicLike layer colors
            let baseHue = 217; // Blue
            if (gz === 1) baseHue = 245; // Indigo
            else if (gz === 2) baseHue = 270; // Violet
            else if (gz >= 3) baseHue = 295; // Purple

            const lightness = Math.round(30 + intensity * 46);
            ctx.fillStyle = `hsl(${baseHue}, 88%, ${lightness}%)`;
            ctx.strokeStyle = '#1E293B';
            ctx.lineWidth = 1.8;
          }

          ctx.lineJoin = 'round';
          ctx.fill();
          ctx.stroke();

          // Subtle glossy top face highlight
          if (name === 'top') {
            ctx.save();
            ctx.clip();
            ctx.fillStyle = isCounted ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)';
            ctx.fillRect(poly[0].u - cubeSize, poly[0].v - cubeSize, cubeSize * 2, cubeSize * 2);
            ctx.restore();
          }
        });

        // Top face checkmark / count indicator
        const topFace = visibleFaces.find(f => f.name === 'top');
        if (isCounted && topFace) {
          const topCenterU = topFace.poly.reduce((sum, p) => sum + p.u, 0) / topFace.poly.length;
          const topCenterV = topFace.poly.reduce((sum, p) => sum + p.v, 0) / topFace.poly.length;

          ctx.save();
          ctx.fillStyle = '#78350F';
          ctx.font = `bold ${Math.max(12, Math.floor(cubeSize * 0.38))}px Outfit, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('✓', topCenterU, topCenterV);
          ctx.restore();
        }

        renderedCubesData.push({
          cube,
          visibleFaces
        });
      });
    };

    // Point in polygon test
    const isPointInPoly = (px, py, poly) => {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i].u, yi = poly[i].v;
        const xj = poly[j].u, yj = poly[j].v;
        const intersect = ((yi > py) !== (yj > py)) &&
          (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    // Smooth step rotation animation
    const animateToYaw = (targetYaw) => {
      const startYaw = this.cameraYaw;
      const diff = targetYaw - startYaw;
      const startTime = performance.now();
      const duration = 220;

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Ease-out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        this.cameraYaw = startYaw + diff * ease;
        drawScene();

        if (progress < 1) {
          this.animId = requestAnimationFrame(step);
        } else {
          this.cameraYaw = targetYaw;
          this.animId = null;
          drawScene();
        }
      };

      if (this.animId) cancelAnimationFrame(this.animId);
      this.animId = requestAnimationFrame(step);
    };

    // Mouse & Touch Drag-to-Rotate Interaction
    const handlePointerDown = (clientX, clientY) => {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
      this.isDragging = true;
      this.hasDragged = false;
      this.dragStartX = clientX;
      this.dragStartY = clientY;
      this.dragStartYaw = this.cameraYaw;
      this.dragStartPitch = this.cameraPitch;
      canvas.style.cursor = 'grabbing';
    };

    const handlePointerMove = (clientX, clientY) => {
      if (!this.isDragging) return;

      const dx = clientX - this.dragStartX;
      const dy = clientY - this.dragStartY;

      if (Math.hypot(dx, dy) > 5) {
        this.hasDragged = true;
      }

      this.cameraYaw = this.dragStartYaw + dx * 0.012;
      // Clamp pitch between 12° and 75°
      this.cameraPitch = Math.max(0.2, Math.min(1.3, this.dragStartPitch + dy * 0.01));
      drawScene();
    };

    const handlePointerUp = (clientX, clientY) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      canvas.style.cursor = 'grab';

      // If user simply clicked without dragging, perform cube click hit-test
      if (!this.hasDragged) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (clientX - rect.left) * scaleX;
        const clickY = (clientY - rect.top) * scaleY;

        // Iterate rendered cubes in REVERSE order (front-to-back)
        let clickedCube = null;
        for (let i = renderedCubesData.length - 1; i >= 0; i--) {
          const item = renderedCubesData[i];
          for (let f = 0; f < item.visibleFaces.length; f++) {
            if (isPointInPoly(clickX, clickY, item.visibleFaces[f].poly)) {
              clickedCube = item.cube;
              break;
            }
          }
          if (clickedCube) break;
        }

        if (clickedCube) {
          sound.playTap();
          if (this.countedCubes.has(clickedCube.key)) {
            this.countedCubes.delete(clickedCube.key);
          } else {
            this.countedCubes.add(clickedCube.key);
          }
          tallyBadge.textContent = `Counted: ${this.countedCubes.size} / ${stage.totalCubes}`;
          drawScene();
        }
      }
    };

    // Canvas Event Listeners
    canvas.addEventListener('mousedown', (e) => handlePointerDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => handlePointerMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', (e) => handlePointerUp(e.clientX, e.clientY));

    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    window.addEventListener('touchend', (e) => {
      if (this.isDragging) {
        const touch = e.changedTouches[0];
        handlePointerUp(touch.clientX, touch.clientY);
      }
    });

    // Badge click to clear count
    tallyBadge.addEventListener('click', () => {
      sound.playTap();
      this.countedCubes.clear();
      tallyBadge.textContent = `Counted: 0 / ${stage.totalCubes}`;
      drawScene();
    });

    // Camera Step Rotation Buttons
    wrapper.querySelector('#btn-rot-left').addEventListener('click', () => {
      sound.playTap();
      animateToYaw(this.cameraYaw - Math.PI / 4);
    });

    wrapper.querySelector('#btn-rot-right').addEventListener('click', () => {
      sound.playTap();
      animateToYaw(this.cameraYaw + Math.PI / 4);
    });

    wrapper.querySelector('#btn-rot-reset').addEventListener('click', () => {
      sound.playTap();
      this.cameraPitch = Math.PI / 6;
      animateToYaw(Math.PI / 4);
    });

    // Generate Plausible Answer Choice Buttons
    const answerRow = wrapper.querySelector('#answer-selector-row');
    const options = Array.from(new Set([
      stage.totalCubes - 2,
      stage.totalCubes - 1,
      stage.totalCubes,
      stage.totalCubes + 2,
      stage.totalCubes + 4
    ])).filter(n => n > 0).sort((a, b) => a - b).slice(0, 4);

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'keypad-btn spatial-opt-btn';
      btn.textContent = `${opt} 📦`;
      btn.addEventListener('click', () => {
        if (opt === stage.totalCubes) {
          sound.playSuccess();
          this.app.handleCorrectAnswer();
        } else {
          sound.playError();
          this.app.handleWrongAnswer(stage.review);
        }
      });
      answerRow.appendChild(btn);
    });

    // Hint Button Handler
    wrapper.querySelector('#btn-trigger-hint').addEventListener('click', () => {
      this.executeHint(wrapper);
    });

    containerEl.appendChild(wrapper);
    setTimeout(drawScene, 40);
  }

  executeHint(wrapperEl) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapperEl ? wrapperEl.querySelector('#btn-trigger-hint') : document.querySelector('#btn-trigger-hint');

    if (this.hintStep === 1) {
      if (btnHint) btnHint.textContent = '💡 Hint: Step 2/3 (Hidden Base Clue)';
      alert(`💡 3D BLOCK COUNTING TIP:\n\nRemember that blocks on upper levels cannot float! They need supporting blocks underneath them in the lower layers.`);
    } else if (this.hintStep === 2) {
      if (btnHint) btnHint.textContent = '💡 Hint: Step 3/3 (Show Solution)';
      alert(`💡 LAYER BREAKDOWN:\n\nTotal Cubes = ${this.currentStage ? this.currentStage.totalCubes : ''} blocks.`);
    } else if (this.hintStep === 3) {
      if (btnHint) btnHint.textContent = '💡 Hint Used (Reset)';
      alert(`💡 GUIDED SPATIAL EXPLANATION:\n\n${this.currentStage ? this.currentStage.hint : ''}`);
    }
  }
}
