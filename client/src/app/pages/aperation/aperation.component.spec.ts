import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperationComponent } from './aperation.component';

describe('AperationComponent', () => {
  let component: AperationComponent;
  let fixture: ComponentFixture<AperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
