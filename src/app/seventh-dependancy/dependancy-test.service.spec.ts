import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DependancyTestService } from './dependancy-test.service';

xdescribe('DependancyTestService', () => {
  let service: DependancyTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
    });
    service = TestBed.inject(DependancyTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
