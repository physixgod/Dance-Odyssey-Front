import { Component } from '@angular/core';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-addfeedback',
  templateUrl: './addfeedback.component.html',
  styleUrls: ['./addfeedback.component.css']
})
export class AddfeedbackComponent {
  feedback: Feedback = new Feedback();

  constructor(
    private feedbackService: FeedbackService,
    private toastr: ToastrService,
    private emailService: EmailService) { }
    sendEmail() {
      const to = 'alayamontassar7@gmail.com'; // Update with the recipient's email address
      const subject = 'New FeedBack Added';
      const body = 'A new FeedBack has been added. Please check it out.';
      this.emailService.sendEmail(to, subject, body).subscribe(
        (response: any) => {
          this.toastr.success('Email sent successfully');
          console.log('Email sent successfully:', response);
        },
        (error: any) => {
          this.toastr.error('Failed to send email');
          console.error('Failed to send email:', error);
        }
      );
    }

    highlightStars(starCount: number) {
      this.feedback.rating = starCount;
      const stars = document.querySelectorAll('.star-rating .star');
  stars.forEach((star, index) => {
    if (index < starCount) {
      star.classList.add('highlighted');
    } else {
      star.classList.remove('highlighted');
    }
  });
    }
  addFeedback() {
    // Assuming you have already bound form inputs to the 'feedback' object using ngModel
    this.feedbackService.AddFeedback(this.feedback).subscribe(
      (response: Feedback) => {
        console.log('Feedback added successfully:', response);
        this.sendEmail();
        this.toastr.success('Feedback added successfully');
        
        // Optionally, you can reset the form or clear input fields here
      },
      (error: any) => {
        console.error('Failed to add feedback:', error);
        this.toastr.error('Failed to add feedback');
        // Handle error, display error message, etc.
      }
    );
  }

}
