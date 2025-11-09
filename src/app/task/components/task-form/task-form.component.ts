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
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  imports: [CommonModule, FormsModule],
})
export class TaskFormComponent {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() task: Partial<Task> = {};

  @Output() saved = new EventEmitter<Partial<Task>>();

  submitForm(form: NgForm): void {
    if (form.valid) {
      this.saved.emit(this.task);
      form.resetForm();
    }
  }
}
