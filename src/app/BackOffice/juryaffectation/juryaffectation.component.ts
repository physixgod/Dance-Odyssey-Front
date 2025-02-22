import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuryManager } from 'src/app/models/jury1';
import { JuryService } from 'src/app/services/jury.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-juryaffectation',
  templateUrl: './juryaffectation.component.html',
  styleUrls: ['./juryaffectation.component.css']
})
export class JuryaffectationComponent implements OnInit {
  searchName: string = '';
  competitionId!: number; // Variable to store the competition ID
  juries!: JuryManager[];

  constructor(
    private juryService: JuryService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Retrieve the competition ID from the route parameters
    this.route.params.subscribe(params => {
      this.competitionId = params['competitionId'];
      this.getAlljuries(); // Call getAlljuries method
    });
  }

  getAlljuries() {
    // Call the service method to fetch all juries
    this.juryService.showNotAffectedJuries(this.competitionId).pipe(
      catchError(error => {
        console.error('Error loading juries:', error);
        return of([]);
      })
    ).subscribe(
      (juries: JuryManager[]) => {
        this.juries = juries;
        this.loadImagesForAllJuries();
      },
      (err) => {
        console.error("ERROR WHILE FETCHING Juries LIST ");
      }
    );
  }

  loadImagesForAllJuries(): void {
    this.juries.forEach(jury => {
      this.loadImageForJury(jury);
    });
  }

  loadImageForJury(jury: JuryManager): void {
    this.juryService.getImageForJury(jury.juryID).subscribe(
      (response: any) => {
        if (response instanceof Blob) {
          const imageUrl = URL.createObjectURL(response);
          jury.imageUrl = imageUrl;
        } else {
          console.error(`Image response is not a Blob for jury ${jury.juryID}`);
          jury.imageUrl = ''; // Set a default image or empty string
        }
      },
      error => {
        console.error(`Error loading image for jury ${jury.juryID}:`, error);
        jury.imageUrl = ''; // Set a default image or empty string
      }
    );
  }

  addJuryToCompetition(juryId: number) {
    // Call the service method to add the jury to the competition
    this.juryService.setJuries(this.competitionId, juryId).subscribe(
      () => {
        console.log("Jury added to the competition successfully.");
        // Optionally, you can update the juries list after adding the jury to the competition
        this.getAlljuries();
      },
      (err) => {
        console.log("Error while adding jury to the competition: ", err);
      }
    );
  }

  onSearch(): void {
    console.log('Search Name:', this.searchName);

    if (this.searchName.trim() === '') {
      // If the search input is empty, fetch all juries
      this.getAlljuries();
    } else {
      // If there's a search input, search juries by name
      this.juryService.getJuriesByName(this.competitionId, this.searchName).subscribe(
        (juries: JuryManager[]) => {
          this.juries = juries;
          this.loadImagesForAllJuries(); // Load images for searched juries
        },
        (err) => {
          console.log("ERROR WHILE FETCHING Juries LIST ");
        }
      );
    }
  }
}
