import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAnnulationComponent } from './liste-annulation.component';

describe('ListeAnnulationComponent', () => {
  let component: ListeAnnulationComponent;
  let fixture: ComponentFixture<ListeAnnulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAnnulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAnnulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
