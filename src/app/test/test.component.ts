import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  imgUrl: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Retrieve the subscription type from the route parameters
    this.userService. getUserCV(Number(121)).subscribe(
      (url) => {
        this.imgUrl = url; // Assign the fetched URL to the imgUrl variable
        console.log(this.imgUrl);
      },
      (error) => {
        console.error('Error fetching jury CV URL:', error);
        // Handle error, e.g., display error message
      }
    );

  }
  

}
