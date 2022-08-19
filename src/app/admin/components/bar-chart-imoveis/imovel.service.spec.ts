/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImovelService } from './imovel.service';

describe('Service: Imovel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImovelService]
    });
  });

  it('should ...', inject([ImovelService], (service: ImovelService) => {
    expect(service).toBeTruthy();
  }));
});
