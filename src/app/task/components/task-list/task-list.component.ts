import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [CommonModule],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
}
