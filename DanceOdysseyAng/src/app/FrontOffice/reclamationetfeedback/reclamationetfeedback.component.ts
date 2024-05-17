import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reclamationetfeedback',
  templateUrl: './reclamationetfeedback.component.html',
  styleUrls: ['./reclamationetfeedback.component.css']
})
export class ReclamationetfeedbackComponent {
  showReclamationOptions: boolean = false;

  toggleReclamationOptions() {
    this.showReclamationOptions = !this.showReclamationOptions;
  }

  constructor(private router: Router) {}

  addReclamation() {
    // Navigate to the add reclamation interface
    this.router.navigate(['/addreclamtion']);
  }

  editReclamation() {
    // Navigate to the edit reclamation interface
    this.router.navigate(['/updatereclamation/:id']);
  }
}

