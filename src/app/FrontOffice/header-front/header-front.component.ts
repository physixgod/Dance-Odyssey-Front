import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/models/event';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-front',
  templateUrl: './header-front.component.html',
  styleUrls: ['./header-front.component.css']
})
export class HeaderFrontComponent {
  userID: any;
  status:any;
  constructor(private router: Router){
  }
signOut(){
  sessionStorage.clear;
  this.router.navigate(['/login']);
}
isPaidUser(): boolean {
  this.userID = sessionStorage.getItem('userID');
  this.status = sessionStorage.getItem('status')?.toString();
  
  console.log('User ID:', this.userID);
  console.log('Status:', this.status);
  console.log(typeof(this.status));
  return this.status=='true' // Ensure status is compared as a string
}
}
