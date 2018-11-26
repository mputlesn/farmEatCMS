import { TestBed, inject } from '@angular/core/testing';

import { FarmEatService } from './farm-eat.service';

describe('FarmEatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmEatService]
    });
  });

  it('should be created', inject([FarmEatService], (service: FarmEatService) => {
    expect(service).toBeTruthy();
  }));
});
