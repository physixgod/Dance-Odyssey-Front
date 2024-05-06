import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://localhost:8086/email/send'; // Update with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, body: string) {
    return this.http.get(`${this.baseUrl}?to=${to}&subject=${subject}&body=${body}`, { responseType: 'text' });
  }
}
