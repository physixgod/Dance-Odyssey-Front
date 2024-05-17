import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-annulation',
  templateUrl: './add-annulation.component.html',
  styleUrls: ['./add-annulation.component.css']
})
export class AddAnnulationComponent implements OnInit {

  registerFormCustom!: FormGroup;
  id:any;
  dataSubmitted = false;
  DATA: any[] = [];
  course:any;

  constructor(private fb: FormBuilder,
    
    private courseService : CourseService,
    private router: Router,
    private route: ActivatedRoute) { }




  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('courseID');

    this.registerFormCustom = this.fb.group({

      message: ['', Validators.required],
      etat: [false] 
     
    });
    this.getByID(this.id);

  }


  getByID(id: any): void {
    this.courseService.getByID(id).subscribe((response) => {
      this.course = response;
      console.log(this.course);
    });
  }
  onSubmitsch() {
    if (this.registerFormCustom.valid) {
      this.dataSubmitted = true;
      this.courseService.addCourseTA(this.registerFormCustom.value, this.id).subscribe(
        response => {
          console.log(response);
          this.DATA.push(response);
          this.router.navigate(['/liste']);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }







}
