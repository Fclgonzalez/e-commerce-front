import { TestBed } from '@angular/core/testing';

import { AdminLogadoGuard } from './admin-logado.guard';

describe('AdminLogadoGuard', () => {
  let guard: AdminLogadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminLogadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
