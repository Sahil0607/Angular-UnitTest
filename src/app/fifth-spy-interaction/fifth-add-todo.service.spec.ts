import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { FifthAddTodoService } from './fifth-add-todo.service';

describe('FifthAddTodoService', () => {
  let service: FifthAddTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientModule ],
    });
    service = TestBed.inject(FifthAddTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
