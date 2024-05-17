import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCourseComponent } from './app/FrontOffice/AddCourseComponent'; // Chemin relatif correctement formaté


// Le reste du code du test...


describe('AddCourseComponent', () => { // Correct le nom du composant dans la description
  let component: AddCourseComponent; // Correct le nom du composant
  let fixture: ComponentFixture<AddCourseComponent>; // Correct le nom du composant

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseComponent ] // Correct le nom du composant
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseComponent); // Correct le nom du composant
    component = fixture.componentInstance; // Correct le nom du composant
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
