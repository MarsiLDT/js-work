import { loadTasks, saveTasks } from './storage.js';
import { addTask, toggleTask, deleteTask, filterTasks } from './data.js';
import { renderTasks } from './render.js';

const taskTitle  = document.querySelector('#task-title');
const taskList   = document.querySelector('#task-list');
const taskForm   = document.querySelector('#task-form');
const filterSel  = document.querySelector('#task-filter');
const taskCount  = document.querySelector('#task-count');

let tasks = loadTasks();
let currentFilter = 'all';

function update() {
  saveTasks(tasks);
  renderTasks(filterTasks(tasks, currentFilter), taskList, taskCount);
}

taskTitle.addEventListener('input', () => taskTitle.setCustomValidity(''));

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = taskTitle.value.trim();
  taskTitle.setCustomValidity('');

  if (title === '') {
    taskTitle.setCustomValidity('Введите название');
    taskTitle.reportValidity();
    return;
  }
  if (title.length < 3) {
    taskTitle.setCustomValidity('Задача должна быть больше 3 символов');
    taskTitle.reportValidity();
    return;
  }
  if (title.length > 80) {
    taskTitle.setCustomValidity('Задача должна быть меньше 80 символов');
    taskTitle.reportValidity();
    return;
  }

  addTask(tasks, title);
  taskForm.reset();
  update();
});

taskList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const li = btn.closest('[data-task-id]');
  if (!li) return;
  const id = Number(li.dataset.taskId);

  if (btn.dataset.action === 'toggle') {
    toggleTask(tasks, id);
  } else if (btn.dataset.action === 'delete') {
    tasks = deleteTask(tasks, id); 
  }
  update();
});

filterSel.addEventListener('change', (e) => {
  currentFilter = e.target.value;
  update();
});

update(); 