import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition.service';
import { JuryService } from 'src/app/services/jury.service'; 

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  competitions: Competition[] = [];
  selectedFile: File | null = null;
  showUpload: boolean = false;

  toggleUpload(): void {
    this.showUpload = !this.showUpload;
  }
  constructor(
    private competitionService: CompetitionService,
    private juryService: JuryService
  ) { }

  ngOnInit(): void {
    this.getMyJuryCompetitions();
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('File selected:', this.selectedFile);
    } else {
      console.error('No file selected.');
    }
  }

  uploadScores(): void {
    if (this.selectedFile) {
      // No need for FormData, pass the File directly
      this.juryService.uploadScoreFile(this.selectedFile).subscribe({
        next: (result) => {
          console.log('Upload successful:', result);
          // Optionally, show a success message to the user
        },
        error: (error) => {
          console.error('Upload failed:', error);
          // Optionally, show an error message to the user
        }
      });
    } else {
      console.error('No file selected.');
      // Optionally, you can show a message to the user to select a file
    }
  }
  
  getMyJuryCompetitions(): void {
    const idJury = 1;
    this.juryService.getMyJuryCompetitions(idJury).subscribe(
      (competitions: Competition[]) => {
        this.competitions = competitions;
        console.log('Competitions:', this.competitions);
      },
      error => {
        console.error('Error fetching competitions', error);
        // Optionally, you can show an error message to the user
      }
    );
  }
  
  downloadExcel(competitionId: number): void {
    // Fetch competition name
    this.juryService.getCompetitionName(competitionId).subscribe((competitionName: string) => {
      // Once competition name is fetched, proceed to download Excel file
      this.juryService.downloadExcel(competitionId).subscribe((excelBlob: Blob) => {
        const url = window.URL.createObjectURL(excelBlob);
        const a = document.createElement('a');
        a.href = url;
        // Set filename using competition name
        a.download = `${competitionName}_scores.xlsx`; 
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, error => {
        console.error('Error downloading Excel file:', error);
        // Optionally, show an error message to the user
      });
    }, error => {
      console.error('Error fetching competition name:', error);
      // Optionally, show an error message to the user
    });
  }
}
