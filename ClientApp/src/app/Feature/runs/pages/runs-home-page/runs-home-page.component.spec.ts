import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunsHomePageComponent } from './runs-home-page.component';

describe('RunsHomePageComponent', () => {
  let component: RunsHomePageComponent;
  let fixture: ComponentFixture<RunsHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunsHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunsHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
