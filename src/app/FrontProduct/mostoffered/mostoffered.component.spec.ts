import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostofferedComponent } from './mostoffered.component';

describe('MostofferedComponent', () => {
  let component: MostofferedComponent;
  let fixture: ComponentFixture<MostofferedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostofferedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostofferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
