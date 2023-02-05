import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormShiftComponent } from './edit-form-shift.component';

describe('EditFormShiftComponent', () => {
  let component: EditFormShiftComponent;
  let fixture: ComponentFixture<EditFormShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
