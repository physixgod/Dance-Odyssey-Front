import { ParentCategory } from './parentcategories_product'; // Importer la classe ParentCategory depuis son module
import { Product } from './product'; // Importer la classe Product depuis son module

export class SubCategory {
  constructor(
    public id: number,
    public type: string,
    public parentCategory: ParentCategory // Assurez-vous que ParentCategory est correctement importé
  ) {}
}

export class SubCategoryWithProducts {
  constructor(
    public id: number,
    public type: string,
    public parentCategory: ParentCategory[],
    public products: Product[]
  ) {}
}
