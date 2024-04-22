import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Jury } from '../models/Jury';
import { PaymentInfo } from '../models/payment';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })
  export class UserService{
    private baseURL = "http://localhost:8086/user/";
    constructor(private http : HttpClient) { }
    addNewUser(u : User):Observable<User>{
        return this.http.post<User>(this.baseURL+'addNewUser' , u);
      }
      getAllUsers():Observable<User[]>{
        return this.http.get<User[]>(this.baseURL+'showusers')
      }
      deleteUser(userId: number): Observable<any> {
        return this.http.delete(`${this.baseURL}deleteUser/${userId}`);
      }
    
  loginUser(username: string, password: string): Observable<any> {
        console.log({ username, password });
        
        return this.http.post<any>(`${this.baseURL}generateToken`, { username : username, password : password });
  
  }
  getCurrentUser(currentUserUrl: string): Observable<User> {
    return this.http.get<User>(currentUserUrl);}
    getUserByUsername(username: string): Observable<User> {
      return this.http.get<User>(`${this.baseURL}getUser/${username}`);
    }
    
    sendPasswordResetEmail(email: string, code: string): Observable<any> {
      // Construct the URL with the email and code as query parameters
      const url = `${this.baseURL}forgotPassword`;
      const params = new HttpParams().set('email', email).set('code', code);
  
      // Make a GET request with the constructed URL and query parameters
      return this.http.get<any>(url, { params });
    }
    resetPassword(email: string, password: string): Observable<any> {
      const url = `${this.baseURL}resetPassword`;
      console.log(email);
  
      // Create HttpParams object and append email and password as parameters
      let params = new HttpParams()
        .set('email', email)
        .set('password', password);
  
      // Make a PUT request to the backend endpoint with the parameters
      return this.http.get<any>(url, { params });
    }
    executeApi(url: string) {
      return this.http.get(url);
    }
    updateJuryCV(juryID: number, juryCV: File): Observable<any> {
      console.log(5);
      const formData: FormData = new FormData();
      formData.append('image', juryCV, juryCV.name);
    
      return this.http.post<any>(`${this.baseURL}updateJuryCV/image/${juryID}`, formData);
    }
    
    findJuryById(id: number): Observable<Jury> {
      return this.http.get<Jury>(`${this.baseURL}/findjurybyid/${id}`);
    }
    getJuryCV(juryID: number): Observable<string> {
      return this.http.get<string>(`${this.baseURL}getJuryCV/${juryID}`);
    }
    savePaymentInfo(paymentInfo: PaymentInfo): Observable<any> {
      const apiUrl = `${this.baseURL}payment`; // Update this with your actual backend API URL for saving payment information
      return this.http.post<any>(apiUrl, paymentInfo);
    }
  }
  

