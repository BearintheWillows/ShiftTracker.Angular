import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRouteShopListComponent } from './daily-route-shop-list.component';

describe('DailyRouteShopListComponent', () => {
  let component: DailyRouteShopListComponent;
  let fixture: ComponentFixture<DailyRouteShopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyRouteShopListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyRouteShopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
