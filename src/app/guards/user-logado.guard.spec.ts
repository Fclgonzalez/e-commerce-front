import { TestBed } from '@angular/core/testing';

import { UserLogadoGuard } from './user-logado.guard';

describe('UserLogadoGuard', () => {
  let guard: UserLogadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserLogadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
