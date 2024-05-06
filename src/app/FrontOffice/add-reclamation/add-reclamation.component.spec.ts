import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReclamtionComponent } from './add-reclamation.component';

describe('AddReclamtionComponent', () => {
  let component: AddReclamtionComponent;
  let fixture: ComponentFixture<AddReclamtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReclamtionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReclamtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
