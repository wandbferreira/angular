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

  @Output() toggle = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<number>();
}
