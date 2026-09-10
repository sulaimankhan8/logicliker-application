/**
 * LogicLike Drag & Drop Category & Habitat Placement Engine
 * Universal Pointer & Touch Drag-and-Drop + Tap-to-Place Engine
 * Features:
 * - Rock-solid Pointer Events drag (works flawlessly across desktop mouse, iPad/tablets, mobile touch)
 * - Dynamic floating drag avatar following cursor/finger with tilt and shadow
 * - Real-time hover dropzone highlight
 * - Fallback tap-to-select & tap-zone-to-place
 * - Click placed chip to return back to bank
 * - Real-time answer validation and 3-step hint engine
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

      // Tap to place when an item is selected
      zoneEl.addEventListener('click', () => {
        if (this.selectedItem) {
          this.placeItemInZone(this.selectedItem.id, zone.id, wrapper);
          this.selectedItem = null;
          this.updateBankSelection(wrapper);
        }
      });

      // HTML5 Drag & Drop backup
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
    if (!bankEl) return;
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
        // Render in source items bank with Universal Pointer Drag
        const bankChip = document.createElement('div');
        bankChip.className = `drag-item-chip ${this.selectedItem && this.selectedItem.id === item.id ? 'selected-chip' : ''}`;
        bankChip.setAttribute('draggable', 'true');
        bankChip.setAttribute('data-item-id', item.id);

        bankChip.innerHTML = `
          <span class="drag-chip-icon">${item.icon || '🏷️'}</span>
          <span class="drag-chip-label">${item.label}</span>
        `;

        this.bindUniversalPointerDrag(bankChip, item, wrapper);

        bankEl.appendChild(bankChip);
      }
    });

    if (bankEl.children.length === 0) {
      bankEl.innerHTML = `<div class="bank-all-placed-msg">🎉 All items placed! Click "Check & Submit" above.</div>`;
    }
  }

  bindUniversalPointerDrag(chipEl, item, wrapper) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let floatingAvatar = null;

    const onPointerDown = (e) => {
      // Only primary mouse button or single touch
      if (e.button !== undefined && e.button !== 0) return;

      isDragging = false;
      startX = e.clientX;
      startY = e.clientY;

      const onPointerMove = (moveEvt) => {
        const dx = moveEvt.clientX - startX;
        const dy = moveEvt.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 5) {
          isDragging = true;
          this.selectedItem = null;
          this.updateBankSelection(wrapper);

          // Create floating drag avatar
          floatingAvatar = document.createElement('div');
          floatingAvatar.className = 'dragging-floating-chip';
          floatingAvatar.innerHTML = `
            <span>${item.icon || '🏷️'}</span>
            <span>${item.label}</span>
          `;
          document.body.appendChild(floatingAvatar);
          chipEl.classList.add('chip-origin-hidden');
        }

        if (isDragging && floatingAvatar) {
          floatingAvatar.style.left = `${moveEvt.clientX}px`;
          floatingAvatar.style.top = `${moveEvt.clientY}px`;

          // Hit test dropzones
          const elemBelow = document.elementFromPoint(moveEvt.clientX, moveEvt.clientY);
          const targetZone = elemBelow ? elemBelow.closest('.dropzone-card') : null;

          wrapper.querySelectorAll('.dropzone-card').forEach(z => {
            z.classList.toggle('drag-active', z === targetZone);
          });
        }
      };

      const onPointerUp = (upEvt) => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);

        chipEl.classList.remove('chip-origin-hidden');

        if (isDragging) {
          if (floatingAvatar) {
            floatingAvatar.remove();
            floatingAvatar = null;
          }

          // Clear dropzone highlights
          wrapper.querySelectorAll('.dropzone-card').forEach(z => z.classList.remove('drag-active'));

          // Identify dropzone under pointer
          const elemBelow = document.elementFromPoint(upEvt.clientX, upEvt.clientY);
          const targetZone = elemBelow ? elemBelow.closest('.dropzone-card') : null;

          if (targetZone) {
            const zoneId = targetZone.getAttribute('data-zone-id');
            if (zoneId) {
              this.placeItemInZone(item.id, zoneId, wrapper);
              return;
            }
          }
        } else {
          // It was a tap / click!
          sound.playTap();
          if (this.selectedItem && this.selectedItem.id === item.id) {
            this.selectedItem = null;
          } else {
            this.selectedItem = item;
          }
          this.updateBankSelection(wrapper);
        }
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    };

    chipEl.addEventListener('pointerdown', onPointerDown);

    // Native HTML5 drag backup
    chipEl.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.id);
    });
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
