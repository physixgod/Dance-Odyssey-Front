import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  userID: any;
  user: User = {
    userID: 0,
    userName: '',
    lastName: '',
    email: '',
    password: '',
    confpassword: '',
    status: true,
    role: new Role,
    userCV:'',
    
  };
  userName!: any;
  imgUrl: string = '';
  userCV: File | undefined;
  passwordsMatch: boolean = true; // Variable to track if passwords match
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userID');
    this. userName = sessionStorage.getItem('userName');
    if (this.userID) {
      this.userService.getUserById(this.userID).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
      
        // Retrieve the subscription type from the route parameters
        this.userService. getUserCV(this.userID).subscribe(
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
  
  
    updateUser(): void {
      // Check if passwords match
      if (this.user.password !== this.user.confpassword) {
        this.passwordsMatch = false; // Set passwordsMatch to false if passwords don't match
        alert("password dont match")
        return; // Exit the method early
      }
      
      // If passwords match, proceed with update
      this.userService.updateUser(this.user).subscribe(
        (data) => {
          console.log('Response from server:', data);
          alert("User Updated Successfully!");
          // Optionally, you can redirect the user to a different page after successful update
          // this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error updating user:', error);
          alert("Error occurred while updating user. Please try again later.");
        }
      );
    }
  uploadUserCV(): void {
    // Ensure userID is available
    if (this.userID) {
      // Check if userCV is selected
      if (this.userCV) {
        // Call the service method to upload the user's CV
        this.userService.   updateUserCV(this.userID, this.userCV).subscribe(
          (data) => {
            console.log("User CV Uploaded:", data);
            alert("User CV Uploaded Successfully");
            // Optionally, perform any additional actions after successful upload
          },
          (error) => {
            console.error("Error uploading user CV:", error);
            // Optionally, handle the error accordingly
          }
        );
      } else {
        alert("Please select a file to upload.");
      }
    } else {
      alert("User ID not available. Please make sure the user is logged in.");
    }
  }
  
  onUserCVSelected(event: any) {
    this.userCV = event.target.files[0];
    // Get the selected file
    if ( this.userCV) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgUrl = e.target.result; // Update imgUrl with the data URL
      };
      reader.readAsDataURL( this.userCV); // Read the selected file as a data URL
    } // Assign selected file to juryCV variable
  }
  
  loadUserCV() {
    this.userService.getUserCV(this.user.userID).subscribe(
      (userCV) => {
        console.log("user CV URL:", userCV);
        // Optionally, perform any actions with the URL, such as displaying the image
      },
      (error) => {
        console.error("Error fetching user CV:", error);
        // Optionally, handle the error accordingly
      }
    );
  }
}
  

