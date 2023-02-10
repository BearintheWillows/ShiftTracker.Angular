import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormShiftComponent } from './create-form-shift.component';

describe('CreateFormShiftComponent', () => {
  let component: CreateFormShiftComponent;
  let fixture: ComponentFixture<CreateFormShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFormShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
