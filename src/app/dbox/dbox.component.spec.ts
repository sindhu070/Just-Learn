import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DboxComponent } from './dbox.component';

describe('DboxComponent', () => {
  let component: DboxComponent;
  let fixture: ComponentFixture<DboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
