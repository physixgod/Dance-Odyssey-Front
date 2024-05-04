
export class Product {
  idProduct!: number;
  productName!: string;
  price!: number;
  pointsPrice!: number;
  description!: string;
  productState!: boolean;
  model!: string;
  avreageScore!:number;
  quantity!: number;
  archived!: boolean;
  datePublication!: Date;
  isPromotion!: boolean;
  pricePromotion!: number;
  pourcentagePromotion!: number;
  quantiteVendue!: number;

  promotionEndDate!: Date;   // Date de fin de la promotion
}

