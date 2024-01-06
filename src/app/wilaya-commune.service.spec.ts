import { TestBed } from '@angular/core/testing';

import { WilayaCommuneService } from './wilaya-commune.service';

describe('WilayaCommuneService', () => {
  let service: WilayaCommuneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WilayaCommuneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
