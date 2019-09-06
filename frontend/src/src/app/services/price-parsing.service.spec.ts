import { TestBed } from '@angular/core/testing';

import { PriceParsingService } from './price-parsing.service';

describe('PriceParsingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceParsingService = TestBed.get(PriceParsingService);
    expect(service).toBeTruthy();
  });
});
