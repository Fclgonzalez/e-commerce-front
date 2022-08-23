/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActuatorService } from './actuator.service';

describe('Service: Actuator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActuatorService]
    });
  });

  it('should ...', inject([ActuatorService], (service: ActuatorService) => {
    expect(service).toBeTruthy();
  }));
});
