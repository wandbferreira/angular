import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const STORAGE_KEY = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  fetchTasks(): Task[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as Task[]) : [];
  }

  saveTasks(tasks: Task[]): void {
    if (Array.isArray(tasks)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }
}
