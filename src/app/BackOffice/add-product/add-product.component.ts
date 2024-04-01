import { ParentCategory ,SubCategory} from "src/app/models/parentcategories_product";
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { SubCategoryService } from 'src/app/services/subcategories.service';
import { ParentCategoryService } from 'src/app/services/parentcategories.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  selectedFiles: File[] = [];
  statusMessage: string | null = null;
  statusClass: string | null = null;
  categories: ParentCategory[] = [];
  selectedParentCategory: ParentCategory | null = null; // Variable pour stocker la catégorie parent sélectionnée
  subCategories: SubCategory[] = []; // Variable pour stocker les sous-catégories correspondant à la catégorie parent sélectionnée
  product: Product = {
    idProduct: 0,
    archived: false,
    refProduct: 0,
    productName: '',
    price: 0,
    images: [],
    datePublication: new Date(),
    pointsPrice: 0,
    description: '',
    productState: true,
    model: '',
    quantiteVendue: 0,
    pourcentagePromotion: 0,
    isPromotion: false, // Ajout de la propriété isPromotion
    pricePromotion: 0, // Ajout de la propriété prixPromotion
    quantity: 0,
    subCategories: [] = [], // Propriété pour stocker les sous-catégories associées au produit

    ratingProductsP: [],
    parentCategory: this.selectedParentCategory || { id: 0, type: '', subCategories: [], products: [] },

  };

    constructor(
      private http: HttpClient, // Injection du service HttpClient

    private productService: ProductService,
    private router: Router,
    private ParentCategory: ParentCategoryService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  
  }
  loadCategories(): void {
    this.ParentCategory. getAllParentCategoriesWithSubCategories().subscribe((categories: ParentCategory[]) => {
      this.categories = categories;
    });
  }
  onCategoryChange(): void {
    if (this.selectedParentCategory) {
      this.subCategories = this.selectedParentCategory.subCategories;
    } else {
      this.subCategories = []; 
    }
  }
  
  
  onFileSelected(event: any): void {
    this.selectedFiles = [];
  
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFiles.push(event.target.files[i]);
    }
  }

  addProduct() {
    if (this.selectedParentCategory && this.product) {
      this.product.parentCategory = this.selectedParentCategory;
      this.productService.addProductToParentCategory(this.selectedParentCategory.id, this.product).subscribe(
        (newProduct: Product) => {
          console.log('Product added successfully:', newProduct);
          if (this.selectedFiles.length > 0) {
            this.productService.addImagesToProduct(newProduct.idProduct, this.selectedFiles).subscribe(
              (result) => {
                console.log('Images added successfully:', result);
              },
              (error) => {
                console.error('Error adding images:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    
      this.router.navigate(['/admin/list-product']);
    } else {
      console.error('Selected parent category or product is null.');
    }
  }
}