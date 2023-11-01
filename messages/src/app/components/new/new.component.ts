import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DBService } from 'src/app/services/db.service';
import { RxDocumentBase } from 'rxdb';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  messageForm!: FormGroup;
  dbSvc = inject(DBService);
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  async onSubmit() {
    const { message } = this.messageForm.value;
    const data = {
      id: new Date().toISOString(),
      content: message,
      timestamp: new Date().toISOString(),
    } as unknown as RxDocumentBase<{}, {}>;

    try {
      await this.dbSvc.db.messages.insert(data);
      this.messageForm.reset();
    } catch (error) {
      alert('Error saving message');
      console.error(error);
      throw error;
    }
  }

  private createForm() {
    this.messageForm = this.fb.group({
      message: '',
    });
  }
}
