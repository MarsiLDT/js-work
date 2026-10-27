export class Task {
  constructor(id, title, completed = false) {
    const value = String(title).trim();
    if (value.length < 3) {
      throw new Error('Задача должна быть больше 3 символов');
    }
    if (value.length > 80) {
      throw new Error('Задача должна быть меньше 80 символов');
    }
    this.id = id;
    this.title = value;
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

export class TaskStore {
  constructor(initial = []) {
    this.tasks = initial.map(t => new Task(t.id, t.title, !!t.completed));
  }

  add(title) {
    const task = new Task(Date.now(), title);
    this.tasks.push(task);
    return task;
  }

  toggle(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.toggle();
    }
  }

  remove(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  getFiltered(mode) {
    if (mode === 'active') return this.tasks.filter(t => !t.completed);
    if (mode === 'completed') return this.tasks.filter(t => t.completed);
    return this.tasks;
  }
}