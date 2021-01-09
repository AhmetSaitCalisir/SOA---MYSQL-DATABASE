import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingOperationComponent } from './assing-operation.component';

describe('AssingOperationComponent', () => {
  let component: AssingOperationComponent;
  let fixture: ComponentFixture<AssingOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssingOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
