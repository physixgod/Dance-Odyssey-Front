import {SubCategory} from "src/app/models/subcategories_product"
import { ParentCategory } from "./parentcategories_product";
export class Product {
  idProduct: number; 
  refProduct: number; 
  productName: string; 
  price: number; 
  pointsPrice: number; 
  description: string; 
  productState: boolean; 
  model: string; 
  quantity: number; 
  archived: boolean; 
  datePublication: Date; 
  isPromotion: boolean; 
  pricePromotion: number; 
  pourcentagePromotion: number; 
  quantiteVendue: number; 
  images: Image[]; 
  ratingProductsP: RatingProduct[]; 
  parentCategory: ParentCategory; // Ajoutez cette propriété pour la relation avec ParentCategory
  subCategories: SubCategory[] = []; // Propriété pour stocker les sous-catégories associées au produit

  constructor(
    idProduct: number,
    refProduct: number,
    productName: string,
    price: number,
    pointsPrice: number,
    description: string,
    productState: boolean,
    model: string,
    quantity: number,
    archived: boolean,
    datePublication: Date,
    isPromotion: boolean,
    pricePromotion: number,
    pourcentagePromotion: number,
    quantiteVendue: number,
    images: Image[],
    ratingProductsP: RatingProduct[],
    parentCategory: ParentCategory // Ajoutez ce paramètre dans le constructeur
  ) {
    this.idProduct = idProduct;
    this.refProduct = refProduct;
    this.productName = productName;
    this.price = price;
    this.pointsPrice = pointsPrice;
    this.description = description;
    this.productState = productState;
    this.model = model;
    this.quantity = quantity;
    this.archived = archived;
    this.datePublication = datePublication;
    this.isPromotion = isPromotion;
    this.pricePromotion = pricePromotion;
    this.pourcentagePromotion = pourcentagePromotion;
    this.quantiteVendue = quantiteVendue;
    this.images = images;
    this.ratingProductsP = ratingProductsP;
    this.parentCategory = parentCategory; // Initialisez la propriété parentCategory
  }
}


export class RatingProduct {
  id: number;
  feedback: string;
  score: number;

  constructor(id: number, feedback: string, score: number) {
    this.id = id;
    this.feedback = feedback;
    this.score = score;
  }
}

export class Image {
  id!: number;
  imageUrl!: string;
  isSelected?: boolean;

  constructor(id: number, imageUrl: string) {
    this.id = id;
    this.imageUrl = imageUrl;
   
  }

}







