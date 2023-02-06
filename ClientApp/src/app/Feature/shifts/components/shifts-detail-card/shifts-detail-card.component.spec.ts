import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCardShiftComponent } from './detail-card-shift.component';

describe('DetailCardShiftComponent', () => {
  let component: DetailCardShiftComponent;
  let fixture: ComponentFixture<DetailCardShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCardShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCardShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
