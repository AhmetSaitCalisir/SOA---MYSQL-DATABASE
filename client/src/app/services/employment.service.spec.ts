import { TestBed } from '@angular/core/testing';

import { EmploymentService } from './employment.service';

describe('EmploymentService', () => {
  let service: EmploymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
