import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { OrderLine } from 'src/app/models/orderLine';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userID:any;
  selectedCartId: number = 1; // ID du panier sélectionné
  orderLines: OrderLine[] = [];
  cart: Cart | null = null; // Cart est un objet unique, pas un tableau
  constructor(private ordersService: OrdersService,private productService: ProductService) { }

  ngOnInit(): void { 
    this.userID = sessionStorage.getItem('userID');
    console.log(this.userID);
    this.productService.getCartID(this.userID).subscribe(
      cartID => {
        console.log('Cart ID:', cartID);
        this.selectedCartId=cartID;
      },
      error => {
        console.error('Error fetching cart ID:', error);
        // Handle error...
      }
    );
  
    this.fetchOrderLinesWithNullOrderId();
    this.fetchCartById(this.selectedCartId); // Appel pour récupérer les détails du panier avec l'ID spécifié
    this.calculateTotals(); // Appel pour calculer les totaux initiaux
    
  }
  incrementQuantityAndUpdate(orderLine: OrderLine): void {
    orderLine.nbProdO++;
    this.updateOrderLineQuantity(orderLine, 'increment');
  }
  
  decrementQuantityAndUpdate(orderLine: OrderLine): void {
    if (orderLine.nbProdO > 1) {
      orderLine.nbProdO--;
      this.updateOrderLineQuantity(orderLine, 'decrement');
    } else {
      console.log('La quantité de produit est déjà au minimum');
      this.calculateTotals();
    }
  }
  
  updateOrderLineQuantity(orderLine: OrderLine, action: 'increment' | 'decrement'): void {
    const orderId = orderLine.orderId;
    const newQuantity = orderLine.nbProdO;
  
    if (orderId !== null) {
      this.ordersService.updateOrderLineQuantity(orderId, newQuantity).subscribe(
        (updatedOrderLine: OrderLine) => {
          console.log('Quantité de produit mise à jour avec succès dans la base de données', updatedOrderLine);
          if (action === 'increment') {
            console.log('Quantité de produit incrémentée et mise à jour dans la base de données');
          } else if (action === 'decrement') {
            console.log('Quantité de produit décrémentée et mise à jour dans la base de données');
          }
          this.calculateTotals(); // Appel pour calculer les totaux après la mise à jour réussie
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la quantité de produit dans la base de données:', error);
        }
      );
    } else {
      console.error('Error: orderId is null');
    }
  }
  


  removeOrderLine(orderLine: OrderLine): void {
    const orderLineId = orderLine.orderId;
    const cartId = this.selectedCartId;

    // Vérifier si orderLineId et cartId ne sont pas null avant de les passer à la méthode removeOrderLine
    if (orderLineId !== null && cartId !== null) {
      this.ordersService.removeOrderLine(orderLineId, cartId).subscribe(
        (removedOrderLine: OrderLine) => {
          // Supprimer l'élément de la liste des commandes
          const index = this.orderLines.indexOf(orderLine);
          if (index !== -1) {
            this.orderLines.splice(index, 1);
            this.calculateTotals(); // Appel pour recalculer les totaux après la suppression d'une ligne de commande
          }
        },
        (error) => {
          console.error('Error removing order line:', error);
        }
      );
    } else {
      console.error('Error: orderLineId or cartId is null');
    }
  }

  calculateTotals(): void {
    // Vérifier si this.cart est null
    if (this.cart !== null) {
      // Calculer le total pour chaque produit dans le panier
      this.orderLines.forEach(orderLine => {
        orderLine.totalPrice = orderLine.nbProdO * orderLine.detailPrice;
      });
  
      // Calculer le nouveau prix total du panier en additionnant les totaux de chaque produit
      if (this.orderLines.length > 0) {
        this.cart.totPrice = this.orderLines.reduce((total, orderLine) => total + orderLine.totalPrice, 0);
      }
    }
  }
  

  fetchOrderLinesWithNullOrderId(): void {
    this.ordersService.getOrderLinesWithNullOrderIdByCartId().subscribe(
      (data: OrderLine[]) => {
        this.orderLines = data;
      },
      (error) => {
        console.error('Error fetching order lines with null order ID:', error);
      }
    );
  }

  fetchCartById(cartId: number): void {
    this.ordersService.getCartById(cartId).subscribe(
      (cart: Cart) => {
        this.cart = cart;
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }
}
