import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-userstat',
  templateUrl: './userstat.component.html',
  styleUrls: ['./userstat.component.css']
})
export class UserstatComponent implements OnInit {
  roleCounts: { role: string, count: number }[] = [];
  transformedRoleCounts: { name: string, value: number }[] = [];
  statusCounts: { status: string, count: number }[] = []; // New property for status counts
  transformedStatusCounts: { name: string, value: number }[] = []; // Transformed status counts
  customColorScheme = {
    domain: ['#0077FF', '#8A2BE2', '#FF0000', '#FF69B4']
    
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchRoleCounts();
    this.fetchStatusCounts(); // Call the method to fetch status counts
  }

  fetchRoleCounts(): void {
    this.userService.countUsersByRole().subscribe(
      (data: any) => {
        this.roleCounts = Object.entries(data).map(([role, count]) => ({ role, count: Number(count) }));
        this.transformedRoleCounts = this.roleCounts.map(item => ({ name: this.getRoleName(item.role), value: item.count }));
      },
      (error) => {
        console.error('Error fetching role counts:', error);
      }
    );
  }

  fetchStatusCounts(): void {
    this.userService.countUsersByStatus().subscribe(
      (data: any) => {
        this.statusCounts = Object.entries(data).map(([status, count]) => ({ status, count: Number(count) }));
        this.transformedStatusCounts = this.statusCounts.map(item => ({ name: this.getStatusName(item.status), value: item.count }));
      },
      (error) => {
        console.error('Error fetching status counts:', error);
      }
    );
  }

  getRoleName(roleId: string): string {
    switch (roleId) {
      case '1':
        return 'Admin';
      case '2':
        return 'Dancer';
      case '3':
        return 'User';
      case '4':
        return 'Jury';
      default:
        return 'Unknown';
    }
  }

  getStatusName(status: string): string {
    switch (status) {
      case '0':
        return 'non subscribed';
      case '1':
        return 'subscribed';
      default:
        return 'Unknown';
    }
  }
}
