import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ParentCategory } from './../../models/parentcategories_product';
import { ProductService } from 'src/app/services/product.service';
import { ParentCategoryService } from 'src/app/services/parentcategories.service';
import { Product } from 'src/app/models/product';
import { OrderLine } from 'src/app/models/orderLine';

@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.css']
})
export class LatestProductsComponent implements OnInit {
  parentCategories: ParentCategory[] = [];
  last5ProductsMap: Map<number, Product[]> = new Map<number, Product[]>(); 
  nbrProduct: number = 1; // Nombre de produits à ajouter au panier (initialisé à 1)
  selectedCartId: number = 1; // ID du panier sélectionné (initialisé à 1)
  constructor(
    private parentCategoryService: ParentCategoryService,
    private productService: ProductService,    private ordersService: OrdersService,

  ) { }

  ngOnInit(): void {
    this.loadParentCategoriesWithSubCategories();
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
  
  loadParentCategoriesWithSubCategories(): void {
    this.parentCategoryService.getAllParentCategoriesWithSubCategories().subscribe(
      (parentCategories: ParentCategory[]) => {
        this.parentCategories = parentCategories;
        
        // Charger les 5 derniers produits pour chaque catégorie parente
        this.parentCategories.forEach(parentCategory => {
          if(parentCategory && parentCategory.id) {
            this.loadLast5ProductsByParentCategoryId(parentCategory.id);
          }
        });
      },
      (error) => {
        console.error('Error loading parent categories with subcategories:', error);
      }
    );
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
loadLast5ProductsByParentCategoryId(parentCategoryId: number): void {
  this.productService.getLast5ProductsByParentCategoryId(parentCategoryId).subscribe(
    (products: Product[]) => {
      if (products && products.length > 0) {
        // Filtrer les produits archivés
        const filteredProducts = products.filter(product => !product.archived);
        // Ajouter les produits filtrés à last5ProductsMap
        this.last5ProductsMap.set(parentCategoryId, filteredProducts);
      }
    },
    (error) => {
      console.error('Error loading last 5 products for parent category ID ' + parentCategoryId + ':', error);
    }
  );
}
}
