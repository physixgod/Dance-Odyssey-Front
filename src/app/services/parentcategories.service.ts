import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ParentCategory } from "src/app/models/parentcategories_product";

@Injectable({
  providedIn: 'root'
})
export class ParentCategoryService {

  private baseURL = 'http://localhost:8086/DanceOdyssey/parentcategories';

  constructor(private http: HttpClient) { }
  

// Récupérer toutes les catégories parentes
 getAllParentCategoriesWithSubCategories(): Observable<ParentCategory[]> {
    return this.http.get<ParentCategory[]>(`${this.baseURL}/parentcategories-with-subcategories`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Ajouter une nouvelle catégorie parente
  addParentCategory(parentCategory: ParentCategory): Observable<string> {
    return this.http.post<string>(`${this.baseURL}/addCategory`, parentCategory)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Error handling function
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);

    if (error instanceof HttpErrorResponse) {
      console.error(`Status: ${error.status}, ${error.statusText}`);
      console.error('Response body:', error.error);

      const errorMessage = error.error && error.error.error ? error.error.error : 'Something went wrong';

      return throwError(errorMessage);
    }

    return throwError('Something went wrong');
  }}