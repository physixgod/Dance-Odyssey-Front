import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationetfeedbackComponent } from './reclamationetfeedback.component';

describe('ReclamationetfeedbackComponent', () => {
  let component: ReclamationetfeedbackComponent;
  let fixture: ComponentFixture<ReclamationetfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationetfeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationetfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
