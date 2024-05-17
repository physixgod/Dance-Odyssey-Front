import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantScoreComponent } from './participant-score.component';

describe('ParticipantScoreComponent', () => {
  let component: ParticipantScoreComponent;
  let fixture: ComponentFixture<ParticipantScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
