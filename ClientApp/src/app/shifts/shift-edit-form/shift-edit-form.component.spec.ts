import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftEditReactiveComponent } from './shift-edit-reactive.component';

describe('ShiftEditReactiveComponent', () => {
  let component: ShiftEditReactiveComponent;
  let fixture: ComponentFixture<ShiftEditReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftEditReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftEditReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
