/**
 * Kiddy Learn - Sudoku & Matrix Grid Engine
 */

import { sound } from '../audio.js';
import { getSvgIcon } from '../icons.js';

export class SudokuMatrixEngine {
  constructor(appController) {
    this.app = appController;
    this.currentStage = null;
    this.currentGrid = [];
    this.selectedCell = null; // { r, c }
    this.hintStep = 0;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.hintStep = 0;
    this.selectedCell = null;
    
    const size = stage.gridSize;
    this.currentGrid = Array.from({ length: size }, (_, r) =>
      Array.from({ length: size }, (_, c) => stage.initialGrid[r][c])
    );

    containerEl.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'sudoku-engine-wrapper';

    // Toolbar Header
    const topBar = document.createElement('div');
    topBar.className = 'sudoku-topbar';
    topBar.innerHTML = `
      <button class="btn-sudoku-action btn-sudoku-reset" id="btn-sudoku-reset">${getSvgIcon('replay', 'icon-xs')} <span>Reset</span></button>
      <button class="btn-engine-hint" id="btn-trigger-hint">${getSvgIcon('hint', 'icon-xs')} <span>Hint (1/3)</span></button>
    `;

    topBar.querySelector('#btn-sudoku-reset').addEventListener('click', () => {
      sound.playTap();
      this.currentGrid = Array.from({ length: size }, (_, r) =>
        Array.from({ length: size }, (_, c) => stage.initialGrid[r][c])
      );
      this.selectedCell = null;
      this.renderGrid(wrapper);
      this.validateGrid(wrapper);
    });

    topBar.querySelector('#btn-trigger-hint').addEventListener('click', () => {
      this.executeHint(wrapper);
    });

    wrapper.appendChild(topBar);

    // Matrix Grid Container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'sudoku-grid-container';
    gridContainer.id = 'sudoku-grid-container';
    wrapper.appendChild(gridContainer);

    // Symbol Palette Tray
    const paletteContainer = document.createElement('div');
    paletteContainer.className = 'sudoku-palette-container';
    paletteContainer.id = 'sudoku-palette-container';
    wrapper.appendChild(paletteContainer);

    containerEl.appendChild(wrapper);

    this.renderGrid(wrapper);
    this.renderPalette(wrapper);
    this.validateGrid(wrapper);
  }

