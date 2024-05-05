import { Component, OnInit } from '@angular/core';
import { JuryService } from 'src/app/services/jury.service'; 
import { Dancer } from 'src/app/models/dancer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.css']
})


export class MyGroupComponent implements OnInit {
  dancers: Dancer[] = [];
  showMembers: boolean = false;
  groupId: number | undefined;

  constructor(private juryService: JuryService, private router: Router) { }

  ngOnInit(): void {
    this.fetchDancersInGroup();
  }
  showGroupMembers(): void {
    this.showMembers = !this.showMembers;
  }

  fetchDancersInGroup(): void {
    const groupId = 1; // Replace with the actual groupId
    this.juryService.getDancersInGroup(groupId)
      .subscribe(dancers => {
        this.dancers = dancers;
      });
  }

  navigateToAllGroups(): void {
    this.router.navigate(['/homepage']);
  }
}
