// subcategories_product.ts
import { ParentCategory } from './parentcategories_product';

export class SubCategory {
    constructor(
      public id: number,
      public type: string,
      public parentCategory: ParentCategory // Assurez-vous que ParentCategory est correctement importé
    ) {}
  }
  
