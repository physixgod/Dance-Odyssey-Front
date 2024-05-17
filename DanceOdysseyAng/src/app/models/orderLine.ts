import { Cart } from "./cart";
import { Orders } from "./orders";
import { Product } from "./product";

export class OrderLine {
  orderId: number | null; // Modifier orderId pour accepter null si nécessaire
  totalPrice: number;
  orderDate: Date;
  description: string;
  nbProdO: number;
  cart: Cart;
  detailPrice:number;
  imgUrl:string;
  product: Product;
  order: Orders;

  constructor(
    orderId: number | null, // Modifier le constructeur en conséquence
    totalPrice: number,
    orderDate: Date,
    description: string,
    nbProdO: number,
    cart: Cart,
    detailPrice:number,
    imgUrl:string,

    product: Product,
    order: Orders
  ) {
    this.orderId = orderId;
    this.totalPrice = detailPrice * nbProdO; // Calcul du total en multipliant le prix unitaire par le nombre de produits
    this.orderDate = orderDate;
    this.description = description;
    this.nbProdO = nbProdO;
    this.cart = cart;
    this.detailPrice = detailPrice;
    this.imgUrl = imgUrl;

    this.product = product;
    this.order = order;
  }
}
