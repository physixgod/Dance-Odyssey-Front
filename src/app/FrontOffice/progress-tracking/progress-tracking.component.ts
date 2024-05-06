import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';
import { MatDialog } from '@angular/material/dialog';
import { AddProgressModalComponent } from '../add-progress-modal/add-progress-modal.component';
import { ProgressService } from 'src/app/services/progress.service';
@Component({
  selector: 'app-progress-tracking',
  templateUrl: './progress-tracking.component.html',
  styleUrls: ['./progress-tracking.component.css'],
  
})
export class ProgressTrackingComponent implements OnInit {
  public chart: any;
  public trackingForm: FormGroup = this.fb.group({
    duration: ['', Validators.required],
    difficulty: ['', [Validators.required, Validators.min(0), Validators.max(4)]],
    weight: ['', [Validators.required, Validators.min(0)]]
  });
  progressData: any[]=[];

constructor(private fb: FormBuilder,public dialog: MatDialog,private progressService: ProgressService){

}
  ngOnInit(): void {
    this.getProgressData();
    
  }

  getProgressData(){

    this.progressService.getAllProgressData().subscribe(data => {
      this.progressData = data;
      this.createChart();

    });
    
  }

  createChart() {
    const labels = this.progressData.map(item => item.date);
    const calories = this.progressData.map(item => item.calories);
    const achieved = this.progressData.map(item => item.goalAchieved);
    const data = this.progressData;
    const combinedCaloriesAchieved: number[] = [];
    const combinedCaloriesNotAchieved: number[] = [];
  
    for (let i = 0; i < this.progressData.length; i++) {
      if (achieved[i]) {
        combinedCaloriesAchieved.push(calories[i]);
        combinedCaloriesNotAchieved.push(0); 
      } else {
        combinedCaloriesAchieved.push(0);
        combinedCaloriesNotAchieved.push(calories[i]);
      }
    }
  
    this.chart = new Chart("Progress Tracking", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: "Calories burned (Goal Achieved)",
          data: combinedCaloriesAchieved,
          backgroundColor: 'lightgreen'
        },
        {
          label: "Calories burned (Goal Not Achieved)",
          data: combinedCaloriesNotAchieved,
          backgroundColor: 'red'
        }]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: true,
            title: {
              display: true,
              text: 'Progress tracking',
              font: {
                size: 14,
                weight: 'bold'
              },
              padding: 20,
              color: 'green'
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                const goal = data[context.dataIndex].goal;
  
                if (label) {
                  label += ': ';
                }
  
                if (context.parsed.y !== null) {
                  const difference = context.parsed.y - goal;
                  label += `Calories Burned: ${context.parsed.y}, Goal: ${goal}, Difference: ${difference}`;
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true 
          }
        }
      }
    });
  }
  
  submitForm(result: any) {
    if (result) {
      console.log(result);
      this.progressService.addProgress(result).subscribe(data => {
        this.chart.destroy();
        this.getProgressData();
  
      });
      
    }
  }
  

  openProgressFormDialog(): void {
    const dialogRef = this.dialog.open(AddProgressModalComponent, {
      width: '800px' 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.submitForm(result);      }
    });
  }
}
