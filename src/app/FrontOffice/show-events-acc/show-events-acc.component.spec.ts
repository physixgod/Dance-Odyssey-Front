import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEventsAccComponent } from './show-events-acc.component';

describe('ShowEventsAccComponent', () => {
  let component: ShowEventsAccComponent;
  let fixture: ComponentFixture<ShowEventsAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEventsAccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowEventsAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
