import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute
import { JuryService } from 'src/app/services/jury.service'; 
import { Dancer } from 'src/app/models/dancer';
import {Event} from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.css']
})
export class MyGroupComponent implements OnInit {
  dancers: Dancer[] = [];
  showMembers: boolean = false;
  groupId: number | undefined;
  events: Event[] = [];
  staticDancerId: number = 1;  
  group: any = {}; // Define a variable to hold the workshop information
  workshop: any = {
    name: '',
    description: '',
    date: '',
    location: ''
  };
  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private juryService: JuryService,
    private router: Router,
    private eventservice: EventService
  ) { }

  ngOnInit(): void {
    this.fetchDancersInGroup();
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

  onLoadEvents(): void {
    this.loadEvents();
  }
  
  loadEvents(): void {
    this.juryService.getAllEvents().subscribe(
      (events: Event[]) => {
        // Filter events that start within a week and have not passed
        const currentDate = new Date();
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
        this.events = events.filter(event => {
          const eventStartDate = new Date(event.startDate);
          return eventStartDate >= currentDate && eventStartDate <= oneWeekFromNow;
        });
      },
      (error) => {
        console.error('Error loading events:', error);
        // Optionally, handle error here
      }
    );
  }

  registerForEvent(idEvent: number): void {
    // Use the static dancer ID
    const idDancer = this.staticDancerId;
    this.juryService.registerDancerEvent(idDancer, idEvent).subscribe(
      message => {
        console.log('Your registration has been successful.');
        console.log(message); // Handle success message
      },
      error => {
        console.error('Error registering for event:', error);
      }
    );
  }

  addWorkshop(): void {
     // Static groupId value, replace with actual groupId if needed
    if (this.groupId) {
      this.juryService.addWorkshop(this.workshop, this.groupId).subscribe(
        () => {
          console.log('Workshop added successfully!');
          // Additional logic after workshop is added
        },
        (error) => {
          console.error('Error adding workshop:', error);
          console.error('Failed to add workshop!');
        }
      );
    } else {
      console.error('groupId is undefined');
      // Handle the case where groupId is undefined
    }
  }
}

