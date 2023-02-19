import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSelectionModealComponent } from './shop-selection-modeal.component';

describe('ShopSelectionModealComponent', () => {
  let component: ShopSelectionModealComponent;
  let fixture: ComponentFixture<ShopSelectionModealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopSelectionModealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopSelectionModealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
