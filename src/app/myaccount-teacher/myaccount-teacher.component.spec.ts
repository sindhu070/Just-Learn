import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountTeacherComponent } from './myaccount-teacher.component';

describe('MyaccountTeacherComponent', () => {
  let component: MyaccountTeacherComponent;
  let fixture: ComponentFixture<MyaccountTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaccountTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
