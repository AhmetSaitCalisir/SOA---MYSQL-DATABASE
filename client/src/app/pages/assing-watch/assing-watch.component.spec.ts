import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingWatchComponent } from './assing-watch.component';

describe('AssingWatchComponent', () => {
  let component: AssingWatchComponent;
  let fixture: ComponentFixture<AssingWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssingWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
