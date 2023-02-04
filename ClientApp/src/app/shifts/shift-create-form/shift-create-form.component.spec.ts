import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftCreateFormComponent } from './shift-create-form.component';

describe('ShiftCreateFormComponent', () => {
  let component: ShiftCreateFormComponent;
  let fixture: ComponentFixture<ShiftCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftCreateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
