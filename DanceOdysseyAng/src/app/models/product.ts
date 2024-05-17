import { SubCategory } from 'src/app/models/subcategories_product';
import { ParentCategory } from './parentcategories_product';

export class Product {
  idProduct: number;
  productName: string;
  price: number;
  pointsPrice: number;
  description: string;
  productState: boolean;
  model: string;
  avreageScore:number;
  quantity: number;
  archived: boolean;
  datePublication: Date;
  isPromotion: boolean;
  pricePromotion: number;
  pourcentagePromotion: number;
  quantiteVendue: number;
  images: Image[];
  promotionEndDate: Date;   // Date de fin de la promotion

  ratingProductsP: RatingProduct[];
  parentCategory: ParentCategory;
  subCategories: SubCategory[];

  constructor(
    idProduct: number,
    productName: string,
    price: number,
    avreageScore:number,
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
    promotionEndDate: Date,   // Date de fin de la promotion

    images: Image[],
    ratingProductsP: RatingProduct[],
    parentCategory: ParentCategory,
    subCategories: SubCategory[] = []
  ) {
    this.idProduct = idProduct;
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
    this.parentCategory = parentCategory;
    this.subCategories = subCategories;
    this.promotionEndDate = promotionEndDate;
    this.avreageScore = avreageScore;

  }
}

export class RatingProduct {
  id: number;
  feedBack: string;
  score: number;

  constructor(id: number, feedBack: string, score: number) {
    this.id = id;
    this.feedBack = feedBack;
    this.score = score;
  }
}

export class Image {
  id: number;
  imageUrl: string;
  isSelected?: boolean;

  constructor(id: number, imageUrl: string) {
    this.id = id;
    this.imageUrl = imageUrl;
  }
}