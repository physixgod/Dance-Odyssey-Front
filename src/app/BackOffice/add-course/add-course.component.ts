import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { ChartOptions, ChartType, ChartData, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  Courses: any;
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          padding: 10, // Reduced padding for a tighter look
          color: '#4A148C', // Elegant purple color
          font: {
            size: 12, // Smaller font size for legend
            family: 'Arial, sans-serif', // Modern, readable font
            style: 'normal'
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#4A148C',
          font: {
            size: 12, // Smaller font size for x-axis labels for more space
            family: 'Arial, sans-serif'
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#4A148C',
          font: {
            size: 12, // Smaller font size for y-axis labels
            family: 'Arial, sans-serif'
          },
          callback: function(value) {
            return Number(value).toString(); // Keeps y-axis labels as integers
          }
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartData<'bar'> = {
    labels: [], // Labels will be dynamic
    datasets: [
      {
        data: [], // Data will be dynamic
        label: 'Nombre de participants',
        backgroundColor: 'rgba(74, 20, 140, 0.8)', // Deep purple
        borderColor: 'rgba(74, 20, 140, 1)', // Darker border color
        borderWidth: 2
      }
    ]
  };

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.AllCourses();
  }

  loadStatistics() {
    this.courseService.getCourseStatisticsByCategory().subscribe(
      data => {
        this.barChartData.labels = Object.keys(data);
        this.barChartData.datasets[0].data = Object.values(data);
      }, error => {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    );
  }

  AllCourses() {
    this.courseService.getAllCourses().subscribe(
      data => {
        this.Courses = data;
      }, err => {
        console.error("ERROR WHILE FETCHING COURSE LIST ", err);
      }
    );
  }

  // Additional methods...
}
