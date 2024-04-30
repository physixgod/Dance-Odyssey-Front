import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/app/models/Role';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-userstat',
  templateUrl: './userstat.component.html',
  styleUrls: ['./userstat.component.css']
})
export class UserstatComponent implements OnInit {
  roleCounts: { role: string, count: number }[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.countUsersByRole().subscribe(
      (data: any) => {
        // Convert the response data to an array of { role, count } objects
        this.roleCounts = Object.keys(data).map(role => ({ role, count: data[role] }));
      },
      (error) => {
        console.error('Error fetching role counts:', error);
      }
    );
  }
}
