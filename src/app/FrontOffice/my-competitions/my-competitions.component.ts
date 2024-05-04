// my-competitions.component.ts

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-my-competitions',
  templateUrl: './my-competitions.component.html',
  styleUrls: ['./my-competitions.component.css']
})
export class MyCompetitionsComponent  {
  userId: number = 1;
  competitionsData$!: Observable<Map<string, string>>;
userID:any;
  constructor(private competitionService: CompetitionService) {}
 
  ngOnInit(): void {
    this.getMyCompetitions();
    this.userID = sessionStorage.getItem('userID');
    console.log(this.userID);
  }

  getMyCompetitions() {
    this.competitionsData$ = this.competitionService.getMyCompetitions(this.userID);
    // You can subscribe to competitionsData$ if you want to do something with the data when it arrives
    // For example:
    // this.competitionsData$.subscribe(data => console.log(data));
  }
}
