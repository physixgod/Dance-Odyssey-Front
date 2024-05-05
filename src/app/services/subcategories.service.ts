import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ParentCategory ,SubCategory} from "src/app/models/parentcategories_product";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private baseURL = 'http://localhost:8086/subcategories';

  constructor(private http: HttpClient) { }


  // Ajouter une sous-catégorie à une catégorie parente
  addSubCategoryToParent(parentId: number, subCategory: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(`${this.baseURL}/${parentId}`, subCategory)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Mettre à jour une sous-catégorie
  updateSubCategory(subCategoryId: number, subCategory: SubCategory): Observable<SubCategory> {
    return this.http.put<SubCategory>(`${this.baseURL}/${subCategoryId}`, subCategory)
      .pipe(
        catchError(this.handleError)
      );
  }

  

  // Supprimer une sous-catégorie par ID de catégorie parente et ID de sous-catégorie
  deleteSubCategoryByParentCategoryId(parentId: number, subCategoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/parent-categories/${parentId}/subcategories/${subCategoryId}`)
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
  }
}
