import { StripeService } from './../../models/StripeService';
import { Orders,Etat,PaymentMode } from './../../models/orders';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { OrderLine } from 'src/app/models/orderLine';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  orderLines: OrderLine[] = [];
  orders: Orders | undefined;
  cart: Cart | undefined; // Utilisez l'union type avec undefined
  userID:any;
  selectedCartId: any; // ID du panier sélectionné
  constructor(private ordersService: OrdersService,private productService: ProductService) { }

  ngOnInit(): void {  this.userID = sessionStorage.getItem('userID');
  console.log(this.userID);
  
  this.productService.getCartID(this.userID).subscribe(
    cartID => {
      console.log('Cart ID:', cartID);
      this.selectedCartId = cartID;

      // Call fetchCartById only when selectedCartId is retrieved
      this.fetchCartById();
      if (this.cart){
      console.log("ggggg"+this.cart);
      } 
      // Call other methods that depend on selectedCartId
      this.fetchOrderLinesWithNullOrderId();
      this.confirmAndProcessPayment();
    },
    error => {
      console.error('Error fetching cart ID:', error);
      // Handle error...
    }
  );
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
  fetchCartById(): void {
    this.ordersService.getCartById(this.selectedCartId).subscribe(
        (cart: Cart) => {
            this.cart = cart;
            console.log(this.cart)
             // Une fois le panier récupéré avec succès, procédez à la confirmation et au paiement
        },
        (error) => {
            console.error('Erreur lors de la récupération du panier:', error);
        }
    );
}

  generateInvoice(orderId: number): void {
    this.ordersService.generateInvoice(orderId).subscribe(
      (invoiceBlob: Blob) => {
        const fileURL = URL.createObjectURL(invoiceBlob);
        window.open(fileURL); // Ouvre le fichier PDF dans un nouvel onglet
      },
      (error) => {
        console.error('Error generating invoice:', error);
      }
    );
  }
  confirmAndProcessPayment(): void {
    console.log("erreur++++");
    if (this.cart) {
      console.log("erreur++++");
      const ordersFromCart = new Orders(
        0, // ordersId
        new Date(), // ordersDate
        '', // buyer_email
        '', // buyer_address
        0, // tax
        this.cart.totPrice, // totalPriceOders
        'USD', // currency
        Etat.WAITING, // etat
        PaymentMode.TRANSFER, // payment_mode
        this.cart, // cartO
        [] // products
      );
  
      this.ordersService.confirmOrder(ordersFromCart, this.selectedCartId).subscribe(
        (response: any) => {
          console.log('Commande confirmée avec succès:', response);
          console.log("gg");
          this.processPayment();
        },
        (error) => {
          console.error('Erreur lors de la confirmation de la commande:', error);
          // Ajoutez ici la logique pour gérer les erreurs de confirmation de commande
        }
      );
    } else {
      console.log("error ici");
      console.error('Cart is not defined.'); // Affichez un message d'erreur si this.cart est indéfini
    }
  }
  
  processPayment(): void {
    if (this.selectedCartId) {
      const paymentPayload: StripeService = {
        amount: this.cart?.totPrice ?? 0,
        name: '', // Ajoutez le nom de l'utilisateur ici
        cardNumber: "4242424242424242",
        expDate: '', // Ajoutez la date d'expiration de la carte de l'utilisateur ici
        cvc: '', // Ajoutez le CVC de la carte de l'utilisateur ici
        stripeToken: "tok_visa",
      };
  
      this.ordersService.processPayment(this.selectedCartId, paymentPayload).subscribe(
        (response: any) => {
          console.log('Paiement effectué avec succès:', response);
          // Ajoutez ici la logique pour gérer le succès du paiement
        },
        (error) => {
          console.error('Erreur lors du paiement:', error);
          // Ajoutez ici la logique pour gérer les erreurs de paiement
        }
      );
    } else {
      console.error('Cart is not defined.'); // Affichez un message d'erreur si this.cart est indéfini
    }
  }
}