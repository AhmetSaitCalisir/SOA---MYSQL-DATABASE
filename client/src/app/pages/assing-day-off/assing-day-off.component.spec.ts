import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingDayOffComponent } from './assing-day-off.component';

describe('AssingDayOffComponent', () => {
  let component: AssingDayOffComponent;
  let fixture: ComponentFixture<AssingDayOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssingDayOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingDayOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
