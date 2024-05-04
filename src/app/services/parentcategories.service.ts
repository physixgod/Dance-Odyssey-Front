import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ParentCategory } from "src/app/models/parentcategories_product";

@Injectable({
  providedIn: 'root'
})
export class ParentCategoryService {

  private baseURL = 'http://localhost:8086/DanceOdyssey/parentcategories';

  constructor(private http: HttpClient) { }
  getParentCategoryImage(id: number): Observable<string> {
    return this.http.get<string>(`${this.baseURL}/${id}/image`)  .pipe(
      catchError(this.handleError)
    );;
  }
  // Supprimer une catégorie parente par ID
  deleteParentCategory(parentId: number): Observable<void> {
    const url = `${this.baseURL}/parent-categories/${parentId}/`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateParentCategoryWithImage(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.baseURL}/${id}/image`;
    return this.http.put<string>(url, formData);
  }
 
  uploadImageToCategory(imageFile: File, id: number): Observable<string> {
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    return this.http.post<any>(`${this.baseURL}/${id}/uploadimg`, formData);
  }
  

// Récupérer toutes les catégories parentes
 getAllParentCategoriesWithSubCategories(): Observable<ParentCategory[]> {
    return this.http.get<ParentCategory[]>(`${this.baseURL}/parentcategories-with-subcategories`)
      .pipe(
        catchError(this.handleError)
      );
  }
  addParentCategory(parentCategory: ParentCategory): Observable<ParentCategory> {

    const url= `${this.baseURL}/addCategory`;
    return this.http.post<ParentCategory>(url, parentCategory);

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