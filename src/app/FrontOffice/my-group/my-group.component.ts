import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute
import { JuryService } from 'src/app/services/jury.service'; 
import { Dancer } from 'src/app/models/dancer';

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.css']
})
export class MyGroupComponent implements OnInit {
  dancers: Dancer[] = [];
  showMembers: boolean = false;
  groupId: number | undefined;

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private juryService: JuryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieve the groupId from the route parameters
    this.route.params.subscribe(params => {
      this.groupId = +params['groupId']; // Convert the parameter to a number
      if (this.groupId) {
        this.fetchDancersInGroup(); // Call fetchDancersInGroup here
      }
    });
  }

  showGroupMembers(): void {
    this.showMembers = !this.showMembers;
  }

  fetchDancersInGroup(): void {
    if (this.groupId) {
      this.juryService.getDancersInGroup(this.groupId)
        .subscribe(dancers => {
          this.dancers = dancers;
        });
    }
  }

  navigateToAllGroups(): void {
    this.router.navigate(['/homepage']);
  }
}
