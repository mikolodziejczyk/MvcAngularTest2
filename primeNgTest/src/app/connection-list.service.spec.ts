import { TestBed, inject } from '@angular/core/testing';

import { ConnectionListService } from './connection-list.service';

describe('ConnectionListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionListService]
    });
  });

  it('should be created', inject([ConnectionListService], (service: ConnectionListService) => {
    expect(service).toBeTruthy();
  }));
});
