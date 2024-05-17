import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private apiUrl = 'http://localhost:8086/feedback/Addfeedback';
  private Url = 'http://localhost:8086/feedback/showall';
  private updateUrl = 'http://localhost:8086/feedback/update';
 
  constructor(private http: HttpClient) { }

  AddFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl,feedback);
  }

  Showfeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.Url);
  }

  updateFeedback(feedback: Feedback): Observable<Feedback> {
    const url = `${this.updateUrl}/${feedback.feedbackID}`;
    // Create a new object with the updated resolved status
    const updatedFeedback = { ...feedback, resolved: !feedback.resolved };
    return this.http.put<Feedback>(url, updatedFeedback);
  }
  
 
}
