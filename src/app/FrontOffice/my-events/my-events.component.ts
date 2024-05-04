import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  
  myCreatedEvents: Event[] = [];
  userID: any;
  dancerId: number = 1; 
  backgroundImageUrl: string = ''; 
  showImageSelection: boolean = false;
  backgroundSelected: boolean = false;
  eventName: string = '';
  eventLocation: string = '';
  eventStartDate: string = '';
  @ViewChild('contentToConvert', { static: false }) contentToConvert!: ElementRef;

  constructor(private eventService: EventService, private router: Router) {} 

  ngOnInit(): void {
    this.fetchMyCreatedEvents();
    this.userID = sessionStorage.getItem('userID');
    console.log(this.userID);
  }

  fetchMyCreatedEvents() {
    this.eventService.showMyCreatedEvents(this.userID).subscribe(
      (data) => {
        this.myCreatedEvents = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateEvent(event: Event) {
    this.router.navigate(['/upgradevent', event.eventID]);
  }

  deleteEvent(eventId: number) {
    const confirmDelete = confirm("Are you sure you want to delete this event?");

    if (confirmDelete) {
      this.eventService.deleteEvent(eventId).subscribe(
        () => {
          console.log('Event deleted successfully');
          this.fetchMyCreatedEvents();
        },
        (error) => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }

  selectBackground(imagePath: string) {  
    this.backgroundImageUrl = imagePath; 
    this.backgroundSelected = true;
  }
  generateFlyer(event: Event) {
    this.eventName = event.eventName;
    this.eventLocation = event.location;
    this.eventStartDate = new Date(event.startDate).toLocaleDateString();
    
  }

  downloadFlyer() {
    this.showImageSelection = true;
    setTimeout(() => {
      if (this.contentToConvert) {
        const elementToPrint = this.contentToConvert.nativeElement;
  
        html2canvas(elementToPrint).then((canvas) => {
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save(this.eventName+'.pdf');
        });
      } else {
        console.error('contentToConvert is not initialized.');
      }
    }, 500); 
  }
  splitLocation(location: string): { city: string, street: string } {
    const [city, street] = location.split(',');
    return { city, street };
  }
  
  
}
