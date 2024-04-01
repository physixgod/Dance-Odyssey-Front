
import { Product } from 'src/app/models/product'; // Importing Product class from its module

export class ParentCategory {
    constructor(
      public id: number,
      public type: string,
      public subCategories: SubCategory[],
      public products: Product[]
    ) {
      this.id = id;
      this.type = type;
      this.subCategories = subCategories;
      this.products = products;
    }
  }
  
  export class SubCategory {
    constructor(
      public id: number,
      public type: string
    ) {
      this.id = id;
      this.type = type;
    }
  }
  