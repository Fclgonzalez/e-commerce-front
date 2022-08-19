/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisitaService } from './visita.service';

describe('Service: Visita', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitaService]
    });
  });

  it('should ...', inject([VisitaService], (service: VisitaService) => {
    expect(service).toBeTruthy();
  }));
});
