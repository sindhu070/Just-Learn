import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherWelcomeComponent } from './teacher-welcome.component';

describe('TeacherWelcomeComponent', () => {
  let component: TeacherWelcomeComponent;
  let fixture: ComponentFixture<TeacherWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
