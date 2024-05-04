import { Component } from '@angular/core';
import { JuryService } from 'src/app/services/jury.service';
import { Group } from 'src/app/models/group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-quiz',
  templateUrl: './groups-quiz.component.html',
  styleUrls: ['./groups-quiz.component.css']
})

export class GroupsQuizComponent {
  ageRange!: string;
  danceStyles!: string;
  diverseAgeRepresentation!: boolean;
  beginnerFriendly!: boolean;
  mentorshipProgram!: boolean;
  suggestedGroups: Group[] = []; // Initialize to an empty array

  constructor(private juryService: JuryService, private router: Router) { }

  suggestGroups() {
    this.juryService.suggestGroupsBasedOnAnswers(
      this.ageRange,
      this.danceStyles,
      this.diverseAgeRepresentation,
      this.beginnerFriendly,
      this.mentorshipProgram
    ).subscribe(groups => {
      this.suggestedGroups = groups;
      console.log(this.suggestedGroups);
    });
  }

  joinGroup(groupId: number): void {
    const dancerId = 3; // Replace with actual dancer ID
    this.juryService.joinGroup(groupId, dancerId)
      .subscribe(response => {
        console.log(response); // Log the response for now
        // Optionally, you can remove the joined group from the suggestedGroups array
        
        // Navigate to the appropriate route after joining the group
        this.router.navigate(['my-group']);
      });
  }

  // Define this function to check if the suggestedGroups array has elements
  hasSuggestedGroups(): boolean {
    return this.suggestedGroups.length > 0;
  }
}
