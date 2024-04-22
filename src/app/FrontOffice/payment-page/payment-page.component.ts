import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentInfo } from 'src/app/models/payment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  PaymentInfo: PaymentInfo = new PaymentInfo();
  paymentDone: boolean = false;
  subscriptionType: string = ''; // Initialize subscriptionType
  email: string | null = null;
  userID: any;
  code: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Retrieve the subscription type from the route parameters
    this.subscriptionType = this.route.snapshot.queryParamMap.get('subscription')!;
    console.log('Subscription Type:', this.subscriptionType);
    this.email = sessionStorage.getItem('email');
    console.log(this.email);
    this.userID = sessionStorage.getItem('userID');
    console.log(this.userID);
    this.code = "Thank you for your " + this.subscriptionType + " payment"; // Assign code value here
  }

  onSubmitPayment() {
    // Check if the payment is valid
    if (this.isValidPayment()) {
      // Retrieve the userID from sessionStorage and convert it to a number
      this.userID = sessionStorage.getItem('userID');
      sessionStorage.getItem('email');

      // Verify that userID exists

      console.log('Payment submitted:', this.PaymentInfo);
      alert('Payment submitted');

      // Mask sensitive payment information
      this.PaymentInfo.cardNumber = this.maskCardNumber(this.PaymentInfo.cardNumber);
      this.PaymentInfo.expirationDate = this.maskExpirationDate(this.PaymentInfo.expirationDate);
      this.PaymentInfo.cvv = this.maskCVV(this.PaymentInfo.cvv);

      // Set the userID in PaymentInfo
      this.PaymentInfo.id = this.userID;

      // Set the subscription type
      this.PaymentInfo.subtype = this.subscriptionType;

      // Save payment info to the backend
      this.userService.savePaymentInfo(this.PaymentInfo).subscribe(
        response => {
          console.log('Payment saved successfully:', response);
          this.paymentDone = true;
          this.SendEmail(); // Call SendEmail method after payment is saved
        },
        error => {
          console.error('Error saving payment:', error);
          alert('Failed to save payment. Please try again.');
        }
      );
    }
  }

  isValidPayment(): boolean {
    // Validation logic
    return true; // Placeholder, replace with your actual validation logic
  }

  maskCardNumber(cardNumber: string): string {
    // Masking logic
    return '************' + cardNumber.substring(cardNumber.length - 4);
  }

  maskExpirationDate(expirationDate: string): string {
    // Masking logic
    return '**/**' + expirationDate.substring(expirationDate.length - 5);
  }

  maskCVV(cvv: string): string {
    // Masking logic
    return '***';
  }

  SendEmail() {
    console.log(this.code);
    console.log(this.email);
    console.log(sessionStorage.getItem('Token'));
    if (this.email) {
      this.userService.sendPasswordResetEmail(this.email, this.code).subscribe(
        () => {
          console.log('Password reset email sent successfully.');
          // Optionally, provide feedback to the user (e.g., show a success message)
        },
        (error) => {
          console.error('Error sending password reset email:', error);
          // Check if the error object is an HttpErrorResponse
          if (error instanceof HttpErrorResponse) {
            const url = error.url!;
            console.log("URL:", url);
            this.userService.executeApi("http://localhost:8086/user/forgotPassword?email=majdoubkhalil853@gmail.com&code=eadadadd").subscribe(
              (response) => {
                console.log('API call response:', response);
                // Handle the API call response as needed
              },
              (error) => {
                console.error('Error executing API call:', error);
                // Optionally, provide feedback to the user (e.g., show an error message)
              }
            );
          }
        }
      );
    } else {
      // Optionally, provide feedback to the user if the email field is empty
    }
  }
}
