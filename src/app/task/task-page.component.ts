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
      // 725s com 4g (sem gzip)
      // na aba de rede diz:
      // - que DOMContentLoad: 71ms
      // - Finish: 211
      // (LCP): 0.20 s
      // (CLS): 0.38

      // Angular rodou
      // 2x inicial
      // 1x por digitar
      // 1x por toggle
      // 2x por deletar o selecionado
      // 1x por deletar nao selecionado
      // 2x por editar
      // 2x por salvar sem mudanca
      // 3x salvar com mudança
      // 3x salvar novo

      // COM ZONELESS *****
      // Projeto levou em media 180ms para renderizar com tamanho de 270kb
      // 662ms com 4g (sem gzip)
      // na aba de rede diz:
      // - que DOMContentLoad: 71ms
      // - Finish: 206
      // (LCP): 0.19 s
      // (CLS): 0.23
    });
  }
}
