import { Component, OnDestroy } from '@angular/core';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/services/Websocket.service';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamtionComponent implements OnDestroy {
  currentStep: number = 1;
  reclamation: Reclamation = {
    reclamationID: 0,
    reclamationDescription: '', 
    reclamationDate: new Date(),
    reclamationResponse: '',
    reclamationReason: '',
    priority:'' 
  };
  private notificationSubscription: Subscription;
  notificationCount: number = 0;
  userID:any;

  constructor(
    private reclamationService: ReclamationService,
    private websocketService: WebSocketService,
    private toastr: ToastrService,
    private emailService: EmailService
  ) {
    // Pass the WebSocket URL when connecting
    this.websocketService.connectWebSocket('ws://localhost:8086/socket');
    
    // Subscribe to notification subject
    this.notificationSubscription = this.websocketService.getNotificationSubject().subscribe((notification) => {
      // Update notification count
      this.notificationCount = notification;
    });
  }
  ngOnInit(): void { this.userID = sessionStorage.getItem('userID');
  console.log("+++++++++++++++++++++++++++++++++"+this.userID);}
  ngOnDestroy(): void {
    
    // Unsubscribe from notification subject
    this.notificationSubscription.unsubscribe();
  }

  sendEmail() {
    const to = 'alayamontassar7@gmail.com'; // Update with the recipient's email address
    const subject = 'New Reclamation Added';
    const body = 'A new reclamation has been added. Please check it out.';
    this.emailService.sendEmail(to, subject, body).subscribe(
      (response: any) => {
        this.toastr.success('Email sent successfully');
        console.log('Email sent successfully:', response);
      },
      (error: any) => {
        this.toastr.error('Failed to send email');
        console.error('Failed to send email:', error);
      }
    );
  }

  nextStep() {
    // Check if reclamation reason is selected
    if (!this.reclamation.reclamationReason) {
      this.toastr.error('Please select a reclamation reason');
      return;
    }
  
    // Move to next step based on reclamation reason
    switch (this.reclamation.reclamationReason) {
      case 'Technical Issue':
        this.currentStep = 2; // Move to step 2 for technical issue
        break;
      case 'Billing Problem':
        this.currentStep = 3; // Move to step 3 for billing problem
        break;
      case 'Product Quality':
        this.currentStep = 4; // Move to step 4 for product quality
        break;
      case 'Other':
        this.currentStep = 5; // Move to step 5 for other reasons
        break;
      default:
        // Invalid reclamation reason
        this.toastr.error('Invalid reclamation reason');
    }
  }

  prevStep() {
    this.currentStep = 1; // Always go back to the first step
  }

  addReclamation() {
    this.reclamationService.addReclamation(this.reclamation,this.userID).subscribe(
      (data: Reclamation) => {
        console.log("Data: ", data);
        this.sendEmail();
        this.toastr.success('Reclamation Added Successfully ');
        
      },
      (error: any) => {
        console.error("Error: ", error);
        this.toastr.error('Failed to add reclamation. Please try again.');
      }
    );
  }

  
}
