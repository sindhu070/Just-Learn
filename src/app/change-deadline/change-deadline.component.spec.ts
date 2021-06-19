import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDeadlineComponent } from './change-deadline.component';

describe('ChangeDeadlineComponent', () => {
  let component: ChangeDeadlineComponent;
  let fixture: ComponentFixture<ChangeDeadlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDeadlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
