import { TestBed } from '@angular/core/testing';

import { AuthUserInterceptorService } from './auth-user-interceptor.service';

describe('AuthUserInterceptorService', () => {
  let service: AuthUserInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
