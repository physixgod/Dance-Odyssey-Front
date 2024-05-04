import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentCategory, SubCategory } from './../../models/parentcategories_product';
import { ParentCategoryService } from './../../services/parentcategories.service';

@Component({
  selector: 'app-categorie-product',
  templateUrl: './categorie-product.component.html',
  styleUrls: ['./categorie-product.component.css']
})
export class CategorieProductComponent {
  category: ParentCategory = new ParentCategory(77, '', '', [], []); // Initialisez la catégorie parent
  newSubCategory: string = ''; // Variable pour stocker la nouvelle sous-catégorie temporairement
  subCategories: string[] = []; // Tableau pour stocker les sous-catégories ajoutées
  selectedFile: File | undefined; // Stocke le fichier sélectionné

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private parentCategoryService: ParentCategoryService,
  ) {}

  addCategoryWithImage() {
    // Ajoutez les sous-catégories au modèle de la catégorie parent
    this.category.subCategories = this.subCategories.map(subCategory => new SubCategory(0, subCategory));
  
    // Appelez le service pour ajouter la catégorie parent avec ses sous-catégories
    this.parentCategoryService.addParentCategory(this.category)
    
      .subscribe(
        (createdCategory: ParentCategory) => {
          // Vérifiez si un fichier a été sélectionné
          if (this.selectedFile) {
            // Appelez le service pour télécharger l'image associée à cette catégorie
            this.parentCategoryService.uploadImageToCategory(this.selectedFile, createdCategory.id)
              .subscribe(
                () => {
                  console.log('Image téléchargée avec succès');
                  // Traitez la réponse selon vos besoins
                },
                error => {
                  console.error('Erreur lors du téléchargement de l\'image :', error);
                  this.router.navigate(['/admin/list_Categories']);

                }
              );
          } else {
            console.log('Aucune image sélectionnée.');
            // Traitez la réponse selon vos besoins
          }
        },
        error => {
          console.error('Erreur lors de l\'ajout de la catégorie :', error);
          // Gérez l'erreur selon vos besoins
        }
      );
  }

  onFileSelected(event: any): void {
    // Assurez-vous de réinitialiser le tableau des fichiers sélectionnés
    this.selectedFile = event.target.files[0];
  }

  addSubCategory() {
    if (this.newSubCategory.trim() !== '') {
      this.subCategories.push(this.newSubCategory); 
      this.newSubCategory = ''; 
    }
  }
}
