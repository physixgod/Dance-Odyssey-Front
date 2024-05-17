import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Reclamation } from 'src/app/models/reclamation';

@Component({
  selector: 'app-update-reclamation',
  templateUrl: './update-reclamation.component.html',
  styleUrls: ['./update-reclamation.component.css']
})
export class UpdateReclamationComponent implements OnInit {
  reclamation: Reclamation = new Reclamation();
  reclamationId!: number;

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reclamationId = params['id'];
      this.getReclamation(this.reclamationId);
    });
  }

  getReclamation(id: number): void {
    this.reclamationService.getAllReclamations().subscribe(
      (reclamations: Reclamation[]) => {
        const reclamation = reclamations.find(r => r.reclamationID === id);
        if (reclamation) {
          this.reclamation = { ...reclamation }; // Make a copy to avoid modifying the original object
        } else {
          console.error(`Reclamation with ID ${id} not found`);
        }
      },
      (error: any) => {
        console.error('Error fetching reclamations:', error);
      }
    );
  }

  updateReclamation(): void {
    this.reclamationService.updateReclamation(this.reclamationId, this.reclamation).subscribe(
      (updatedReclamation: Reclamation) => {
        console.log('Reclamation updated:', updatedReclamation);
        // Optionally, redirect to another page or show a success message
      },
      (error: any) => {
        console.error('Error updating reclamation:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
  }
}
