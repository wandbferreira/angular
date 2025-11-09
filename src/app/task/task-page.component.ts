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
      this.tasks.unshift({
        ...task,
        completed: false,
        id: Date.now(),
      } as Task);
    } else if (this.mode === 'edit' && task.id != null) {
      this.tasks = this.tasks.map((t) =>
        t.id === task.id ? { ...t, ...task } : t
      );
    }
    this.taskService.saveTasks(this.tasks);
    this.mode = 'add';
    this.task = {};
  }

  remove(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.taskService.saveTasks(this.tasks);
    this.task = {};
    this.mode = 'add';
  }

  toggle(task: Task): void {
    task.completed = !task.completed;
    this.taskService.saveTasks(this.tasks);
  }

  setEditMode(task: Task): void {
    this.mode = 'edit';
    this.task = { ...task };
  }

  ngAfterViewInit(): void {
    requestIdleCallback(() => {
      performance.mark('end-render');
      performance.measure('render-time', 'start-render', 'end-render');

      const el = document.getElementsByClassName(
        'bg-blue-500'
      )[0] as HTMLElement;
      if (el) el.style.background = 'red';

      const measure = performance.getEntriesByName('render-time')[0];
      console.log(`⏱️ Render: ${measure.duration.toFixed(2)}ms`);

      // Projeto levou em media 200ms para renderizar com tamanho de 300kb
      // 2.8s com 4g
      // na aba de rede diz:
      // - que DOMContentLoad: 71ms
      // - Finish: 211
    });
  }
}
