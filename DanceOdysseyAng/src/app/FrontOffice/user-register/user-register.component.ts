import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role-services.service';
import { Role } from 'src/app/models/Role';
import { Jury } from 'src/app/models/Jury';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  
  captchaResolved: boolean = false;
  handleCaptchaResponse(response: string): void {
    // Handle the response from reCAPTCHAACAA
    console.log('reCAPTCHA response:', response);
    this.captchaResolved = true;
    
  }
  juryCV: File | undefined; // Declare JuryCV variable
  juryID: number = 0; 
  
  user: User = {
    userID: 0,
    userName: '',
    lastName: '',
    email: '',
    password: '',
    confpassword: '',
    role: new Role,
    status: false,
    userCV: '',
  };
  jury: Jury = {
    juryID: 0,
    expertiseArea: '',
    diploma: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    telNumber: '',
    juryCV: '',
    approved: false,
    rejected: false,
    competitionsManagedByJuries: [],
    imageUrl: '',
    archived: false
  };

  passwordStrength: string = '';
  indicatorClass: string = '';
  isButtonDisabled: boolean = false;
  roles: Role[] = [];
  constructor(private userService: UserService, private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {
    this.getAllRoles();
    this.userService.executeApi("http://localhost:8086/user/updateJuryCV/image/8")
  }

  addUser() {
    if (!this.captchaResolved) {
      alert("Please complete the ReCaptcha before submitting the form.");
      return; 
    }
    
    if (this.user.password !== this.user.confpassword) {
      alert("Password and confirmation password do not match.");
      return;
      
    }


    this.passwordStrength = this.calculatePasswordStrength(this.user.password);
    this.setIndicatorClass(this.passwordStrength);

    if (this.passwordStrength === 'weak') {
      this.isButtonDisabled = true;
      return;
    }

    this.userService.addNewUser(this.user).subscribe(
      (data) => {
        alert("User Added  🙂 !!");
        this.router.navigate(['/login']);
        const addedUserId = data.userID; // Assuming the user ID property in the returned data is userId
        sessionStorage.setItem("addedUserId", addedUserId.toString()); // Store the added user ID
        console.log(addedUserId);
        this.uploadJuryCV(addedUserId);
      },
      (error) => {
        console.error(error);
        alert("Error occurred while adding user. Please try again later.");
      }
    );
   
    
  }

  calculatePasswordStrength(password: string): string {
    if (password.length < 8) return 'weak';

    let hasLowercase = false;
    let hasUppercase = false;
    let hasDigit = false;
    let hasSpecialChar = false;

    for (let char of password) {
      if (/[a-z]/.test(char)) hasLowercase = true;
      else if (/[A-Z]/.test(char)) hasUppercase = true;
      else if (/\d/.test(char)) hasDigit = true;
      else if (/[^a-zA-Z0-9]/.test(char)) hasSpecialChar = true;
    }

    let strength = 0;
    if (hasLowercase) strength++;
    if (hasUppercase) strength++;
    if (hasDigit) strength++;
    if (hasSpecialChar) strength++;

    if (strength < 3) return 'weak';
    else if (strength < 4) return 'moderate';
    else return 'strong';
  }
  

  setIndicatorClass(strength: string): void {
    if (strength === 'weak') {
      this.indicatorClass = 'weak-password';
    } else if (strength === 'moderate') {
      this.indicatorClass = 'moderate-password';
    } else if (strength === 'strong') {
      this.indicatorClass = 'strong-password';
    }

  }

  checkPasswordStrength(): void {
    this.passwordStrength = this.calculatePasswordStrength(this.user.password);
    this.setIndicatorClass(this.passwordStrength);
  }
  calculateStrengthBarWidth(): string {
    if (this.passwordStrength === 'weak') {
      return '33%';
    } else if (this.passwordStrength === 'moderate') {
      return '66%';
    } else {
      return '100%';
    }
  }

  getAllRoles() {

    this.roleService.getAllRoles().subscribe((data: Role[]) => {
      console.log("Data from server", data);
      this.roles = data;
    });



  }
  uploadJuryCV(id: number) {
    console.log(this.juryCV);
    if (this.juryCV) {
      this.userService.updateJuryCV(id, this.juryCV).subscribe(
        (data) => {
          console.log("Jury CV Uploaded:", data);
          alert("Jury CV Uploaded Successfully");
          // Optionally, perform any additional actions after successful upload
        },
        (error) => {
          console.error("Error uploading jury CV:", error);
          // Optionally, handle the error accordingly
        }
      );
    } else {
      alert("Please select a file to upload.");
    }
  }
  
  onJuryCVSelected(event: any) {
    this.juryCV = event.target.files[0]; // Assign selected file to juryCV variable
  }
  
  loadJuryCV() {
    this.userService.getJuryCV(this.user.userID).subscribe(
      (juryCV) => {
        console.log("Jury CV URL:", juryCV);
        // Optionally, perform any actions with the URL, such as displaying the image
      },
      (error) => {
        console.error("Error fetching jury CV:", error);
        // Optionally, handle the error accordingly
      }
    );
  }
  
}