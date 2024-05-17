import { Component, OnInit } from '@angular/core';
import { JuryService } from 'src/app/services/jury.service'; // Remplacer par le bon chemin du service

@Component({
  selector: 'app-participant-score',
  templateUrl: './participant-score.component.html',
  styleUrls: ['./participant-score.component.css']
})
export class ParticipantScoreComponent implements OnInit {

  participantId: number = 1; // ID du participant à récupérer
  participantDetails: any = {};

  constructor(private juryservice: JuryService) { }

  ngOnInit(): void {
    this.getParticipantDetails();
  }

  getParticipantDetails(): void {
    this.juryservice.getParticipantDetails(this.participantId)
      .subscribe(
        (data: any) => {
          this.participantDetails = data;
          console.log('Participant details:', this.participantDetails);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
  }

}