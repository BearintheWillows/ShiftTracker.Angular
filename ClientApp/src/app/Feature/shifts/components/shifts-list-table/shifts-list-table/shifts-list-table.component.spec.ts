import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsListTableComponent } from './shifts-list-table.component';

describe('ShiftsListTableComponent', () => {
  let component: ShiftsListTableComponent;
  let fixture: ComponentFixture<ShiftsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
