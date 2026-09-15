/**
 * Kiddy Learn - Drag & Drop Category & Habitat Placement Engine
 */

import { sound } from '../audio.js';
import { getSvgIcon } from '../icons.js';

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
          <span class="dropzone-icon">${getSvgIcon(zone.icon || zone.id, 'icon-md')}</span>
          <span class="dropzone-title">${zone.title}</span>
        </div>
        <div class="dropzone-slot-area" id="zone-slot-${zone.id}"></div>
      `;

      zoneEl.addEventListener('click', () => {
        if (this.selectedItem) {
          this.placeItemInZone(this.selectedItem.id, zone.id, wrapper);
          this.selectedItem = null;
          this.updateBankSelection(wrapper);
        }
      });

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
      <p class="drag-bank-title">Drag or tap items to place into zones:</p>
      <div class="drag-bank-items" id="drag-bank-items"></div>
    `;

    wrapper.appendChild(bankSection);

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'engine-toolbar';
    toolbar.innerHTML = `
      <button class="btn-balance-check" id="btn-submit-drag-zones">${getSvgIcon('check', 'icon-xs')} <span>Check</span></button>
      <button class="btn-engine-hint" id="btn-trigger-hint">${getSvgIcon('hint', 'icon-xs')} <span>Hint (1/3)</span></button>
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
        const slotEl = wrapper.querySelector(`#zone-slot-${assignedZoneId}`);
        if (slotEl) {
          const placedChip = document.createElement('div');
          placedChip.className = 'placed-item-chip';
          placedChip.innerHTML = `
            <span>${getSvgIcon(item.icon || item.id, 'icon-sm')}</span>
            <span class="placed-chip-label">${item.label}</span>
            <span class="remove-chip-btn" title="Remove">${getSvgIcon('close', 'icon-xs')}</span>
          `;
          placedChip.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeItemFromZone(item.id, wrapper);
          });
          slotEl.appendChild(placedChip);
        }
      } else {
        const bankChip = document.createElement('div');
        bankChip.className = `drag-item-chip ${this.selectedItem && this.selectedItem.id === item.id ? 'selected-chip' : ''}`;
        bankChip.setAttribute('draggable', 'true');
        bankChip.setAttribute('data-item-id', item.id);

        bankChip.innerHTML = `
          <span class="drag-chip-icon">${getSvgIcon(item.icon || item.id, 'icon-sm')}</span>
          <span class="drag-chip-label">${item.label}</span>
        `;

        this.bindUniversalPointerDrag(bankChip, item, wrapper);
        bankEl.appendChild(bankChip);
      }
    });

    if (bankEl.children.length === 0) {
      bankEl.innerHTML = `<div class="bank-all-placed-msg">${getSvgIcon('check', 'icon-sm')} All placed! Tap "Check" above.</div>`;
    }
  }

  bindUniversalPointerDrag(chipEl, item, wrapper) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let floatingAvatar = null;

    const onPointerDown = (e) => {
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

          floatingAvatar = document.createElement('div');
          floatingAvatar.className = 'dragging-floating-chip';
          floatingAvatar.innerHTML = `
            <span>${getSvgIcon(item.icon || item.id, 'icon-sm')}</span>
            <span>${item.label}</span>
          `;
          document.body.appendChild(floatingAvatar);
          chipEl.classList.add('chip-origin-hidden');
        }

        if (isDragging && floatingAvatar) {
          floatingAvatar.style.left = `${moveEvt.clientX}px`;
          floatingAvatar.style.top = `${moveEvt.clientY}px`;

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

          wrapper.querySelectorAll('.dropzone-card').forEach(z => z.classList.remove('drag-active'));

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
      alert(`Please place all ${totalItems} items into zones!`);
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
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint (2/3)</span>`;
      alert(`Clue: ${this.currentStage.hint}`);
    } else if (this.hintStep === 2) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint (3/3)</span>`;
      const targetItem = this.currentStage.items.find(i => this.placements[i.id] !== i.correctZoneId);
      if (targetItem) {
        this.placements[targetItem.id] = targetItem.correctZoneId;
        this.renderBankAndSlots(wrapper);
      }
    } else if (this.hintStep === 3) {
      btnHint.innerHTML = `${getSvgIcon('hint', 'icon-xs')} <span>Hint Used</span>`;
      alert(`Reasoning: ${this.currentStage.review}`);
    }
  }
}
