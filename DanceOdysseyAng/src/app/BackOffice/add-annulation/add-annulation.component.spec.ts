import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnnulationComponent } from './add-annulation.component';

describe('AddAnnulationComponent', () => {
  let component: AddAnnulationComponent;
  let fixture: ComponentFixture<AddAnnulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnnulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnnulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
