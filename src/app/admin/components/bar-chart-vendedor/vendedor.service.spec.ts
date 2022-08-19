/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VendedorService } from './vendedor.service';

describe('Service: Vendedor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendedorService]
    });
  });

  it('should ...', inject([VendedorService], (service: VendedorService) => {
    expect(service).toBeTruthy();
  }));
});
