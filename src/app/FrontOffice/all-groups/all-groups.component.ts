import { Component, OnInit } from '@angular/core';
import { JuryService } from 'src/app/services/jury.service'; 
import { Group } from 'src/app/models/group';
import { Dancer } from 'src/app/models/dancer';
import { Router } from '@angular/router'; // Import Router module

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css']
})
export class AllGroupsComponent implements OnInit {
  groups: Group[] = [];
  dancerId: number = 3;
  constructor(private JuryService: JuryService, private router: Router) { }

  ngOnInit(): void {
    this.fetchGroups();
  }

  fetchGroups(): void {
    this.JuryService.getAllGroups()
      .subscribe(groups => {
        this.groups = groups;
      });
  }

  joinGroup(groupId: number): void {
    console.log(groupId);
    this.JuryService.joinGroup(groupId, this.dancerId)
      .subscribe(response => {
        console.log(response); // Log the response for now
        this.groups = this.groups.filter(group => group.groupID !== groupId);
        this.router.navigate(['my-group']);
      });
  }
}
