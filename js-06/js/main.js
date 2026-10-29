import { loadTasks, saveTasks } from './storage.js';
import { addTask, toggleTask, deleteTask, filterTasks } from './data.js';
import { renderTasks } from './render.js';

const taskTitle  = document.querySelector('#task-title');
const taskList   = document.querySelector('#task-list');
const taskForm   = document.querySelector('#task-form');
const filterSel  = document.querySelector('#task-filter');
const taskCount  = document.querySelector('#task-count');
const titleError = document.querySelector('#title-error');   // ← новое
const appStatus  = document.querySelector('#app-status');    // ← новое

const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 80;
const ALLOWED_FILTERS  = ['all', 'active', 'completed'];

let tasks = loadTasks();
let currentFilter = 'all';


function validateTitle(rawTitle) {
  const title = rawTitle.trim();
  if (title === '') {
    return { ok: false, error: 'Введите название' };
  }
  if (title.length < MIN_TITLE_LENGTH) {
    return { ok: false, error: `Название должно быть не короче ${MIN_TITLE_LENGTH} символов` };
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return { ok: false, error: `Название должно быть не длиннее ${MAX_TITLE_LENGTH} символов` };
  }
  if (!/\p{L}/u.test(title)) {
    return { ok: false, error: 'Название должно содержать хотя бы одну букву' };
  }
  const duplicate = tasks.some(t => t.title.toLowerCase() === title.toLowerCase());
  if (duplicate) {
    return { ok: false, error: 'Такая задача уже есть' };
  }
  return { ok: true, title };
}


function update() {
  const saved = saveTasks(tasks);
  renderTasks(filterTasks(tasks, currentFilter), taskList, taskCount);
  appStatus.textContent = saved
      ? ''
      : 'Не удалось сохранить задачи. После перезагрузки изменения могут пропасть.';
}


taskTitle.addEventListener('input', () => {
  taskTitle.setCustomValidity('');
  titleError.textContent = '';
});


taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  titleError.textContent = '';
  taskTitle.setCustomValidity('');

  const result = validateTitle(taskTitle.value);
  if (!result.ok) {
    titleError.textContent = result.error;
    taskTitle.setCustomValidity(result.error);
    taskTitle.reportValidity();
    return;
  }

  addTask(tasks, result.title);
  taskForm.reset();
  update();
});


taskList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const li = btn.closest('[data-task-id]');
  if (!li) return;
  const id = Number(li.dataset.taskId);
  if (!Number.isInteger(id)) return;

  const action = btn.dataset.action;
  if (action === 'toggle') {
    toggleTask(tasks, id);
  } else if (action === 'delete') {
    tasks = deleteTask(tasks, id);
  } else {
    return;
  }
  update();
});


filterSel.addEventListener('change', (e) => {
  const value = e.target.value;
  currentFilter = ALLOWED_FILTERS.includes(value) ? value : 'all';
  update();
});

update();