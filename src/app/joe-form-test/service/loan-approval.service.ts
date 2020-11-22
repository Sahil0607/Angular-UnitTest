import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface LoanApprovalInfo {
  name: string;
  amount: number;
  isApproved: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoanApprovalService {
  constructor() { }

  getLoanApproval(name: string, amount: number) {
    const isApproved = amount < 5000;
    const response: LoanApprovalInfo = { name, amount, isApproved };
    return of(response).pipe(delay(1000));
  }
}
