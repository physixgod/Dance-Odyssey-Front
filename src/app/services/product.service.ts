
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product,Image,RatingProduct } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'http://localhost:8086/DanceOdyssey/products';

  constructor(private http: HttpClient) { }

  getProductsByParentCategoryAndProductName(parentCategoryId: number, productName: string): Observable<Product[]> {
    const url = `${this.apiURL}/SearchByParentByNameproducts?parentCategoryId=${parentCategoryId}&productName=${productName}`;
    return this.http.get<Product[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  getProductsByParentCategory(parentCategoryId: number): Observable<Product[]> {
    const url = `${this.apiURL}/byParentCategory/${parentCategoryId}`;
    return this.http.get<Product[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  addProduct(parentId: number, subCategoryId: number, product: Product): Observable<Product> {
    const url = `${this.apiURL}/${parentId}/product/${subCategoryId}`;
    return this.http.post<Product>(url, product);
  }
  addProductsToOrder(nbrProduct: number, parentId: number, idCart: number): Observable<any> {
    const url = `${this.apiURL}/order/add-products-to-order`;
    return this.http.post<any>(url, { nbrProduct, parentId, idCart });
  }

  updateProductById(productId: number, updatedProduct: Product): Observable<Product> {
    const url = `${this.apiURL}/${productId}`;
  
    return this.http.put<Product>(url, updatedProduct)
      .pipe(
        catchError(this.handleError)
      );
  }
  addImagesToProduct(productId: number, mediaFiles: File[]): Observable<string> {
    const formData = new FormData();
    mediaFiles.forEach((mediaFiles, index) => {
      formData.append('mediaFiles', mediaFiles, `mediaFiles${index}`);
    });
  
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    
    return this.http.post<string>(`${this.apiURL}/${productId}/addImages`, formData, { headers });
  }

  updateMediaForProduct(productId: number, mediaId: number, newMediaFiles: File[]): Observable<string[]> {
    const formData = new FormData();
    newMediaFiles.forEach((file, index) => {
      formData.append('files', file, `file${index}`);
    });

    const url = `${this.apiURL}/${productId}/media/${mediaId}`;
    const headers = new HttpHeaders();
    // No need to specify Content-Type here, HttpClient does it automatically for FormData
    return this.http.put<string[]>(url, formData, { headers });
  }
  updateImageUrl(productId: number, imageId: number, updatedImageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('imageFile', updatedImageFile);
  
    return this.http.put<string>(`${this.apiURL}/${productId}/images/${imageId}`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }
  getProductsById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  
  showAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/ShowAllProducts`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getArchivedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/archived`)
      .pipe(
        catchError(this.handleError)
      );
  }

  archiveProduct(productId: number): Observable<string> {
    const url = `${this.apiURL}/archiveProduct/${productId}`;
  
    return this.http.put<string>(url, {}).pipe(
      catchError(this.handleError)
    );
  }
 
  getImagesForProduct(productId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiURL}/${productId}/images`)
      .pipe(
        catchError(this.handleError)
      );
  }
  unarchiveProduct(productId: number): Observable<void> {
    const url = `${this.apiURL}/unarchiveProduct/${productId}`;
    return this.http.put<void>(url, null); // Vous pouvez passer null comme corps de la requête car votre API ne semble pas avoir besoin de données supplémentaires pour cette action
  }
  getLast5Products(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/last-5`);
  }
  getPromotionalProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/promotions`)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/search/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAverageScore(productId: number): Observable<string> {
    return this.http.get<string>(`${this.apiURL}/${productId}/average-score`);
  }
  // Méthode pour obtenir les produits les mieux notés
  getTopRatingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/products/top-rating`);
  }
  addRatingToProduct(productId: number, userId: number, rating: RatingProduct): Observable<any> {
    const url = `${this.apiURL}/ajouterRainting/${productId}/${userId}`;
    return this.http.post<any>(url, rating).pipe(
      catchError(this.handleError)
    );
  }
  getTop5ProductsByParentCategoryId(parentCategoryId: number): Observable<Product[]> {
    const url = `${this.apiURL}/top5ProductVendu/${parentCategoryId}`;
    return this.http.get<Product[]>(url);
  }

  getTop5ProductsPromotionalByParentCategoryId(parentCategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/top5Promotional/${parentCategoryId}`);
  }
  getLast5ProductsByParentCategoryId(parentCategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/Last5Product_Parent/${parentCategoryId}`);
  }
  getTop5ProductsByParentCategory(parentCategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/AvreageScoreProduct_Parent/${parentCategoryId}`);

  }
  getProductReactions(productId: number): Observable<RatingProduct[]> {
    return this.http.get<RatingProduct[]>(`${this.apiURL}/${productId}/reactions`);
  }
  getProductsBySubCategoryId(subCategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}/subcategories/${subCategoryId}/products`);
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
