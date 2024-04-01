import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentCategory,SubCategory } from './../../models/parentcategories_product';
import { ParentCategoryService } from './../../services/parentcategories.service';

@Component({
  selector: 'app-categorie-product',
  templateUrl: './categorie-product.component.html',
  styleUrls: ['./categorie-product.component.css']
})
export class CategorieProductComponent {
  category: ParentCategory = new ParentCategory(0, '', [], []); // Initialisez la catégorie parent
  newSubCategory: string = ''; // Variable pour stocker la nouvelle sous-catégorie temporairement
  subCategories: string[] = []; // Tableau pour stocker les sous-catégories ajoutées

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private parentCategoryService: ParentCategoryService,
  ) {}

  createCategoryWithSubcategories() {
    // Ajoutez les sous-catégories au modèle de la catégorie parent
    this.category.subCategories = this.subCategories.map(subCategory => new SubCategory(0, subCategory));

    // Utilisez la méthode du service pour créer la catégorie avec les sous-catégories
    this.parentCategoryService.addParentCategory(this.category)
      .subscribe(
        data => {
          console.log('Catégorie ajoutée avec succès :', data);
          // Traitez la réponse selon vos besoins
          this.router.navigate(['/admin/list_Categories']);
        },
        error => {
          console.error('Erreur lors de l\'ajout de la catégorie :', error);
          // Gérez l'erreur selon vos besoins
        }
      );
  }

  addSubCategory() {
    if (this.newSubCategory.trim() !== '') {
      this.subCategories.push(this.newSubCategory); 
      this.newSubCategory = ''; 
    }
  }
}
