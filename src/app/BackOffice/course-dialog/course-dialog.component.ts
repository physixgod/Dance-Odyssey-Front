import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit{
 
course!:Course;

   constructor(private courseService:CourseService,
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any ,
  ) {}



  ngOnInit(): void {
    this.data
    
  }

  getByID(id: any): void {
    this.courseService.getByID(id).subscribe((response) => {
      this.course = response;
      console.log(this.course);
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
