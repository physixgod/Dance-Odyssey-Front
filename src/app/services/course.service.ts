import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseURL = "http://localhost:8086/course";
  private baseFRONT = "http://localhost:8086/annulation";  

  constructor(private http: HttpClient) { }







  addCourseTA(session: any, courseID: string): Observable<any> {
    const url = (`${this.baseFRONT}/add/${courseID}`);
    return this.http.post(url, session);
  }

  supprimerCours(courseID: number): Observable<any> {
    const url = `http://localhost:8086/course/delete/${courseID}`;
    return this.http.delete(url);
  }
  

  changerEtat(courseID: number): Observable<any> {
    const url = `http://localhost:8086/course/update-annulation/${courseID}`;
    return this.http.put(url, {});
  }
  

  refus(courseID: number): Observable<any> {
    const url = `http://localhost:8086/course/refus-annulation/${courseID}`;
    return this.http.put(url, {});
  }
  



  getAllAnnulation(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseFRONT + '/getAllA');
  }



  getCourseStatisticsByCategory(): Observable<any> {
    return this.http.get(`${this.baseURL}/statistics`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseURL + '/getAll');
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseURL + '/add', course);
    
  }


  modifierCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(this.baseURL + '/' + course.courseID, course);
  }
  

  deleteCourse(id: number): Observable<any> {
    return this.http.delete<Course>(`${this.baseURL}/delete/${id}`);
}

getByID(id: any): Observable<any> {
  return this.http.get<Course>(`${this.baseURL}/find/${id}`);
}
  closeCourse(id: any): Observable<Course> {
    return this.http.put<Course>(`${this.baseURL}UpdateCourseStatus/${id}`, id);
  }

  searchCourseByName(name: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseURL}SearchCourseByName/${name}`);
  }

  uploadCourse(formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest<any>('POST', this.baseURL + '/upload', formData, {
      reportProgress: true
    });
    return this.http.request(req);
  }
  

}
