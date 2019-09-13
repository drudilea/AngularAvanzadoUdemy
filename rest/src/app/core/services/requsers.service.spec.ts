import { TestBed } from '@angular/core/testing';

import { RequsersService } from './requsers.service';

describe('RequsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequsersService = TestBed.get(RequsersService);
    expect(service).toBeTruthy();
  });
});
