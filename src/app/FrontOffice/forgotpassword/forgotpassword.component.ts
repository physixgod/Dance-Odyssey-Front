import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  email: string = ''; // Add email property
  code:string='';
  codepass:string='';
  verified:Boolean=false;
  password:string='';
  password2:string='';

  constructor(private userService: UserService, private router: Router) {this.code=this.generateRandomCode(6)} // Inject UserService
  

  sendEmail() {
    console.log(this.email)
    if (this.email) {
      this.userService.sendPasswordResetEmail(this.email,this.code).subscribe(
        () => {
          console.log('Password reset email sent successfully.');
          // Optionally, provide feedback to the user (e.g., show a success message)
        },
        (error) => {
          console.error('Error sending password reset email:', error);
          // Optionally, provide feedback to the user (e.g., show an error message)
        }
      );
    } else {
      // Optionally, provide feedback to the user if the email field is empty
    }
  }
  private generateRandomCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  verify()
  {
    if(this.code==this.codepass)
    {
      this.verified=true;
      alert( "Verification Successful" ) ;
 
    }
    else{
      alert( "verification failed" ) ;
    }
    

  }
  resetpassword()
  { if(this.password==this.password2)
    
  this.userService.resetPassword(this.email,this.password).subscribe();

  }
  
}
