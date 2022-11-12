import { TestBed } from '@angular/core/testing';

import { MainChannelUtilService } from './main-channel-util.service';

describe('MainChannelUtilService', () => {
  let service: MainChannelUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainChannelUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
