import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunCreateModalComponent } from './run-create-modal.component';

describe('RunCreateModalComponent', () => {
  let component: RunCreateModalComponent;
  let fixture: ComponentFixture<RunCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
