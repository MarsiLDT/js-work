const STORAGE_KEY = 'tasks';

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];                
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return []; 
    // отфильтровать мусорные элементы
    return parsed.filter(t =>
      t && typeof t.id === 'number' && typeof t.title === 'string'
    );
  } catch (e) {
    console.warn('Не удалось прочитать задачи', e);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('Не удалось сохранить задачи', e);
  }
}