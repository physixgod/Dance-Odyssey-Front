
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ParentCategory } from "src/app/models/parentcategories_product";
import { Product,Image } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8086/DanceOdyssey/products';

  constructor(private http: HttpClient) { }


  addProductToParentCategory(parentId: number, product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseURL}/${parentId}/product`, product)
      .pipe(
        catchError(this.handleError)
      );
  }


  updateProductById(productId: number, updatedProduct: Product): Observable<Product> {
    const url = `${this.baseURL}/${productId}`;
  
    return this.http.put<Product>(url, updatedProduct)
      .pipe(
        catchError(this.handleError)
      );
  }
  addImagesToProduct(productId: number, images: File[]): Observable<string> {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('imageFiles', image, `image${index}`);
    });
  
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    
    return this.http.post<string>(`${this.baseURL}/${productId}/addImages`, formData, { headers });
  }
  updateImageUrl(productId: number, imageId: number, updatedImageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('imageFile', updatedImageFile);
  
    return this.http.put<string>(`${this.baseURL}/${productId}/images/${imageId}`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }
  getProductsById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  showAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/ShowAllProducts`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getArchivedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/archived`)
      .pipe(
        catchError(this.handleError)
      );
  }

  archiveProduct(productId: number): Observable<string> {
    const url = `${this.baseURL}/archiveProduct/${productId}`;
  
    return this.http.put<string>(url, {}).pipe(
      catchError(this.handleError)
    );
  }
  UnarchiveProduct(productId: number): Observable<string> {
    const url = `${this.baseURL}/unarchiveProduct/${productId}`;
  
    return this.http.put<string>(url, {}).pipe(
      catchError(this.handleError)
    );
  }
 

  getImagesForProduct(productId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.baseURL}/${productId}/images`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getLast5Products(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/last-5`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPromotionalProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/promotions`)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/search/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Méthode pour obtenir les produits les mieux notés
  getTopRatingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/products/top-rating`);
  }

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
