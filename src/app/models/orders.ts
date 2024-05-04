import { Cart } from "./cart";
import { Product } from "./product";

export class Orders {
    constructor(
        public ordersId: number,
        public ordersDate: Date,
        public buyer_email: string,
        public buyer_address: string,
        public tax: number,
        public totalPriceOders: number,
        public currency: string,
        public etat: Etat,
        public payment_mode: PaymentMode,
        public cartO: Cart,
        public products: Product[] // Ajout de la propriété products
    ) {}
}

export enum Etat {
  WAITING = 'WAITING',
  EDITABLE = 'EDITABLE',
  VALIDATED = 'VALIDATED',
  REFUSED = 'REFUSED'
}

export enum PaymentMode {
  TRANSFER = 'TRANSFER',
  CASH = 'CASH'
}
