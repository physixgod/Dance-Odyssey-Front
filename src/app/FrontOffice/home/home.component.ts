import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName!: any;
  lastName!:any;
  email!:any
  userID!:any

  constructor(private route: Router) {
  
  }
  ngOnInit() {

    this. userName = sessionStorage.getItem('userName');
    this.email=sessionStorage.getItem('email')
    alert(this.email)
    this.userID=sessionStorage.getItem('userID')

  
    this.lastName=sessionStorage.getItem("lastName");
    console.log(this.lastName);
  }
}
