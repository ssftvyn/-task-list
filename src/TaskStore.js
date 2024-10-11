import { makeAutoObservable } from 'mobx';

class TaskStore {
  tasks = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(title, description) {
    const newTask = { id: Date.now().toString(), title, description, completed: false, subtasks: [] };
    this.tasks.push(newTask);
}

addSubtask(parentId, title) {
  const parentTask = this.findTaskById(parentId);
  if (parentTask) {
      const newSubtask = { id: Date.now().toString(), title, completed: false, subtasks: [] };
      parentTask.subtasks.push(newSubtask);
  }
}


toggleTaskCompletion(id) {
  const task = this.findTaskById(id);
  if (task) {
      task.completed = !task.completed;

      task.subtasks.forEach(subtask => {
          subtask.completed = task.completed; 
      });

      this.updateParentCompletion(task);
  }
}


updateParentCompletion(task) {
  const parentTask = this.findParentTask(task.id);
  if (parentTask) {
      const allCompleted = parentTask.subtasks.every(subtask => subtask.completed);
      parentTask.completed = allCompleted;
      if (!allCompleted) {
          parentTask.completed = false;
      }
  }
}


  findTaskById(id) {
    for (const task of this.tasks) {
      if (task.id === id) return task;
      const subtask = this.findSubtaskById(task.subtasks, id);
      if (subtask) return subtask;
    }
  }

  findSubtaskById(subtasks, id) {
    for (const subtask of subtasks) {
      if (subtask.id === id) return subtask;
      const found = this.findSubtaskById(subtask.subtasks, id);
      if (found) return found;
    }
  }

  findParentTask(id) {
    for (const task of this.tasks) {
      if (task.subtasks.some(subtask => subtask.id === id)) return task;
      const parentTask = this.findParentInSubtasks(task.subtasks, id);
      if (parentTask) return parentTask;
    }
  }

  findParentInSubtasks(subtasks, id) {
    for (const subtask of subtasks) {
      if (subtask.subtasks.some(s => s.id === id)) return subtask;
      const found = this.findParentInSubtasks(subtask.subtasks, id);
      if (found) return found;
    }
  }

  removeTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasks.forEach(task => {
      task.subtasks = task.subtasks.filter(subtask => subtask.id !== id);
    });
  }  

  editTask(id, newTitle) {
    const task = this.findTaskById(id);
    if (task) {
      task.title = newTitle;
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem('tasks');
    if (data) {
      this.tasks = JSON.parse(data);
    }
  }
}

const taskStore = new TaskStore();
taskStore.loadFromLocalStorage();
export default taskStore;
