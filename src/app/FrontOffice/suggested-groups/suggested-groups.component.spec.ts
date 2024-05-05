import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedGroupsComponent } from './suggested-groups.component';

describe('SuggestedGroupsComponent', () => {
  let component: SuggestedGroupsComponent;
  let fixture: ComponentFixture<SuggestedGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
