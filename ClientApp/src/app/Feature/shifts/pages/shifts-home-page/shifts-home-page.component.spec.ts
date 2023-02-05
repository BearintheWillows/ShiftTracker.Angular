import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsHomePageComponent } from './shifts-home-page.component';

describe('ShiftsHomePageComponent', () => {
  let component: ShiftsHomePageComponent;
  let fixture: ComponentFixture<ShiftsHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
