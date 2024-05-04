import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../models/competition';
import { Event } from '../models/event';
import { Accommodation } from '../models/accommodation';
@Injectable({
    providedIn: 'root'
  })
  
  export class FlaskService {
    private baseURL = 'http://localhost:5000'; 
  
    constructor(private http: HttpClient) { }
  
    startHandDetection(): Observable<string> {
      return this.http.get(`${this.baseURL}/start-hand-detection`, { responseType: 'text' });
    }
}