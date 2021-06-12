import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMarksStudentComponent } from './show-marks-student.component';

describe('ShowMarksStudentComponent', () => {
  let component: ShowMarksStudentComponent;
  let fixture: ComponentFixture<ShowMarksStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMarksStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMarksStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
