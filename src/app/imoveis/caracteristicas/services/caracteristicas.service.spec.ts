import { TestBed } from '@angular/core/testing';

import { CaracteristicasService } from './caracteristicas.service';

describe('CaracteristicasService', () => {
  let service: CaracteristicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaracteristicasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
