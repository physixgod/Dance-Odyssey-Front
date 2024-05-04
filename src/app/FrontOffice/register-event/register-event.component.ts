import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { FlaskService } from 'src/app/services/flask.services';

@Component({
  selector: 'app-register-event',
  templateUrl: './register-event.component.html',
  styleUrls: ['./register-event.component.css']
})
export class RegisterEventComponent implements OnInit {

  event!: Event;
  registrationMessage: string = '';

  constructor(
    private flaskService: FlaskService ,
    private route: ActivatedRoute,
    private router: Router, // Inject Router service
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    
    
    this.route.params.subscribe(params => {
      const eventID = +params['id'];
      this.eventService.getEventById(eventID).subscribe(
        (data) => {
          this.event = data;
        },
        (err) => {
          console.log('ERROR WHILE FETCHING EVENT DETAILS: ', err);
        }
      );
    });
  }

  registerForEvent(): void {
    const dancerID = 3; 

    this.eventService.registerDancerEvent(dancerID, this.event.eventID).subscribe(
      (response) => {
        if (response) {
          this.registrationMessage = 'You have been registered for this event';
        } else {
          this.registrationMessage = 'You have been already registered for this event';
        }
      }
    );
  }

  navigateToAddAccommodation(): void {
    
    this.router.navigate(['/addAcc', this.event.eventID]);
  }
  navigateToAccommodationList():void{
    this.router.navigate(['/showEventsAcc',this.event.eventID]);
  }

}
