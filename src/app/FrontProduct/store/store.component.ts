import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { OrderLine } from 'src/app/models/orderLine';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  parentCategoryId: number = 0; // ID de la catégorie parent
  products: Product[] = []; // Tableau de produits
  nbrProduct: number = 1; // Nombre de produits à ajouter au panier (initialisé à 1)
  selectedCartId: number = 1; // ID du panier sélectionné (initialisé à 1)
  constructor(private productService: ProductService, private route: ActivatedRoute, private ordersService: OrdersService) {}

  ngOnInit(): void {
    // Utilisation d'ActivatedRoute pour récupérer dynamiquement l'ID de la catégorie parent depuis la route
    this.route.params.subscribe(params => {
      const parentCategoryId = +params['id'];
      if (!isNaN(parentCategoryId)) {
        this.parentCategoryId = parentCategoryId;
        this.loadProductsByParentCategory(parentCategoryId);
      } else {
        console.error('Invalid parent category ID:', parentCategoryId);
      }
    });
  }
  
  generateStars(averageScore: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= averageScore) {
            stars.push('fa fa-star');
        } else {
            stars.push('fa fa-star-o');
        }
    }
    return stars;
}
addProductToOrderAndCreateCart(productId: number): void {
  console.log('Nombre de produits:', this.nbrProduct);
  console.log('ID du produit:', productId);
  console.log('ID du panier:', this.selectedCartId);

  this.ordersService.addProductsToOrder(this.nbrProduct, productId, this.selectedCartId).subscribe(
    (orderLine: OrderLine) => {
      // Gérer la réponse si nécessaire
      console.log('Produit ajouté à la commande et panier créé:', orderLine);
    },
    (error) => {
      console.error('Erreur lors de l\'ajout du produit à la commande et de la création du panier:', error);
    }
  );
}

  loadProductsByParentCategory(parentCategoryId: number): void {
    this.productService.getProductsByParentCategory(parentCategoryId).subscribe(
      (data: Product[]) => {
        this.products = data; // Stockez les produits récupérés dans le tableau de produits du composant
        console.log('Products:', this.products); // Affichez les produits dans la console pour le débogage
      },
      (error) => {
        console.error('Error loading products:', error); // Gérez les erreurs éventuelles
      }
    );
  }
}
