import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {
  public categories = ['ZOMBA', 'SALSA', 'Ballet', 'HIPHOP', 'TANGO'];
  public categoriesWithDates: {[key: string]: string[]} = {
    ZOMBA: ['10-03-2024', '17-01-2024', '19-03-2024', '17-09-2024'],
    SALSA: ['15-06-2024', '01-07-2024', '15-09-2024', '01-10-2024', '15-12-2024', '01-01-2024'],
    Ballet: ['20-04-2024'],
    HIPHOP: ['05-08-2024', '10-09-2024', '10-10-2024'],
    TANGO: ['15-10-2024', '20-11-2024']
  };
  public selectedDates: string[] = [];
  public course: Course = {
    courseID: 0,
    courseName: "",
    description: "",
    category: "",
    durationInHours: 0,
    requiredSkillLevel: "",
    videoUrl: "",
    dateCourse: ""
  };
  showSuccessMessage: boolean = false;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {}

  public updateDates(selectedCategory: string): void {
    this.selectedDates = this.categoriesWithDates[selectedCategory] || [];
  }

  public getCategories(): string[] {
    return Object.keys(this.categoriesWithDates);
  }

  addCourse() {
    this.courseService.addCourse(this.course).subscribe({
      next: (response: any) => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['/liste']);
        }, 3000);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const videoPlayer = document.getElementById('videoPreview') as HTMLVideoElement;
      videoPlayer.src = URL.createObjectURL(file);
      videoPlayer.style.display = 'block';
      videoPlayer.load();
    }
  }
}
