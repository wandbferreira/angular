import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports: [CommonModule, FormsModule],
})
export class TaskFormComponent implements OnChanges {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() task: Partial<Task> = {};

  @Output() save = new EventEmitter<Partial<Task>>();

  title = '';
  description = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.title = this.task.title || '';
      this.description = this.task.description || '';
    }
  }

  submitForm(): void {
    const newTask: Partial<Task> = {
      ...this.task,
      title: this.title,
      description: this.description,
    };

    this.save.emit(newTask);
    this.resetForm();
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
  }
}
