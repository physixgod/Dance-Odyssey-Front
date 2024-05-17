import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-progress-modal',
  templateUrl: './add-progress-modal.component.html',
  styleUrls: ['./add-progress-modal.component.css']
})
export class AddProgressModalComponent {
  trackingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProgressModalComponent>
  ) {
    this.trackingForm = this.fb.group({
      duration: ['', [Validators.required, this.durationFormatValidator]],
      difficulty: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      nextGoal: ['', [Validators.required]],
      comment: ['']
    });
  }

  submitForm() {
    if (this.trackingForm.valid) {
      this.dialogRef.close(this.trackingForm.value);
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  durationFormatValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const regex = /^\d{2}:\d{2}$/; 

    if (!regex.test(value)) {
      return { 'invalidDurationFormat': true };
    }

    return null;
  }
}
