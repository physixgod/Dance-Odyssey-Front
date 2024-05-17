import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CourseDialogComponent } from 'src/app/BackOffice/course-dialog/course-dialog.component'; 


@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
 
  
  constructor(private courseService : CourseService,
    private router : Router,
    public dialog: MatDialog
  ){}
  Courses : Course [] = []
  course :any
 
  ngOnInit(): void {
    this.AllCourses()

 let someId = 9;
  this.getByID(someId);

    
}

 AllCourses(){

  this.courseService.getAllCourses().subscribe(
    (data) =>{
      this.Courses=data;
      console.log(this.Courses)
    },(err) =>{
      console.log("ERROR WHILE FETCHING COMPETITION LIST ");
    }
  )
}

public deleteCourse(id:any ){
  this.courseService.deleteCourse(id).subscribe(
    (Response)=> this.AllCourses()
  )
}

getByID(id: any): void {
  this.courseService.getByID(id).subscribe((response) => {
    this.course = response;
    console.log(this.course);
  });
}

openDialog(id:any): void {
  const dialogRef = this.dialog.open(CourseDialogComponent, {
    data: {id},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    
  });
}


supprimerCours(courseID: any): void {
  if (courseID !== undefined) { 
    this.courseService.supprimerCours(courseID).subscribe({
      next: () => {
        alert('Cours supprimé avec succès');
        window.location.reload(); // Actualise la page
      },
      error: (erreur) => {
        console.error('Erreur lors de la suppression du cours', erreur);
      }
    });
  } else {
    console.error('courseID est undefined');
  }
}





}