import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map,tap } from 'rxjs/operators';
import { Product,Image,RatingProduct } from '../models/product';
import { OrderLine } from '../models/orderLine';
import { Cart } from '../models/cart';
import { Orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseURL = 'http://localhost:8086/order';

  constructor(private http: HttpClient) { }
  getCartById(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseURL}/${cartId}`).pipe(
      catchError(this.handleError)
    );
  }
  getOrderLinesWithNullOrderIdByCartId(): Observable<OrderLine[]> {
    return this.http.get<OrderLine[]>(`${this.baseURL}/nullOrderId`)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeOrderLine(orderLineId: number, cartId: number): Observable<OrderLine> {
    const url = `${this.baseURL}/orderline/${orderLineId}/cart/${cartId}`;
    return this.http.delete<OrderLine>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
 // Méthode pour récupérer toutes les commandes
 getAllOrders(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/retrieve-all-Commandes/`)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Méthode pour récupérer toutes les commandes liées à un panier spécifique
  getOrders(cartId: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/retrieve-all-Commandes/${cartId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

 
  // Méthode pour confirmer une commande
  confirmOrder(orders: Orders, cartId: number): Observable<Orders> {
    return this.http.post<Orders>(`${this.baseURL}/confirm/${cartId}`, orders)
      .pipe(
        catchError(this.handleError)
      );
  }
  // Méthode pour accepter une commande
  acceptOrder(idOrders: number): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/${idOrders}/accept`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour refuser une commande
  refuseOrder(idOrders: number): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/${idOrders}/refuser`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour générer une facture PDF pour une commande spécifique
  generateInvoice(orderId: number): Observable<Blob> {
    return this.http.get(`${this.baseURL}/generateInvoice/${orderId}`, { responseType: 'blob' })
      .pipe(
        catchError(this.handleError)
      );
  }

  addProductsToOrder(nbrProduct: number, productId: number, idCart: number): Observable<OrderLine> {
    const url = `${this.baseURL}/addorder`;

    // Créer les paramètres de la requête
    let params = new HttpParams();
    params = params.append('nbrProduct', nbrProduct.toString());
    params = params.append('productId', productId.toString());
    params = params.append('idCart', idCart.toString());

    // Effectuer la requête POST avec les paramètres
    return this.http.post<OrderLine>(url, null, { params: params });
  }
  
  updateOrderLineQuantity(orderLineId: number, newQuantity: number): Observable<OrderLine> {
    const url = `${this.baseURL}/${orderLineId}/quantity`;
    return this.http.put<OrderLine>(url, null, { params: { newQuantity: newQuantity.toString() } });
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
