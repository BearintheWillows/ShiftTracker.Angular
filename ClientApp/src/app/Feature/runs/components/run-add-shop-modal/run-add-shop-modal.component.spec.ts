import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAddShopModalComponent } from './run-add-shop-modal.component';

describe('RunAddShopModalComponent', () => {
  let component: RunAddShopModalComponent;
  let fixture: ComponentFixture<RunAddShopModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunAddShopModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunAddShopModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
