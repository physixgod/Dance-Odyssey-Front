import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ParentCategory,SubCategory } from './../../models/parentcategories_product';
import { ParentCategoryService } from './../../services/parentcategories.service';
import { SubCategoryService } from 'src/app/services/subcategories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  parentCategories: ParentCategory[] = [];
  newSubCategoryType: string = '';
  selectedSubCategory: SubCategory | null = null;
  selectedParentCategory: ParentCategory | null = null; // Garder une référence à la catégorie parent sélectionnée
  showNewSubCategoryInput: boolean = false;

  

  errorMessage: string = '';

  constructor(  private parentCategoryService: ParentCategoryService,
  ) { }

  ngOnInit(): void {
  }




}