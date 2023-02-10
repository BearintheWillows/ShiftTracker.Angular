import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsEditPageComponent } from './shifts-edit-page.component';

describe('ShiftsEditPageComponent', () => {
  let component: ShiftsEditPageComponent;
  let fixture: ComponentFixture<ShiftsEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
