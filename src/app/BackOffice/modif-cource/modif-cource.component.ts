import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {  OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

import { Course } from 'src/app/models/course';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modif-cource',
  templateUrl: './modif-cource.component.html',
  styleUrls: ['./modif-cource.component.css']
})
export class ModifCourceComponent  implements OnInit{
  public categories = ['ZOMBA', 'SALSA', 'Ballet', 'HIPHOP', 'TANGO']; // Les options de catégorie
  public dateCourses = ['10-03-2024', '15-06-2024', '17-03-2024', '01-02-2024']; // Les options de catégorie
  constructor (private courseService : CourseService,
    
    private router: Router ,
    private route:ActivatedRoute){}
  

    public categoriesWithDates: {[key: string]: string[]} = {
      ZOMBA: ['10-03-2024', '17-01-2024','19-03-2024', '17-09-2024'],
      SALSA: ['15-06-2024', '01-07-2024','15-09-2024', '01-10-2024','15-12-2024', '01-01-2024'],
      Ballet: ['20-04-2024'],
      HIPHOP: ['05-08-2024', '10-09-2024','10-10-2024'],
      TANGO: ['15-10-2024', '20-11-2024']
    };
    
    

   
    
    public selectedDates: string[] = []; // Les dates qui seront affichées en fonction de la catégorie sélectionnée

    public updateDates(category: string): void {
      if (this.categoriesWithDates.hasOwnProperty(category)) {
        this.selectedDates = this.categoriesWithDates[category];
      } else {
        this.selectedDates = [];
      }
    }
    public getCategories(): string[] {
      return Object.keys(this.categoriesWithDates);
    }
    


    public course : Course= {
      courseID: 0,
      courseName: "",
      description: "",
      category: "",
      durationInHours: 0,
      requiredSkillLevel: "",
      videoUrl: "" ,
      dateCourse: "" 
     
    }
    
    courseID: any
  ngOnInit(): void {

    this.courseID = this.route.snapshot.paramMap.get('courseID');
    this.getByID(this.courseID)
    }
    getByID(courseID: any): void {
      this.courseService.getByID(courseID).subscribe((response) => {
        this.course = response;
        console.log(this.course);
      });


    }

    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        // Ici, vous feriez l'upload du fichier et obtiendriez l'URL de la vidéo
        // Pour l'exemple, nous allons juste simuler l'obtention d'une URL
        this.course.videoUrl = "C:\Users\hmach\Videos\WhatsApp Video.mp4";
      }
    }
  
    modifierCourse() {
      if (this.course && this.course.courseID) {
        this.courseService.modifierCourse(this.course).subscribe(
          (response) => {
            console.log(response);
            alert("Cours modifié avec succès");
            this.router.navigate(['/liste']);

          },
          (error: HttpErrorResponse) => {
            console.error(error.message);
            alert("Erreur lors de la modification du cours");
          }
        );
      } else {
        alert("Le cours n'a pas été défini correctement.");
      }
    }
    
    







}
