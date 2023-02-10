import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsDetailPageComponent } from './shifts-detail-page.component';

describe('ShiftsDetailPageComponent', () => {
  let component: ShiftsDetailPageComponent;
  let fixture: ComponentFixture<ShiftsDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
