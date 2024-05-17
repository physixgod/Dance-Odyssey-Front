import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private baseUrl = 'http://localhost:8086/api/progress';

  constructor(private http: HttpClient) { }

  getAllProgress(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  addProgress(progress: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, progress);
  }

  updateProgress(id: number, progress: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, progress);
  }

  deleteProgress(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllProgressData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/data`);
  }
}
