import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ParentCategoryService } from 'src/app/services/parentcategories.service';
import { HttpClient } from '@angular/common/http';
import { ParentCategory, SubCategory } from 'src/app/models/parentcategories_product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  selectedFiles: File[] = [];  selectedVideoFile: File | null = null;
  statusMessage: string | null = null;
  statusClass: string | null = null;
  categories: ParentCategory[] = [];
  selectedParentCategory: ParentCategory | null = null;
  subCategories: SubCategory[] = [];
  product: Product = {
    idProduct: 0,
    archived: false,
    productName: '',
    price: 0,
    images: [],
    datePublication: new Date(),
    pointsPrice: 0,
    description: '',
    productState: true,
    model: '',
    avreageScore:0,
    quantiteVendue: 0,
    pourcentagePromotion: 0,
    isPromotion: false,
    pricePromotion: 0,
    quantity: 0,
    promotionEndDate: new Date(),
    subCategories: [],
    ratingProductsP: [],
    parentCategory: { id: 0, type: '', imgUrl:'',subCategories: [], products: [] },
  };

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router,
    private parentCategoryService: ParentCategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.parentCategoryService.getAllParentCategoriesWithSubCategories().subscribe((categories: ParentCategory[]) => {
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

  addProduct(): void {
    if (this.selectedParentCategory && this.selectedParentCategory.id && this.product && this.product.subCategories.length > 0) {
      this.product.parentCategory = this.selectedParentCategory;
      const subCategoryId = this.product.subCategories[0].id;
      this.router.navigate(['/admin/list-product']);
      
      this.productService.addProduct(this.selectedParentCategory.id, subCategoryId, this.product).subscribe(
        (newProduct: Product) => {
          console.log('Product added successfully:', newProduct);
          if (this.selectedFiles.length > 0) {
            this.productService.addImagesToProduct(newProduct.idProduct, this.selectedFiles).subscribe(
              (result) => {      
                    this.router.navigate(['/admin/list-product']);

                console.log('Images added successfully:', result);
              },
              (error) => {
                console.error('Error adding images:', error);
                this.router.navigate(['/admin/list-product']);
              }
            );
          }
         
        },
        (error) => {
          console.error('Error adding product:', error);
          this.router.navigate(['/admin/list-product']);
        }
      );
    } else {
      console.error('Selected parent category, product or subcategory is null.');
      this.router.navigate(['/admin/list-product']);
    }
  }
}
