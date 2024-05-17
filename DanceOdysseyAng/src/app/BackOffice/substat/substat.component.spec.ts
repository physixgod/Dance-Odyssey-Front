import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstatComponent } from './substat.component';

describe('SubstatComponent', () => {
  let component: SubstatComponent;
  let fixture: ComponentFixture<SubstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
