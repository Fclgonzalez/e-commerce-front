import { TestBed } from '@angular/core/testing';

import { VisitaService } from './visita.service';

describe('VisitaService', () => {
  let service: VisitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
