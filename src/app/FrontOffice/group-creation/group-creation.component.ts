import { Component } from '@angular/core';
import { JuryService } from 'src/app/services/jury.service'; 
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrls: ['./group-creation.component.css']
})
export class GroupCreationComponent {

  groupName: string = '';
  groupDescription: string = '';
  danceStyle: string = '';
  group: Group = {
    groupID:0,
    groupName:'',
    groupDescription:'',
    danceStyle:''
    
  };

  constructor(private JuryService: JuryService) { }

  createGroup(): void {
   

    this.JuryService.createGroup(this.group).subscribe(
      (response) => {
        console.log('Group created successfully:', response);
        // Optionally, you can show a success message or navigate to another page
      },
      (error) => {
        console.error('Error creating group:', error);
        // Optionally, you can show an error message to the user
      }
    );
  }
}
