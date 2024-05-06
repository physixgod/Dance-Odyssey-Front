import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ReclamationDetailsModalComponent } from '../reclamation-details-modal/reclamation-details-modal.component';

@Component({
  selector: 'app-show-reclamation',
  templateUrl: './show-reclamation.component.html',
  styleUrls: ['./show-reclamation.component.css']
})
export class ShowReclamationComponent implements OnInit {
  reclamations: Reclamation[] = [];
  filteredReclamations: Reclamation[] = [];
  searchTerm: string = '';

  constructor(
    private reclamationService: ReclamationService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllReclamations();
  }

  getAllReclamations() {
    this.reclamationService.getAllReclamations().subscribe(
      (data: Reclamation[]) => {
        this.reclamations = data;
        this.filteredReclamations = [...this.reclamations];
      },
      (error: any) => {
        console.error("Error: ", error);
        this.toastr.error('Failed to fetch reclamations.', 'Error');
      }
    );
  }
  respondToReclamation(event: Event, reclamation: Reclamation){
    event.stopPropagation();

  }

 

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredReclamations = this.reclamations.filter(reclamation => {
        const searchTerm = this.searchTerm.toLowerCase();
        return Object.values(reclamation).some(value => {
          if (typeof value === 'string') {
            const lowerCaseValue = value.toLowerCase();
            return lowerCaseValue.includes(searchTerm);
          }
          return false;
        });
      });
    } else {
      this.filteredReclamations = [...this.reclamations];
    }
  }

  exportToExcel() {
    this.reclamationService.exportReclamationsToExcel().subscribe(
      (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'reclamations.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error exporting reclamations to Excel:', error);
        this.toastr.error('Failed to export reclamations to Excel.', 'Error');
      }
    );
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'black'; // default color
    }
  }

  openReclamationDetailsModal(reclamation: Reclamation): void {
    const dialogRef = this.dialog.open(ReclamationDetailsModalComponent, {
      width: '400px',
      data: { reclamation: reclamation }
    });
  }
}
