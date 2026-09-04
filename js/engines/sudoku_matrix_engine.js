/**
 * LogicLike Stage 5: Sudoku & Matrix Grid Engine
 * Full-fledged engine for 3x3 and 4x4 matrix logic & Sudoku puzzles.
 * Supports:
 * - 3x3 & 4x4 matrix grids with 2x2 subgrid constraint checks
 * - Locked initial cells vs interactive target cells
 * - Real-time duplicate constraint conflict highlighting (Red glow + shake)
 * - Touch-optimized Symbol / Number palette tray & Erase mode
 * - 3-Step Guided Hint System:
 *   Step 1: Highlight target cell with highest logical constraint
 *   Step 2: Highlight conflicting row/col/box and filter available choices
 *   Step 3: Auto-fill target cell with step-by-step logical deduction text
 */

import { sound } from '../audio.js';

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
    
    // Deep clone initial grid state
    const size = stage.gridSize;
    this.currentGrid = Array.from({ length: size }, (_, r) =>
      Array.from({ length: size }, (_, c) => stage.initialGrid[r][c])
    );

    containerEl.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'sudoku-engine-wrapper';

    // Toolbar Header (Reset + Hint)
    const topBar = document.createElement('div');
    topBar.className = 'sudoku-topbar';
    topBar.innerHTML = `
      <button class="btn-sudoku-action btn-sudoku-reset" id="btn-sudoku-reset">🔄 Reset Grid</button>
      <button class="btn-engine-hint" id="btn-trigger-hint">💡 Use Hint (Step 1/3)</button>
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

    // Render Grid & Palette
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
          <span class="cell-symbol">${val || ''}</span>
          ${isInitial ? '<span class="cell-lock-icon">🔒</span>' : ''}
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

    // Symbol buttons
    this.currentStage.symbols.forEach(symbol => {
      const btn = document.createElement('button');
      btn.className = 'sudoku-palette-item';
      btn.innerHTML = `<span class="palette-icon">${symbol}</span>`;

      btn.addEventListener('click', () => {
        if (!this.selectedCell) {
          // If no cell selected, select the first empty editable cell automatically
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

        // Update cell text
        const cellEl = wrapperEl.querySelector(`.sudoku-cell-node[data-row="${r}"][data-col="${c}"]`);
        if (cellEl) {
          cellEl.querySelector('.cell-symbol').textContent = symbol;
          cellEl.classList.add('cell-pop');
          setTimeout(() => cellEl.classList.remove('cell-pop'), 300);
        }

        // Validate duplicates & check completion
        const conflicts = this.validateGrid(wrapperEl);
        this.checkGridCompletion(wrapperEl, conflicts);
      });

      paletteEl.appendChild(btn);
    });

    // Erase Button
    const eraseBtn = document.createElement('button');
    eraseBtn.className = 'sudoku-palette-item palette-erase';
    eraseBtn.innerHTML = `<span class="palette-icon">🗑️</span><span class="palette-label">Erase</span>`;

    eraseBtn.addEventListener('click', () => {
      if (this.selectedCell) {
        sound.playTap();
        const { r, c } = this.selectedCell;
        this.currentGrid[r][c] = null;
        const cellEl = wrapperEl.querySelector(`.sudoku-cell-node[data-row="${r}"][data-col="${c}"]`);
        if (cellEl) {
          cellEl.querySelector('.cell-symbol').textContent = '';
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

  /**
   * Constraint Validator: Checks duplicates in rows, columns, and 2x2 subgrids (for 4x4)
   * Returns set of conflicting cell keys ("r,c")
   */
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

    // Apply visual conflict styles
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
        this.app.handleWrongAnswer("Some symbols are duplicated in the same row, column, or 2x2 box! Clear red highlighted conflicts and try again.");
      }
    }
  }

  /**
   * 3-Step Guided Hint System
   */
  executeHint(wrapperEl) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapperEl.querySelector('#btn-trigger-hint');
    const size = this.currentStage.gridSize;

    // Find target cell to hint (first empty cell or one with missing solution)
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

    if (!target) {
      alert("💡 Grid is already solved or fully filled!");
      return;
    }

    const { r, c } = target;
    const targetCellEl = wrapperEl.querySelector(`.sudoku-cell-node[data-row="${r}"][data-col="${c}"]`);

    if (this.hintStep === 1) {
      // Step 1: Highlight target cell
      btnHint.textContent = '💡 Hint: Step 2/3 (Show Constraints)';
      this.selectedCell = { r, c };
      this.updateSelectionStyles(wrapperEl);
      if (targetCellEl) {
        targetCellEl.classList.add('hint-clue-pulse');
        setTimeout(() => targetCellEl.classList.remove('hint-clue-pulse'), 2500);
      }
    } else if (this.hintStep === 2) {
      // Step 2: Highlight conflicting row & column
      btnHint.textContent = '💡 Hint: Step 3/3 (Auto-Fill & Explain)';
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
      // Step 3: Auto fill target cell & show step-by-step reasoning
      btnHint.textContent = '💡 Hint Used (Reset)';
      const correctVal = this.currentStage.solution[r][c];
      this.currentGrid[r][c] = correctVal;
      if (targetCellEl) {
        targetCellEl.querySelector('.cell-symbol').textContent = correctVal;
        targetCellEl.classList.add('cell-pop');
      }
      const conflicts = this.validateGrid(wrapperEl);
      this.checkGridCompletion(wrapperEl, conflicts);
      alert(`💡 GUIDED LOGIC DEDUCTION:\n\nIn Row ${r + 1}, Column ${c + 1}, the only valid symbol that doesn't duplicate is "${correctVal}"!\n\n${this.currentStage.hint}`);
    }
  }
}
