import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product, Image } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.css']
})
export class HomeProductComponent implements OnInit {
  @Input() product: Product | undefined;
  last5Products: Product[] = [];
  PromotionalProducts: Product[] = [];
  topRatingProducts: Product[] = [];
  products: Product[] = [];
  selectedProductId: number = 0;
  images: Image[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadLast5Products();
    this.loadTopRatingProducts();
    this.loadPromotionalProducts();
  }

  loadLast5Products(): void {
    this.productService.getLast5Products().subscribe(
      (data: Product[]) => {
        this.last5Products = this.filterArchivedProducts(data);
      },
      (error) => {
        console.error('Error loading last 5 products:', error);
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
      },
      (error) => {
        console.error('Error loading top rating products:', error);
      }
    );
  }

  filterArchivedProducts(products: Product[]): Product[] {
    return products.filter(product => !product.archived);
  }

  onSelectProduct(productId: number): void {
    this.selectedProductId = productId;
    this.loadImagesForProduct(productId);
  }

  loadImagesForProduct(productId: number): void {
    this.productService.getImagesForProduct(productId).subscribe(images => {
      this.images = images;
    });
  }

}
