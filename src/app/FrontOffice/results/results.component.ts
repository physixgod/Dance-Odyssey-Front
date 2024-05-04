import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  updatedScore: number | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the updatedScore from the route parameters
    this.route.params.subscribe(params => {
      this.updatedScore = +params['updatedScore']; // Use the parameter name defined in the routing configuration
    });
  }
}
