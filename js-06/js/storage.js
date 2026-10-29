const STORAGE_KEY = 'tasks';
const MAX_TITLE_LENGTH = 80;

function normalizeTask(t) {
  if (!t || typeof t !== 'object') return null;
  const id = Number(t.id);
  if (!Number.isFinite(id)) return null;
  if (typeof t.title !== 'string') return null;
  const title = t.title.trim();
  if (title.length === 0) return null;
  return {
    id,
    title: title.slice(0, MAX_TITLE_LENGTH),
    completed: t.completed === true
  };
}

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeTask).filter(Boolean);
  } catch (e) {
    console.warn('Не удалось прочитать задачи', e);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (e) {
    console.warn('Не удалось сохранить задачи', e);
    return false;
  }
}