import { TestBed } from '@angular/core/testing';

import { ImageDaemonService } from './image-daemon.service';

describe('ImageDaemonService', () => {
  let service: ImageDaemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageDaemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
