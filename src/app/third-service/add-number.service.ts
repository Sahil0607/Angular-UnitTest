import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddNumberService {

  constructor() { }

  addNumber(a, b) {
    return a + b;
  }
}
