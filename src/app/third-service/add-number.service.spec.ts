import { TestBed } from '@angular/core/testing';

import { AddNumberService } from './add-number.service';

describe('AddNumberService', () => {
  let service: AddNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create function in service', () => {
    expect(service.addNumber).toBeTruthy();
  });

  it('Should add two number', () => {
    expect(service.addNumber(1, 2)).toBe(3);
  });
});
