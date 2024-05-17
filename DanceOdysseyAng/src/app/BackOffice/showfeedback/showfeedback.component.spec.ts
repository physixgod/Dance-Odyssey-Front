import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowfeedbackComponent } from './showfeedback.component';

describe('ShowfeedbackComponent', () => {
  let component: ShowfeedbackComponent;
  let fixture: ComponentFixture<ShowfeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowfeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
