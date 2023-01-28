import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftTableRowComponent } from './shift-table-row.component';

describe('ShiftTableRowComponent', () => {
  let component: ShiftTableRowComponent;
  let fixture: ComponentFixture<ShiftTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftTableRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
