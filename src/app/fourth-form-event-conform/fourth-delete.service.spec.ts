import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { FourthDeleteService } from './fourth-delete.service';

describe('FourthDeleteService', () => {
  let service: FourthDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientModule ]
    });
    service = TestBed.inject(FourthDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
