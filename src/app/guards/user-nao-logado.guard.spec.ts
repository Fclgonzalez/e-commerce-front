import { TestBed } from '@angular/core/testing';

import { UserNaoLogadoGuard } from './user-nao-logado.guard';

describe('UserNaoLogadoGuard', () => {
  let guard: UserNaoLogadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserNaoLogadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
