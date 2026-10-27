export function renderTasks(tasks, listEl, countEl) {
  listEl.replaceChildren();
  countEl.textContent = tasks.length === 0
    ? 'Задач нет'
    : `Всего задач: ${tasks.length}`;

  for (const task of tasks) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center gap-2';
    li.dataset.taskId = task.id;
    if (task.completed) li.classList.add('completed'); 

    const title = document.createElement('span');
    title.className = 'flex-grow-1 task-title';
    title.textContent = task.title;

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'btn btn-sm btn-outline-success';
    toggleBtn.dataset.action = 'toggle';
    toggleBtn.textContent = '✅';
    toggleBtn.title = task.completed ? 'Вернуть в активные' : 'Отметить выполненной';

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn btn-sm btn-outline-danger';
    deleteBtn.dataset.action = 'delete';
    deleteBtn.textContent = '❌';
    deleteBtn.title = 'Удалить';

    li.append(title, toggleBtn, deleteBtn);
    listEl.append(li);
  }
}