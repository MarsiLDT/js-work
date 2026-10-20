export function addTask(tasks, title) {
  tasks.push({ id: Date.now(), title, completed: false });
  return tasks;
}

export function toggleTask(tasks, id) {
  const t = tasks.find(t => t.id === id);
  if (t) t.completed = !t.completed;
  return tasks;
}

export function deleteTask(tasks, id) {
  return tasks.filter(t => t.id !== id);
}

export function filterTasks(tasks, mode) {
  if (mode === 'active') return tasks.filter(t => !t.completed);
  if (mode === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}