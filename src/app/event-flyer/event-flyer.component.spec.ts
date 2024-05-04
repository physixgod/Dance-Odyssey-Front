import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFlyerComponent } from './event-flyer.component';

describe('EventFlyerComponent', () => {
  let component: EventFlyerComponent;
  let fixture: ComponentFixture<EventFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFlyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
