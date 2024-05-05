import { Cart } from './../../models/cart';
import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ParentCategory } from 'src/app/models/parentcategories_product';
import { ProductService } from 'src/app/services/product.service';
import { ParentCategoryService } from 'src/app/services/parentcategories.service';
import { Product, Image } from 'src/app/models/product';
import { OrderLine } from './../../models/orderLine';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css']
})
export class HomeProductComponent implements OnInit {
  parentCategories: ParentCategory[] = [];
  last5Products: Product[] = [];
  PromotionalProducts: Product[] = [];
  topRatingProducts: Product[] = [];
  products: Product[] = [];
  selectedProductId: number = 0;
  images: Image[] = [];
  parentCategoryId: number = 0; 
  parentCategoryImageUrl: string = '';
  selectedParentCategoryId: number | null = null; // Initialisez l'ID de la catégorie parent sélectionnée à null
  nbrProduct: number = 1; // Nombre de produits à ajouter au panier (initialisé à 1)
  selectedCartId: number = 1; // ID du panier sélectionné (initialisé à 1)
  productImages: Image[] = [];
  userID:any;
  constructor(
    private productService: ProductService,
    private parentCategoryService: ParentCategoryService,
    private ordersService: OrdersService,
    private route: ActivatedRoute // Injectez ActivatedRoute ici


 
  ) { }

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
  

    this.loadParentCategoriesWithSubCategories();
    this.loadLast5Products();
    this.loadTopRatingProducts();
    this.loadPromotionalProducts();
    this.loadImagesForProduct(2);   
    const productId = this.route.snapshot.params['productId'];
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

  
  loadParentCategoriesWithSubCategories(): void {
    this.parentCategoryService.getAllParentCategoriesWithSubCategories().subscribe(
      (data: ParentCategory[]) => {
        this.parentCategories = data;
      },
      (error) => {
        console.error('Error loading parent categories with subcategories:', error);
      }
    );
  }
  isValidImage(imageUrl: string): boolean {
    return imageUrl.toLowerCase().endsWith('.png') || 
           imageUrl.toLowerCase().endsWith('.jpg') || 
           imageUrl.toLowerCase().endsWith('.jpeg');
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
  
  
  loadProductsByParentCategory(): void {
    if (this.selectedParentCategoryId !== null) {
      this.productService.getProductsByParentCategory(this.selectedParentCategoryId).subscribe(
        (data: Product[]) => {
          this.products = data;
        },
        (error) => {
          console.error('Error loading products by parent category:', error);
        }
      );
    } else {
      console.error('Parent category ID is not provided.');
    }
  }
  
  loadLast5Products(): void {
    this.productService.getLast5Products().subscribe(
      (data: Product[]) => {
        this.last5Products = this.filterArchivedProducts(data);
        console.log('5 derniers produits :', this.last5Products); // Ajout du console.log
      },
      (error) => {
        console.error('Erreur lors du chargement des 5 derniers produits :', error);
      }
    );
  }
  
  

  loadPromotionalProducts(): void {
    this.productService.getPromotionalProducts().subscribe(
      (data: Product[]) => {
        this.PromotionalProducts = this.filterArchivedProducts(data);
      },
      (error) => {
        console.error('Error loading PromotionalProducts:', error);
      }
    );
  }

  loadTopRatingProducts(): void {
    this.productService.getTopRatingProducts().subscribe(
      (data: Product[]) => {
        this.topRatingProducts = this.filterArchivedProducts(data);
        console.log(data)
      },
      (error) => {
        console.error('Error loading top rating products:', error);
      }
    );
  }

  filterArchivedProducts(products: Product[]): Product[] {
    return products.filter(product => !product.archived);
  }
  onSelectParentCategory(parentCategoryId: number): void {
    this.selectedParentCategoryId = parentCategoryId; // Mettez à jour l'ID de la catégorie parent sélectionnée
    this.loadProductsByParentCategory(); // Chargez les produits associés à la catégorie parent sélectionnée
  }
  
  onSelectProduct(productId: number): void {
    this.selectedProductId = productId;
    this.loadImagesForProduct(productId);
  }

  loadImagesForProduct(productId: number): void {
    this.productService.getImagesForProduct(productId).subscribe(images => {
      this.productImages = images;
    });
  }

}