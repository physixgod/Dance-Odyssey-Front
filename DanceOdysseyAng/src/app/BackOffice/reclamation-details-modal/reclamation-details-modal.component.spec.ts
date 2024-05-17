import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationDetailsModalComponent } from './reclamation-details-modal.component';

describe('ReclamationDetailsModalComponent', () => {
  let component: ReclamationDetailsModalComponent;
  let fixture: ComponentFixture<ReclamationDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
