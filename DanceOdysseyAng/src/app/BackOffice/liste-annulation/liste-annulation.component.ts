
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-liste-annulation',
  templateUrl: './liste-annulation.component.html',
  styleUrls: ['./liste-annulation.component.css']
})
export class ListeAnnulationComponent implements OnInit{

  constructor (private courseService : CourseService,
    private router : Router){}

    Courses : any;

  


    
    


    

    
    
   

  
 
   



    

  ngOnInit(): void {


  
  this.AllCourses();
  this. changerEtat(this.Courses.courseID);
  }

    public course : Course= {
      courseID: 0,
      courseName: "",
      description: "",
      category: "",
      durationInHours: 0,
      requiredSkillLevel: "",
      videoUrl: "" 
     
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



    loadCourses(): void {
      this.courseService.getAllCourses().subscribe(
        (data) => {
          this.Courses = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des cours', error);
        }
      );
    }
    changerEtat(courseID: any): void {
      if (courseID !== undefined) { 
        this.courseService.changerEtat(courseID).subscribe({
          next: () => {
            alert('Acceptation annulation avec susses ');
        
            this.loadCourses();


          },
          error: (erreur) => {
            console.error('Erreur lors de la suppression du cours', erreur);
          }
        });
      } else {
        console.error('courseID est undefined');
      }

     
    }





    refus(courseID: any): void {
      if (courseID !== undefined) { 
        this.courseService.refus(courseID).subscribe({
          next: () => {
            alert('Acceptation annulation avec susses ');
         
          
            this.loadCourses();

          },
          error: (erreur) => {
            console.error('Erreur lors de la suppression du cours', erreur);
          }
          
        }
      );
     
      } else {
        console.error('courseID est undefined');
      }

      
    }
  




 
    





}
