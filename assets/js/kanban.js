/**
 * Kanban board interactions (Tasks page)
 * Simple drag-and-drop and card interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  initKanban();
});

function initKanban() {
  const cards = document.querySelectorAll('.kanban-card');
  const columns = document.querySelectorAll('.kanban-column');

  cards.forEach(card => {
    card.setAttribute('draggable', 'true');
    card.addEventListener('dragstart', onDragStart);
    card.addEventListener('dragend', onDragEnd);
  });

  columns.forEach(col => {
    col.addEventListener('dragover', onDragOver);
    col.addEventListener('dragleave', onDragLeave);
    col.addEventListener('drop', onDrop);
  });
}

function onDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.closest('.kanban-card').id);
  e.target.closest('.kanban-card').classList.add('opacity-50', 'cursor-grabbing');
}

function onDragEnd(e) {
  e.target.closest('.kanban-card').classList.remove('opacity-50', 'cursor-grabbing');
  document.querySelectorAll('.kanban-column').forEach(c => c.classList.remove('drag-over'));
}

function onDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
}

function onDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function onDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const cardId = e.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);
  const columnBody = e.currentTarget.querySelector('.kanban-column-cards');
  if (card && columnBody) {
    columnBody.appendChild(card);
  }
}
