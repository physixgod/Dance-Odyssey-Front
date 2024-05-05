  import { Component } from '@angular/core';
  import { ActivatedRoute, Route, Router } from '@angular/router';
  import { Role } from 'src/app/models/Role';
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
    role:any;
    constructor(private router: Router,private userService: UserService){
    }
    ngOnInit(): void {
      this.role=sessionStorage.getItem('roles');
      console.log("my role"+this.role);

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
