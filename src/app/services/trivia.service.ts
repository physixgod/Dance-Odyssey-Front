
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private baseURL = "http://localhost:8086/question/";

  constructor(private http: HttpClient) {}

  getTenRandomQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}getRandomQuestion`);
  }
}
