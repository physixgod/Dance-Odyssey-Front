import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockGameComponent } from './rock-game.component';

describe('RockGameComponent', () => {
  let component: RockGameComponent;
  let fixture: ComponentFixture<RockGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RockGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RockGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
