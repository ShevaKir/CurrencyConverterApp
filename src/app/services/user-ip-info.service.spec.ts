import { TestBed } from '@angular/core/testing';

import { UserIpInfoService } from './user-ip-info.service';

describe('UserIpInfoService', () => {
  let service: UserIpInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIpInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
