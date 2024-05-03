import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product, Image, RatingProduct } from 'src/app/models/product';
import { SubCategory } from './../../models/parentcategories_product';
import { Observable } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderLine } from 'src/app/models/orderLine';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  imageLoaded: boolean = false;
  productId!: number;
  product: Product | undefined;
  selectedImage: Image | null = null;
  parentCategoryId: number | undefined;
  products: Product[] = [];
  userId: number = 1;
  id: number = 0;
  feedback: string = ''; 
  selectedRating: number = 0;
  relatedProducts: Product[] = [];
  nbrProduct: number = 1; // Nombre de produits à ajouter au panier (initialisé à 1)
  selectedCartId: number = 1; // ID du panier sélectionné (initialisé à 1)
  constructor(
    private productService: ProductService, private ordersService: OrdersService,
    private route: ActivatedRoute 
  ) {}
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
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProductDetails();
    });
  }

  incrementQuantity(): void {
    this.nbrProduct++;
}

decrementQuantity(): void {
    if (this.nbrProduct > 0) {
        this.nbrProduct--;
    }
}

  loadProductDetails(): void {
    this.productService.getProductsById(this.productId).subscribe(
      (data: Product[]) => {
        if (data && data.length > 0) {
          this.product = { ...data[0] };
          if (this.product.images && this.product.images.length > 0) {
            this.selectedImage = this.product.images[0];
          }
        } else {
          console.error('Aucune donnée reçue pour le produit.');
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du produit:', error);
      }
    );
  }


  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  
  isVideo(url: string): boolean {
    return url.match(/\.(mp4|ogg|webm)$/) != null;
  } 

  selectImage(image: Image): void {
    this.selectedImage = image;
  }

  showPreviousImage(): void {
    if (this.product && this.product.images && this.selectedImage) {
      const currentIndex = this.product.images.indexOf(this.selectedImage);
      const previousIndex = (currentIndex - 1 + this.product.images.length) % this.product.images.length;
      this.selectedImage = this.product.images[previousIndex];
    }
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

  showNextImage(): void {
    if (this.product && this.product.images && this.selectedImage) {
      const currentIndex = this.product.images.indexOf(this.selectedImage);
      const nextIndex = (currentIndex + 1) % this.product.images.length;
      this.selectedImage = this.product.images[nextIndex];
    }
  }

  addRatingToProduct(): void {
    if (this.productId && this.userId) {
      const newRating: RatingProduct = new RatingProduct(
        this.id,
        this.feedback,
        this.selectedRating
      );
      this.productService.addRatingToProduct(this.productId, this.userId, newRating).subscribe(
        () => {
          console.log('La notation a été ajoutée avec succès.');
          this.loadProductDetails();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la notation au produit:', error);
        }
      );
    } else {
      console.error('Les informations nécessaires pour ajouter une notation ne sont pas fournies.');
    }
  }
}
