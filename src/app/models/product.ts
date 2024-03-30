export class Product {
  idProduct!: number;
  refProduct!: number;
  productName!: string;
  price!: number;
  pointsPrice!: number;
  archived!: boolean;
  description!: string;
  productState!: boolean;
  model!: string;
  datePublication!: Date;
  quantity!: number;
  ratingProductsP: RatingProduct[] = [];
  categoriesProduct?: CategoriesProduct | null;
  images: Image[] = [];
  today!: string; // Ajoutez la propriété today
  isFlashSale: boolean; // Ajout de la propriété isFlashSale
  isPromotion: boolean; // Ajout de la propriété isPromotion
  prixPromotion: number; // Ajout de la propriété prixPromotion
  pourcentagePromotion: number; // Ajout de la propriété pourcentagePromotion

  constructor(options: {
    idProduct: number;
    refProduct: number;
    productName: string;
    price: number;
    pointsPrice: number;
    archived: boolean;
    description: string;
    productState: boolean;
    model: string;
    datePublication: Date;
    quantity: number;
    quantiteVendue: number;
    pourcentagePromotion: number;
    isFlashSale: boolean; // Ajout de la propriété isFlashSale
    isPromotion: boolean; // Ajout de la propriété isPromotion
    prixPromotion: number; // Ajout de la propriété prixPromotion
    ratingProductsP: RatingProduct[];
    categoriesProduct?: CategoriesProduct | null;
    images: Image[];

  }) {
    this.idProduct = options.idProduct;
    this.refProduct = options.refProduct;
    this.productName = options.productName;
    this.price = options.price;
    this.pointsPrice = options.pointsPrice;
    this.archived = options.archived;
    this.description = options.description;
    this.productState = options.productState;
    this.model = options.model;
    this.datePublication = options.datePublication;
    this.quantity = options.quantity;
    this.ratingProductsP = options.ratingProductsP;
    this.categoriesProduct = options.categoriesProduct || null;
    this.images = options.images;
    this.pourcentagePromotion = options.pourcentagePromotion; // Initialisation de la propriété pourcentagePromotion
    this.isFlashSale = options.isFlashSale; // Initialisation de la propriété isFlashSale
    this.isPromotion = options.isPromotion; // Initialisation de la propriété isPromotion
    this.prixPromotion = options.prixPromotion; // Initialisation de la propriété prixPromotion
  }
}

export class CategoriesProduct {
  idCategories?: number;
  type!: string;
  subCategories: CategoriesProduct[] = [];
  productsSS_C: Product[] = [];

  constructor(type: string, idCategories?: number) {
    this.type = type;
    this.idCategories = idCategories || undefined;
  }
}


export class RatingProduct {
  id!: number;
  feedback!: string;
  score!: number;
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
export class Catalogue {
  id!: number;
  nom!: string;
  description!: string;
  img!: string;
 }

