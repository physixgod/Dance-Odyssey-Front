import { Component, OnInit } from '@angular/core';
import { ParentCategory,SubCategory } from './../../models/parentcategories_product';
import { ParentCategoryService } from 'src/app/services/parentcategories.service';
import { SubCategoryService } from 'src/app/services/subcategories.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  parentCategories: ParentCategory[] = [];
  newSubCategoryType: string = '';
  selectedSubCategory: SubCategory | null = null;
  selectedParentCategory: ParentCategory | null = null; // Garder une référence à la catégorie parent sélectionnée
  showNewSubCategoryInput: boolean = false;

  constructor(
    private parentCategoryService: ParentCategoryService,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit(): void {
    this.parentCategoryService.getAllParentCategoriesWithSubCategories()
      .subscribe(
        (data: ParentCategory[]) => {
          this.parentCategories = data;
        },
        (error) => {
          console.error('Error fetching parent categories:', error);
        }
      );
  }

  selectSubCategory(subCategory: SubCategory): void {
    this.selectedSubCategory = subCategory;
  }

  addSubCategory(category: ParentCategory): void {
    if (this.newSubCategoryType.trim() === '') {
      console.error('New subcategory type is required.');
      return;
    }

    const newSubCategory: SubCategory = new SubCategory(0, this.newSubCategoryType);

    this.subCategoryService.addSubCategoryToParent(category.id, newSubCategory)
      .subscribe(
        (data: SubCategory) => {
          category.subCategories.push(data);
          this.newSubCategoryType = '';
        },
        (error) => {
          console.error('Error adding subcategory to parent category:', error);
        }
      );
  }

  deleteSubCategory(category: ParentCategory): void {
    if (!this.selectedSubCategory) {
      console.error('No subcategory selected.');
      return;
    }

    this.subCategoryService.deleteSubCategoryByParentCategoryId(category.id, this.selectedSubCategory.id)
      .subscribe(
        () => {
          category.subCategories = category.subCategories.filter(item => item.id !== this.selectedSubCategory!.id);
          this.selectedSubCategory = null;
        },
        (error) => {
          console.error('Error deleting subcategory from parent category:', error);
        }
      );
  }

  toggleNewSubCategoryInput(category: ParentCategory): void { // Passer la catégorie parent sélectionnée comme argument
    this.selectedParentCategory = category; // Mettre à jour la catégorie parent sélectionnée
    this.showNewSubCategoryInput = !this.showNewSubCategoryInput;
  }
}