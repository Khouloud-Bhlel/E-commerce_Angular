import { TestBed } from '@angular/core/testing';

import { ScategoriesService } from './scategories.service';

describe('ScategoriesService', () => {
  let service: ScategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
