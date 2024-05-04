import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { OrderLine } from 'src/app/models/orderLine';
import { OrdersService } from 'src/app/services/orders.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  selectedCartId: number = 1; // ID du panier sélectionné
  orderLines: OrderLine[] = [];
  cart: Cart | undefined; // Utilisez l'union type avec undefined

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.fetchOrderLinesWithNullOrderId();
    this.fetchCartById(this.selectedCartId); // Appel pour récupérer les détails du panier avec l'ID spécifié


  }

  incrementQuantity(orderLine: OrderLine): void {
    orderLine.nbProdO++;
  }

  decrementQuantity(orderLine: OrderLine): void {
    if (orderLine.nbProdO > 1) {
      orderLine.nbProdO--;
    }
  }
  removeOrderLine(orderLine: OrderLine): void {
    const orderLineId = orderLine.orderId;
    const cartId =this.selectedCartId;

    // Vérifier si orderLineId et cartId ne sont pas null avant de les passer à la méthode removeOrderLine
    if (orderLineId !== null && cartId !== null) {
      this.ordersService.removeOrderLine(orderLineId, cartId).subscribe(
        (removedOrderLine: OrderLine) => {
          // Supprimer l'élément de la liste des commandes
          const index = this.orderLines.indexOf(orderLine);
          if (index !== -1) {
            this.orderLines.splice(index, 1);
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