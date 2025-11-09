import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [CommonModule],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

  @Output() toggled = new EventEmitter<Task>();
  @Output() edited = new EventEmitter<Task>();
  @Output() removed = new EventEmitter<number>();
}
