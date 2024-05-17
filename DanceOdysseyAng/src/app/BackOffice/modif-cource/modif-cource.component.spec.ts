import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifCourceComponent } from './modif-cource.component';

describe('ModifCourceComponent', () => {
  let component: ModifCourceComponent;
  let fixture: ComponentFixture<ModifCourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifCourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifCourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
