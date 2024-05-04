import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from 'src/app/models/accommodation';
import { Dancer } from 'src/app/models/competition';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css']
})
export class AddAccommodationComponent implements OnInit {
  accommodation: Accommodation = {
    pricePerNight: 0,
    availableSlots: 0,
    location: '',
    contact: '',
    availability: false,
    breakfeast: false,
    lunch: false,
    dinner: false,
    idAcc: 0,
    hoster: new Dancer(),
    residents: [],
    breakfeastPrice: 0,
    lunchPrice: 0,
    dinnerPrice: 0
  };

  eventId!: number; // Define eventId variable

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accommodationService: EventService
  ) { }

  ngOnInit(): void {
    // Retrieve event ID from URL parameters
    this.route.params.subscribe(params => {
      this.eventId = +params['id']; // Assuming 'id' is the parameter name for the event ID
      console.log('Event ID:', this.eventId); // Check eventId in console log
      // Here you can perform any logic that depends on this.eventId
      // For example, load accommodation data
    });
  }

  addAccommodation(): void {
    const dancerId = 3; // Define constant for dancer ID
    console.log(dancerId,this.eventId);
    this.accommodationService.addAcc(dancerId,this.eventId, this.accommodation).subscribe(result => {
      // Handle success
      console.log('Accommodation added successfully:', result);
      
     
    }, error => {
      // Handle error
      console.error('Error adding accommodation:', error);
    });
    this.router.navigate(['/listevents']);
  }
  
}
