import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunDetalsComponent } from './run-detals.component';

describe('RunDetalsComponent', () => {
  let component: RunDetalsComponent;
  let fixture: ComponentFixture<RunDetalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunDetalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunDetalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
