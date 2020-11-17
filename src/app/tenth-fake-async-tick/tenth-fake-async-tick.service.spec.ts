import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TenthFakeAsyncTickService } from './tenth-fake-async-tick.service';

describe('TenthFakeAsyncTickService', () => {
  let service: TenthFakeAsyncTickService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(TenthFakeAsyncTickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
