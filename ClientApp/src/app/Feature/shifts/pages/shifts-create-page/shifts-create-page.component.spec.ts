import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsCreatePageComponent } from './shifts-create-page.component';

describe('ShiftsCreatePageComponent', () => {
  let component: ShiftsCreatePageComponent;
  let fixture: ComponentFixture<ShiftsCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
