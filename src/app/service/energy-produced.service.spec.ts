import { TestBed } from '@angular/core/testing';

import { EnergyProducedService } from './energy-produced.service';

describe('EnergyProducedService', () => {
  let service: EnergyProducedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnergyProducedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
