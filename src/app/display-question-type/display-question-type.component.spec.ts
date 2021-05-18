import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQuestionTypeComponent } from './display-question-type.component';

describe('DisplayQuestionTypeComponent', () => {
  let component: DisplayQuestionTypeComponent;
  let fixture: ComponentFixture<DisplayQuestionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayQuestionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayQuestionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
