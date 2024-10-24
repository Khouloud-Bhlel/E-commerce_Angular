import { TestBed } from '@angular/core/testing';

import { EcommService } from './ecomm.service';

describe('EcommService', () => {
  let service: EcommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
