import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInlineEditComponent } from './teacher-inline-edit.component';

describe('TeacherInlineEditComponent', () => {
  let component: TeacherInlineEditComponent;
  let fixture: ComponentFixture<TeacherInlineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInlineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInlineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
