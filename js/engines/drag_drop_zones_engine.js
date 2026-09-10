/**
 * LogicLike Drag & Drop Category & Habitat Placement Engine
 * Features:
 * - 2 to 3 Themed Dropzone Containers (e.g., "Ocean 🌊", "Forest 🌲", "Solids 🧊", "Liquids 💧", "Evens", "Odds")
 * - Draggable & Click-to-place item chips
 * - Click placed item chip to return it back to bank
 * - Visual placement counter (e.g. 4/4 placed)
 * - 3-step hint engine
 */

import { sound } from '../audio.js';

export class DragDropZonesEngine {
  constructor(appController) {
    this.app = appController;
    this.currentStage = null;
    this.placements = {}; // { itemId: zoneId }
    this.selectedItem = null;
    this.hintStep = 0;
  }

  render(stage, containerEl) {
    this.currentStage = stage;
    this.placements = {};
    this.selectedItem = null;
    this.hintStep = 0;

    containerEl.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'drag-zones-engine-wrapper';

    // Drop Zones Grid
    const zonesContainer = document.createElement('div');
    zonesContainer.className = `dropzones-grid zones-count-${stage.zones.length}`;

    stage.zones.forEach(zone => {
      const zoneEl = document.createElement('div');
      zoneEl.className = 'dropzone-card';
      zoneEl.setAttribute('data-zone-id', zone.id);
      if (zone.color) zoneEl.style.setProperty('--zone-theme-color', zone.color);

      zoneEl.innerHTML = `
        <div class="dropzone-header">
          <span class="dropzone-icon">${zone.icon || '📦'}</span>
          <span class="dropzone-title">${zone.title}</span>
        </div>
        <div class="dropzone-slot-area" id="zone-slot-${zone.id}">
          <!-- Placed item chips inserted here -->
        </div>
      `;

      // Drag over and drop listeners
      zoneEl.addEventListener('dragover', (e) => {
        e.preventDefault();
        zoneEl.classList.add('drag-active');
      });

      zoneEl.addEventListener('dragleave', () => {
        zoneEl.classList.remove('drag-active');
      });

      zoneEl.addEventListener('drop', (e) => {
        e.preventDefault();
        zoneEl.classList.remove('drag-active');
        const itemId = e.dataTransfer.getData('text/plain');
        if (itemId) {
          this.placeItemInZone(itemId, zone.id, wrapper);
        }
      });

      // Click to place when an item is selected
      zoneEl.addEventListener('click', () => {
        if (this.selectedItem) {
          this.placeItemInZone(this.selectedItem.id, zone.id, wrapper);
          this.selectedItem = null;
          this.updateBankSelection(wrapper);
        }
      });

      zonesContainer.appendChild(zoneEl);
    });

    wrapper.appendChild(zonesContainer);

    // Items Bank Section
    const bankSection = document.createElement('div');
    bankSection.className = 'drag-bank-section';
    bankSection.innerHTML = `
      <p class="drag-bank-title">Drag items into the correct zones above, or click to place:</p>
      <div class="drag-bank-items" id="drag-bank-items">
        <!-- Available chips rendered dynamically -->
      </div>
    `;

    wrapper.appendChild(bankSection);

    // Toolbar (Submit + Hint)
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar';
    toolbar.innerHTML = `
      <button class="btn-balance-check" id="btn-submit-drag-zones">✓ Check & Submit</button>
      <button class="btn-engine-hint" id="btn-trigger-hint">💡 Use Hint (Step 1/3)</button>
    `;

    toolbar.querySelector('#btn-submit-drag-zones').addEventListener('click', () => {
      this.verifyPlacement();
    });

    toolbar.querySelector('#btn-trigger-hint').addEventListener('click', () => {
      this.executeHint(wrapper);
    });

    wrapper.appendChild(toolbar);
    containerEl.appendChild(wrapper);

    this.renderBankAndSlots(wrapper);
  }

  placeItemInZone(itemId, zoneId, wrapper) {
    sound.playTap();
    this.placements[itemId] = zoneId;
    this.renderBankAndSlots(wrapper);
  }

  removeItemFromZone(itemId, wrapper) {
    sound.playTap();
    delete this.placements[itemId];
    this.renderBankAndSlots(wrapper);
  }

