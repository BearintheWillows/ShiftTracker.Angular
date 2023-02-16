import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRouteListComponent } from './daily-route-list.component';

describe('DailyRouteListComponent', () => {
  let component: DailyRouteListComponent;
  let fixture: ComponentFixture<DailyRouteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyRouteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyRouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
