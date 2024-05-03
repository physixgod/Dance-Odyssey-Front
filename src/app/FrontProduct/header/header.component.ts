import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ParentCategory, SubCategory } from './../../models/parentcategories_product';
import { ParentCategoryService } from './../../services/parentcategories.service';
import { ProductService } from './../../services/product.service';
import { Product, Image } from 'src/app/models/product';
import { OrderLine } from 'src/app/models/orderLine';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() showSidebar = new EventEmitter<void>();
  parentCategories: ParentCategory[] = [];
  newSubCategoryType: string = '';
  selectedSubCategory: SubCategory | null = null;
  selectedParentCategory: ParentCategory | null | undefined = undefined;
  showNewSubCategoryInput: boolean = false;
  subCategoriesMap: Map<number, SubCategory[]> = new Map();
  errorMessage: string = '';
  searchTerm: string = ''; // Terme de recherche
  products: Product[] = [];
  orderLines: OrderLine[] = [];

  constructor(
    private parentCategoryService: ParentCategoryService,
    private productService: ProductService,private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.loadParentCategories();
    this.loadProducts(); // Appel de la fonction pour charger les produits
    this.fetchOrderLinesWithNullOrderId();


  }

  loadParentCategories(): void {
    this.parentCategoryService.getAllParentCategoriesWithSubCategories().subscribe(
      (categories: ParentCategory[]) => {
        this.parentCategories = categories;
      },
      (error) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des catégories parentes.';
        console.error('Error loading parent categories:', error);
      }
    );
  }

  onCategoryChange(event: any): void {
    const categoryId = event.target.value;
    if (categoryId !== null && categoryId !== '0') {
      this.selectedParentCategory = this.parentCategories.find(category => category.id === Number(categoryId));
      if (this.selectedParentCategory) {
        this.setDefaultSubCategories(this.selectedParentCategory.id);
      } else {
        console.error('Parent category not found for id:', categoryId);
      }
    } else {
      this.selectedParentCategory = null;
      this.subCategoriesMap.clear();
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
  setDefaultSubCategories(parentCategoryId: number): void {
    const subCategories = this.subCategoriesMap.get(parentCategoryId);
    if (subCategories) {
      this.selectedSubCategory = subCategories[0];
    }
  }
  loadProducts(): void {
    this.productService.showAllProducts().subscribe(products => {
      this.products = products.filter(product => !product.archived);
    });
  }
  searchProducts(): void {
    if (this.selectedParentCategory && this.searchTerm.trim() !== '') {
      // Appel de la méthode du service ProductService pour récupérer les produits
      this.productService.getProductsByParentCategoryAndProductName(this.selectedParentCategory.id, this.searchTerm.trim())
        .subscribe(products => {
          // Affichage des produits récupérés
          console.log(products);
          // Vous pouvez faire quelque chose avec les produits ici, comme les afficher dans une liste sur la page
        }, error => {
          console.error('Error searching products:', error);
        });
    }
  }
}
