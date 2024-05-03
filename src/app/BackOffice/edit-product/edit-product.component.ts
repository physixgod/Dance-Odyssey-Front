import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product, Image } from 'src/app/models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  imageLoaded: boolean = false;
  productId!: number;
  product: Product | undefined;
  selectedImage: Image | null = null;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProductDetails();
    });
  }

  loadProductDetails(): void {
    this.productService.getProductsById(this.productId).subscribe(
      (data: Product[]) => {
        if (data && data.length > 0) {
          this.product = { ...data[0] };
        } else {
          console.error('Le produit avec l\'ID spécifié n\'a pas été trouvé.');
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du produit:', error);
      }
    );
  }

  saveChanges(): void {
    if (!this.product) {
      console.error('Erreur: Le produit est undefined.');
      return;
    }
  
    const productId = this.product.idProduct;
    
    if (productId !== undefined) {
      this.productService.updateProductById(productId, this.product).subscribe(
        (updatedProduct: Product) => {
          console.log('Détails du produit mis à jour avec succès:', updatedProduct);

          const mediaId = this.selectedImage ? this.selectedImage.id : undefined;

          if (productId !== undefined && mediaId !== undefined && this.selectedFile) {
            this.productService.updateMediaForProduct(
              productId,
              mediaId,
              [this.selectedFile]
            ).subscribe(
              (newMediaFiles: string[]) => {
                console.log('URL de l\'image mise à jour avec succès. Nouvelle URL:', newMediaFiles);
                if (this.selectedImage) {
                  this.selectedImage.imageUrl = newMediaFiles[0];
                }    
                this.router.navigate(['/admin/list-product']);
              },
              (error) => {
                console.error('Erreur lors de la mise à jour de l\'URL de l\'image:', error);
                console.error('Message d\'erreur du serveur:', error.error);
                console.error('Statut:', error.status);
              }
            );
          } else {
            console.error('Erreur: Informations insuffisantes pour mettre à jour l\'image.');
          }
        },
        (error) => {
          console.error('Erreur lors de la mise à jour des détails du produit:', error);
        }
      );
    } else {
      console.error('Erreur: Impossible de mettre à jour le produit car l\'ID est indéfini.');
    }
  }

  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  
  isVideo(url: string): boolean {
    return url.match(/\.(mp4|ogg|webm)$/) != null;
  } 

  onImageSelected(image: Image): void {
    this.selectedImage = image;
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      console.log('Fichier sélectionné:', this.selectedFile);
    }
  }
}
