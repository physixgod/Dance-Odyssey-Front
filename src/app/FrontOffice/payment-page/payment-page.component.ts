import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentInfo } from 'src/app/models/payment';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import Route

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
  imgUrl:string='';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Retrieve the subscription type from the route parameters
    this.subscriptionType = this.route.snapshot.queryParamMap.get('subscription')!;
    console.log('Subscription Type:', this.subscriptionType);
    this.email = sessionStorage.getItem('email');
    console.log(this.email);
    this.userID = sessionStorage.getItem('userID');
    console.log(this.userID);
    this.code = "Thank you for your " + this.subscriptionType + " payments"; // Assign code value here
   
    if (  this.userID) {
      this.userService.getJuryCV(  this.userID).subscribe(
        (url) => {
          url= this.imgUrl;
        },
        (error) => {
          console.error('Error fetching jury CV URL:', error);
          // Handle error, e.g., display error message
        }
      );
    }
  }

  onSubmitPayment() {
    // Check if the payment is valid
    if (this.isValidPayment()) {
      // Retrieve the userID from sessionStorage and convert it to a number
      this.userID = sessionStorage.getItem('userID');
      sessionStorage.getItem('email');

      // Verify that userID exists

      console.log('Payment submitted:', this.PaymentInfo);
      this.router.navigate(['/homepage']);

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

          this.userService.updateUserStatus(Number(this.userID), true).subscribe(
            () => {
              console.log('First user status update successfully');
              console.log('User status update response:', response);
                alert('Second user status updated successfully');

              this.SendEmail(); // Call SendEmail method after user status is updated

              // Schedule the second updateUserStatus call after one minute
              setTimeout(() => {
                this.userService.updateUserStatus(Number(this.userID), false).subscribe(
                  () => {
                    console.log('Second user status updated successfully');
                    alert('Second user status updated successfully');
                  },
                  error => {
                    console.error('Error updating user status:', error);
                  }
                );
              },1000);
            },
          );
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
    if (!this.PaymentInfo.nameOnCard) {
      alert('Name on Card is required');
      return false;
    }

    if (!/^\d{16}$/.test(this.PaymentInfo.cardNumber)) {
      alert('Invalid Card Number. It should be 16 digits.');
      return false;
    }

    const [month, year] = this.PaymentInfo.expirationDate.split('/');
    const currentDate = new Date();
    const expirationDate = new Date(2020 + parseInt(year), parseInt(month) - 1);

    if (expirationDate < currentDate) {
      alert('Invalid Expiration Date. It should be after the current date.');
      return false;
    }

    if (!/^\d{3}$/.test(this.PaymentInfo.cvv)) {
      alert('Invalid CVV. It should be 3 digits.');
      return false;
    }

    return true;
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
