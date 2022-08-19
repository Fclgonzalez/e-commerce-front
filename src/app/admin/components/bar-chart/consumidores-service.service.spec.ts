/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsumidoresServiceService } from './consumidores-service.service';

describe('Service: ConsumidoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsumidoresServiceService]
    });
  });

  it('should ...', inject([ConsumidoresServiceService], (service: ConsumidoresServiceService) => {
    expect(service).toBeTruthy();
  }));
});
