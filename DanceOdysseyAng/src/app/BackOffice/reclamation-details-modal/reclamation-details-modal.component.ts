import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reclamation } from 'src/app/models/reclamation';

@Component({
  selector: 'app-reclamation-details-modal',
  templateUrl: './reclamation-details-modal.component.html',
  styleUrls: ['./reclamation-details-modal.component.css']
})
export class ReclamationDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ReclamationDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reclamation: Reclamation }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