  renderBankAndSlots(wrapper) {
    const bankEl = wrapper.querySelector('#drag-bank-items');
    bankEl.innerHTML = '';

    // Clear all zone slots
    this.currentStage.zones.forEach(zone => {
      const slotEl = wrapper.querySelector(`#zone-slot-${zone.id}`);
      if (slotEl) slotEl.innerHTML = '';
    });

    // Populate items
    this.currentStage.items.forEach(item => {
      const assignedZoneId = this.placements[item.id];

      if (assignedZoneId) {
        // Render inside assigned zone
        const slotEl = wrapper.querySelector(`#zone-slot-${assignedZoneId}`);
        if (slotEl) {
          const placedChip = document.createElement('div');
          placedChip.className = 'placed-item-chip';
          placedChip.innerHTML = `
            <span>${item.icon || '🏷️'}</span>
            <span class="placed-chip-label">${item.label}</span>
            <span class="remove-chip-btn" title="Click to remove">✕</span>
          `;
          placedChip.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeItemFromZone(item.id, wrapper);
          });
          slotEl.appendChild(placedChip);
        }
      } else {
        // Render in source items bank
        const bankChip = document.createElement('div');
        bankChip.className = `drag-item-chip ${this.selectedItem && this.selectedItem.id === item.id ? 'selected-chip' : ''}`;
        bankChip.setAttribute('draggable', 'true');
        bankChip.setAttribute('data-item-id', item.id);

        bankChip.innerHTML = `
          <span class="drag-chip-icon">${item.icon || '🏷️'}</span>
          <span class="drag-chip-label">${item.label}</span>
        `;

        bankChip.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', item.id);
        });

        bankChip.addEventListener('click', (e) => {
          e.stopPropagation();
          sound.playTap();
          if (this.selectedItem && this.selectedItem.id === item.id) {
            this.selectedItem = null;
          } else {
            this.selectedItem = item;
          }
          this.updateBankSelection(wrapper);
        });

        bankEl.appendChild(bankChip);
      }
    });

    if (bankEl.children.length === 0) {
      bankEl.innerHTML = `<div class="bank-all-placed-msg">🎉 All items placed! Click "Check & Submit" above.</div>`;
    }
  }

  updateBankSelection(wrapper) {
    const chips = wrapper.querySelectorAll('.drag-item-chip');
    chips.forEach(chip => {
      const itemId = chip.getAttribute('data-item-id');
      if (this.selectedItem && this.selectedItem.id === itemId) {
        chip.classList.add('selected-chip');
      } else {
        chip.classList.remove('selected-chip');
      }
    });
  }

  verifyPlacement() {
    const totalItems = this.currentStage.items.length;
    const placedKeys = Object.keys(this.placements);

    if (placedKeys.length < totalItems) {
      sound.playError();
      alert(`⚠️ Please place all ${totalItems} items into the zones before submitting!`);
      return;
    }

    let isAllCorrect = true;
    for (const item of this.currentStage.items) {
      if (this.placements[item.id] !== item.correctZoneId) {
        isAllCorrect = false;
        break;
      }
    }

    if (isAllCorrect) {
      sound.playSuccess();
      this.app.handleCorrectAnswer();
    } else {
      sound.playError();
      this.app.handleWrongAnswer(this.currentStage.review);
    }
  }

  executeHint(wrapper) {
    sound.playTap();
    this.hintStep = (this.hintStep % 3) + 1;
    const btnHint = wrapper.querySelector('#btn-trigger-hint');

    if (this.hintStep === 1) {
      btnHint.textContent = '💡 Hint: Step 2/3 (Auto-place 1 Item)';
      alert(`💡 HINT: ${this.currentStage.hint}`);
    } else if (this.hintStep === 2) {
      btnHint.textContent = '💡 Hint: Step 3/3 (Full Rule)';
      // Auto place 1 unplaced or misplaced item
      const targetItem = this.currentStage.items.find(i => this.placements[i.id] !== i.correctZoneId);
      if (targetItem) {
        this.placements[targetItem.id] = targetItem.correctZoneId;
        this.renderBankAndSlots(wrapper);
        alert(`💡 CLUE: "${targetItem.label}" belongs in the "${this.currentStage.zones.find(z => z.id === targetItem.correctZoneId)?.title}" zone!`);
      }
    } else if (this.hintStep === 3) {
      btnHint.textContent = '💡 Hint Used (Reset)';
      alert(`💡 GUIDED REASONING:\n\n${this.currentStage.review}`);
    }
  }
}
