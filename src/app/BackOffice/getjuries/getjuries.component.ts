import { Component } from '@angular/core';
import { JuryManager } from 'src/app/models/jury1';
import { JuryService } from 'src/app/services/jury.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-getjuries',
  templateUrl: './getjuries.component.html',
  styleUrls: ['./getjuries.component.css']
})
export class GetjuriesComponent {

  searchName: string = '';

  juries ! : JuryManager[];
  constructor(private juryService : JuryService,private services:UserService){
  }

  ngOnInit(): void {

    this.Alljuries();
   
  }

  Alljuries(){

    this.juryService.getAllJuries().subscribe(
      (data) =>{
        this.juries=data;
        console.log(this.juries)
      },(error) =>{
        console.log("ERROR WHILE FETCHING Juries LIST ", error);
      }
    )
  }
  approveJury(id: number): void {
    this.juryService.approveJury(id).subscribe(
      () => {
        window.location.reload();
        console.log('Jury manager approved successfully');
        // Handle success (e.g., display a success message)
      },
      (error) => {
        console.error('Error approving jury manager:', error);
        // Handle error (e.g., display an error message)
      } 
    );                  
  }
      
  rejectJury(id: number): void {
    this.juryService.rejectJury(id).subscribe(
      () => {
        window.location.reload();
        console.log('Jury rejected successfully');
        // Filter out the rejected jury from the list
        this.juries = this.juries.filter(jury => jury.juryID !== id);
      },
      (error) => {
        console.error('Error rejecting jury:', error);
        // Handle the error as needed
      }
    );
  }
  getJuryCV(juryID: number): void {
    this.services.getJuryCV(juryID).subscribe(
      (cv: string) => {
        // Handle the CV, you can log it for now
        console.log(cv);
        window.open(cv, '_blank');
      },
      (error) => {
        console.error('Error fetching jury CV:', error);
        // Handle the error as needed
      }
    );
  }
  }

  
  