  renderGrid(wrapperEl) {
    const gridEl = wrapperEl.querySelector('#sudoku-grid-container');
    gridEl.innerHTML = '';

    const size = this.currentStage.gridSize;
    gridEl.className = `sudoku-grid-container grid-size-${size}`;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = this.currentGrid[r][c];
        const isInitial = this.currentStage.initialGrid[r][c] !== null;

        const cellEl = document.createElement('div');
        cellEl.className = 'sudoku-cell-node';
        cellEl.setAttribute('data-row', r);
        cellEl.setAttribute('data-col', c);

        if (isInitial) {
          cellEl.classList.add('cell-initial');
        } else {
          cellEl.classList.add('cell-editable');
        }

        if (this.selectedCell && this.selectedCell.r === r && this.selectedCell.c === c) {
          cellEl.classList.add('cell-selected');
        }

        cellEl.innerHTML = `
          <span class="cell-symbol">${val ? getSvgIcon(val, 'icon-sm') : ''}</span>
          ${isInitial ? `<span class="cell-lock-icon">${getSvgIcon('lock', 'icon-xs')}</span>` : ''}
        `;

        if (!isInitial) {
          cellEl.addEventListener('click', () => {
            sound.playTap();
            this.selectedCell = { r, c };
            this.updateSelectionStyles(wrapperEl);
          });
        }

        gridEl.appendChild(cellEl);
      }
    }
  }

  updateSelectionStyles(wrapperEl) {
    const cells = wrapperEl.querySelectorAll('.sudoku-cell-node');
    cells.forEach(cell => {
      const r = parseInt(cell.getAttribute('data-row'), 10);
      const c = parseInt(cell.getAttribute('data-col'), 10);
      if (this.selectedCell && this.selectedCell.r === r && this.selectedCell.c === c) {
        cell.classList.add('cell-selected');
      } else {
        cell.classList.remove('cell-selected');
      }
    });
  }

  renderPalette(wrapperEl) {
    const paletteEl = wrapperEl.querySelector('#sudoku-palette-container');
    paletteEl.innerHTML = '';

    this.currentStage.symbols.forEach(symbol => {
      const btn = document.createElement('button');
      btn.className = 'sudoku-palette-item';
      btn.innerHTML = `<span class="palette-icon">${getSvgIcon(symbol, 'icon-sm')}</span>`;

      btn.addEventListener('click', () => {
        if (!this.selectedCell) {
          const emptyCell = this.findFirstEmptyCell();
          if (emptyCell) {
            this.selectedCell = emptyCell;
          } else {
            return;
          }
        }

        sound.playTap();
        const { r, c } = this.selectedCell;
        this.currentGrid[r][c] = symbol;

        const cellEl = wrapperEl.querySelector(`.sudoku-cell-node[data-row="${r}"][data-col="${c}"]`);
        if (cellEl) {
          cellEl.querySelector('.cell-symbol').innerHTML = getSvgIcon(symbol, 'icon-sm');
          cellEl.classList.add('cell-pop');
          setTimeout(() => cellEl.classList.remove('cell-pop'), 300);
        }

        const conflicts = this.validateGrid(wrapperEl);
        this.checkGridCompletion(wrapperEl, conflicts);
      });

      paletteEl.appendChild(btn);
    });

    // Erase Button
    const eraseBtn = document.createElement('button');
    eraseBtn.className = 'sudoku-palette-item palette-erase';
    eraseBtn.innerHTML = `<span class="palette-icon">${getSvgIcon('trash', 'icon-xs')}</span><span class="palette-label">Erase</span>`;

    eraseBtn.addEventListener('click', () => {
      if (this.selectedCell) {
        sound.playTap();
        const { r, c } = this.selectedCell;
        this.currentGrid[r][c] = null;
        const cellEl = wrapperEl.querySelector(`.sudoku-cell-node[data-row="${r}"][data-col="${c}"]`);
        if (cellEl) {
          cellEl.querySelector('.cell-symbol').innerHTML = '';
        }
        this.validateGrid(wrapperEl);
      }
    });

    paletteEl.appendChild(eraseBtn);
  }

  findFirstEmptyCell() {
    const size = this.currentStage.gridSize;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (this.currentStage.initialGrid[r][c] === null && !this.currentGrid[r][c]) {
          return { r, c };
        }
      }
    }
    return null;
  }

  validateGrid(wrapperEl) {
    const size = this.currentStage.gridSize;
    const conflicts = new Set();

    // 1. Row Constraint Check
    for (let r = 0; r < size; r++) {
      const seen = new Map();
      for (let c = 0; c < size; c++) {
        const val = this.currentGrid[r][c];
        if (val) {
          if (seen.has(val)) {
            conflicts.add(`${r},${c}`);
            conflicts.add(`${r},${seen.get(val)}`);
          } else {
            seen.set(val, c);
          }
        }
      }
    }

    // 2. Column Constraint Check
    for (let c = 0; c < size; c++) {
      const seen = new Map();
      for (let r = 0; r < size; r++) {
        const val = this.currentGrid[r][c];
        if (val) {
          if (seen.has(val)) {
            conflicts.add(`${r},${c}`);
            conflicts.add(`${seen.get(val)},${c}`);
          } else {
            seen.set(val, r);
          }
        }
      }
    }

    // 3. Subgrid 2x2 Constraint Check (for 4x4)
    if (size === 4) {
      for (let boxR = 0; boxR < 2; boxR++) {
        for (let boxC = 0; boxC < 2; boxC++) {
          const seen = new Map();
          for (let dr = 0; dr < 2; dr++) {
            for (let dc = 0; dc < 2; dc++) {
              const r = boxR * 2 + dr;
              const c = boxC * 2 + dc;
              const val = this.currentGrid[r][c];
              if (val) {
                if (seen.has(val)) {
                  conflicts.add(`${r},${c}`);
                  const prev = seen.get(val);
                  conflicts.add(`${prev.r},${prev.c}`);
                } else {
                  seen.set(val, { r, c });
                }
              }
            }
          }
        }
      }
    }

    const cellNodes = wrapperEl.querySelectorAll('.sudoku-cell-node');
    cellNodes.forEach(cell => {
      const r = parseInt(cell.getAttribute('data-row'), 10);
      const c = parseInt(cell.getAttribute('data-col'), 10);
      if (conflicts.has(`${r},${c}`)) {
        cell.classList.add('cell-conflict');
      } else {
        cell.classList.remove('cell-conflict');
      }
    });

    return conflicts;
  }

  checkGridCompletion(wrapperEl, conflicts) {
    const size = this.currentStage.gridSize;
    let isFull = true;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!this.currentGrid[r][c]) {
          isFull = false;
          break;
        }
      }
    }

    if (isFull) {
      if (conflicts.size === 0) {
        sound.playSuccess();
        setTimeout(() => {
          this.app.handleCorrectAnswer();
        }, 500);
      } else {
        sound.playError();
        this.app.handleWrongAnswer("Duplicate symbols in row, col, or box! Clear highlighted conflicts.");
      }
    }
  }

  executeHint(wrapperEl) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapperEl.querySelector('#btn-trigger-hint');
    const size = this.currentStage.gridSize;

    let target = null;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (this.currentStage.initialGrid[r][c] === null && (!this.currentGrid[r][c] || this.currentGrid[r][c] !== this.currentStage.solution[r][c])) {
          target = { r, c };
          break;
        }
      }
      if (target) break;
    }

    if (!target) return;

    const { r, c } = target;
    const targetCellEl = wrapperEl.querySelector(`.sudoku-cell-node[data-row="${r}"][data-col="${c}"]`);

    if (this.hintStep === 1) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint (2/3)</span>`;
      this.selectedCell = { r, c };
      this.updateSelectionStyles(wrapperEl);
      if (targetCellEl) {
        targetCellEl.classList.add('hint-clue-pulse');
        setTimeout(() => targetCellEl.classList.remove('hint-clue-pulse'), 2500);
      }
    } else if (this.hintStep === 2) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint (3/3)</span>`;
      const allCells = wrapperEl.querySelectorAll('.sudoku-cell-node');
      allCells.forEach(cell => {
        const cr = parseInt(cell.getAttribute('data-row'), 10);
        const cc = parseInt(cell.getAttribute('data-col'), 10);
        if (cr === r || cc === c) {
          cell.classList.add('hint-row-col-glow');
          setTimeout(() => cell.classList.remove('hint-row-col-glow'), 2500);
        }
      });
    } else if (this.hintStep === 3) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint Used</span>`;
      const correctVal = this.currentStage.solution[r][c];
      this.currentGrid[r][c] = correctVal;
      if (targetCellEl) {
        targetCellEl.querySelector('.cell-symbol').innerHTML = getSvgIcon(correctVal, 'icon-sm');
        targetCellEl.classList.add('cell-pop');
      }
      const conflicts = this.validateGrid(wrapperEl);
      this.checkGridCompletion(wrapperEl, conflicts);
    }
  }
}
