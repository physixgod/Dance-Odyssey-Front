import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Accommodation } from 'src/app/models/accommodation';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-show-events-acc',
    templateUrl: './show-events-acc.component.html',
    styleUrls: ['./show-events-acc.component.css']
})
export class ShowEventsAccComponent implements OnInit {
[x: string]: any;
reservationStatus: string = '';
    accommodations: Accommodation[] = [];
    selectedAccommodation!: Accommodation;
    showForm: boolean = false;
    totalPrice: string = '';
    numberOfPersons: number = 0;
    breakfast: boolean = false;
    lunch: boolean = false;
    dinner: boolean = false;
    @ViewChild('breakfast') breakfastCheckbox!: ElementRef<HTMLInputElement>;
    @ViewChild('lunch') lunchCheckbox!: ElementRef<HTMLInputElement>;
    @ViewChild('dinner') dinnerCheckbox!: ElementRef<HTMLInputElement>;

    constructor(
        private route: ActivatedRoute,
        private eventService: EventService
    ) { }

    ngOnInit(): void {
        // Retrieve accommodations for the event
        this.route.params.subscribe(params => {
            const eventId = +params['id'];
            this.eventService.getAccommodationsForEvent(eventId).subscribe(
                (data: Accommodation[]) => {
                    this.accommodations = data;
                },
                (error) => {
                    console.error('Error fetching accommodations:', error);
                }
            );
        });
    }

    showReservationForm(accommodation: Accommodation): void {
        this.selectedAccommodation = accommodation;
        this.showForm = true;
    }

   

    calculatePrice(nbPersonnes: number, breakfast: boolean, lunch: boolean, dinner: boolean): void {
      console.log("Debugging calculatePrice method...");
      console.log("nbPersonnes:", nbPersonnes);
      console.log("breakfast:", breakfast);
      console.log("lunch:", lunch);
      console.log("dinner:", dinner);
      console.log(this.breakfastCheckbox.nativeElement.checked);
  
      const idAcc = this.selectedAccommodation.idAcc;
  
   
    const br = this.breakfastCheckbox ? this.breakfastCheckbox.nativeElement.checked : false;
   
    const lu = this.lunchCheckbox ? this.lunchCheckbox.nativeElement.checked : false;
   
    const di = this.dinnerCheckbox ? this.dinnerCheckbox.nativeElement.checked : false;

    this.eventService.showAccPrice(idAcc, nbPersonnes, br, lu, di)
        .subscribe((totalPrice: string) => {
            this.totalPrice = totalPrice;
        }, (error) => {
            console.error('Error calculating total price:', error);
        });
  }
    stringToNumber(value: string): number {
      return parseInt(value, 10); 
    }
    reserveAccommodation(nbPersonnes: number): void {
      const idDancer = 1; 
      const idAcc = this.selectedAccommodation.idAcc;
      const nbPersonnesInt: number = parseInt(nbPersonnes.toString(), 10);
  
      this.eventService.registerAcc(idDancer, idAcc, nbPersonnesInt)
          .subscribe((response: string) => {
              console.log('Accommodation reserved successfully:', response);
              this.reservationStatus = response; 
          }, (error) => {
              console.error('Error reserving accommodation:', error);
          });
  }
  }
  

