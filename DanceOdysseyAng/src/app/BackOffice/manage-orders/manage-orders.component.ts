import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Orders } from './../../models/orders'; // Assurez-vous que le chemin vers le modèle Orders est correct

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  constructor(private ordersService: OrdersService, private router: Router, private http: HttpClient) {}

  ordersList: Orders[] = [];

  ngOnInit() {
    // Appelez ici les méthodes pour récupérer ou manipuler les commandes
    this.getAllOrders();
  }
// Méthode pour obtenir la classe CSS correspondant à l'état de la commande
getOrderStatusClass(orderStatus: string): string {
  switch (orderStatus) {
    case 'REFUSED':
      return 'refused-status';
    case 'EDITABLE':
      return 'editable-status';
    case 'WAITING':
      return 'waiting-status';
    case 'VALIDATED':
      return 'validated-status';
    default:
      return '';
  }
}

  // Méthode pour récupérer toutes les commandes
  getAllOrders() {
    this.ordersService.getAllOrders().subscribe(
      (data) => {
        console.log('Toutes les commandes:', data);
        this.ordersList = data; // Affectez les données reçues à la liste des commandes
      },
      (error) => {
        console.error('Une erreur est survenue lors de la récupération des commandes:', error);
        // Gérez l'erreur ici, par exemple, affichez un message d'erreur à l'utilisateur
      }
    );
  }

  // Méthode pour confirmer une commande
  confirmOrder(orders: Orders, cartId: number) {
    this.ordersService.confirmOrder(orders, cartId).subscribe(
      (data) => {
        console.log('Commande confirmée avec succès:', data);
        // Traitez la réponse de la confirmation ici, par exemple, redirigez l'utilisateur vers une page de confirmation
      },
      (error) => {
        console.error('Une erreur est survenue lors de la confirmation de la commande:', error);
        // Gérez l'erreur ici
      }
    );
  }

  // Méthode pour accepter une commande
  acceptOrder(idOrders: number) {
    this.ordersService.acceptOrder(idOrders).subscribe(
      (data) => {
        console.log('Commande acceptée avec succès:', data);
        // Traitez la réponse de l'acceptation ici
      },
      (error) => {
        console.error('Une erreur est survenue lors de l\'acceptation de la commande:', error);
        // Gérez l'erreur ici
      }
    );
  }

  // Méthode pour refuser une commande
  refuseOrder(idOrders: number) {
    this.ordersService.refuseOrder(idOrders).subscribe(
      (data) => {
        console.log('Commande refusée avec succès:', data);
        // Traitez la réponse du refus ici
      },
      (error) => {
        console.error('Une erreur est survenue lors du refus de la commande:', error);
        // Gérez l'erreur ici
      }
    );
  }


}
