import { OrderLine } from './orderLine';
import { Orders } from './orders';

export class Cart {
  id: number; 
  totPrice: number ; 

  orderList: OrderLine[] = [];
  ordersList: Orders[] = []; 
  
  constructor(
    id: number,
    totPrice: number,
    orderList: OrderLine[] = [], 
    ordersList: Orders[] = [], 

    )
    
    
    { this.id = id;
      this.totPrice = totPrice;

      this.orderList = orderList;
      this.ordersList = ordersList;

    }
  }