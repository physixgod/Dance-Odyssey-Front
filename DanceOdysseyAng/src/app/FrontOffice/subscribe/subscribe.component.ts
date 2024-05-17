import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent {
  username!: any;
  lastName!:any;
  email!:any
  userID!:any
  status!: boolean | null;

  constructor(private router: Router) {}
  redirectToPayment(subscriptionOption: string) {
    this.userID=sessionStorage.getItem('userID')
  console.log(this.userID)
    this.router.navigate(['/payment-page'], { queryParams: { subscription: subscriptionOption } });
    const statusStr = sessionStorage.getItem('status');
  this.status = statusStr === 'true'; // Convert string to boolean

  console.log(this.status);
    
  }
  ngOnInit() {


    this.email=sessionStorage.getItem('email')
    alert(this.email)
    this.userID=sessionStorage.getItem('userID')
  console.log(this.userID)
  
}
  

  }




