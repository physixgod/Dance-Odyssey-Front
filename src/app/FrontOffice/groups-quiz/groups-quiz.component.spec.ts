import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsQuizComponent } from './groups-quiz.component';

describe('GroupsQuizComponent', () => {
  let component: GroupsQuizComponent;
  let fixture: ComponentFixture<GroupsQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupsQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
