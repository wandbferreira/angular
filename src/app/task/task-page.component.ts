import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  imports: [TaskFormComponent, TaskListComponent, CommonModule],
})
export class TaskPageComponent implements OnInit {
  tasks: Task[] = [];
  task: Partial<Task> = {};
  mode: 'add' | 'edit' = 'add';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.fetchTasks();
  }

  save(task: Partial<Task>): void {
    if (this.mode === 'add') {
      const newTask: Task = {
        id: Date.now(),
        title: task.title || '',
        description: task.description || '',
        completed: false,
      };
      this.tasks.push(newTask);
    }
    this.taskService.saveTasks(this.tasks);
  }

  remove(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.taskService.saveTasks(this.tasks);
  }

  toggle(taskId: number): void {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.taskService.saveTasks(this.tasks);
    }
  }

  setEditMode() {
    this.mode = 'edit';
    this.task = {};
  }
}
