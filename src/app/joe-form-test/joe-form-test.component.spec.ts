import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { JoeFormTestComponent } from './joe-form-test.component';
import { LoanApprovalInfo, LoanApprovalService } from './service/loan-approval.service';

describe('JoeFormTestComponent', () => {
  let component: JoeFormTestComponent;
  let fixture: ComponentFixture<JoeFormTestComponent>;
  let loanApprovalService: LoanApprovalService;

  const loanApprovalServiceStub: Partial<LoanApprovalService> = {
    getLoanApproval(name: string, amount: number): Observable<LoanApprovalInfo> {
      return of({name, amount, isApproved: amount < 5000}).pipe(delay(1000));
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoeFormTestComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [{ provide: LoanApprovalService, useValue: loanApprovalServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoeFormTestComponent);
    component = fixture.componentInstance;
    loanApprovalService = TestBed.inject(LoanApprovalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add title in h1 element', () => {
    component.title = 'sahil-app';
    const tag = fixture.debugElement.query(By.css('h1'));
    fixture.detectChanges();
    expect(tag.nativeElement.textContent).toContain('sahil-app');
  });

  it('should have a name field, loanAmountField, and submit button', () => {
    const nameInput = fixture.debugElement.query(By.css('input[name = "name"]'));
    const loanAmountInput = fixture.debugElement.query(By.css('input[name = "loanAmount"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type = "submit"]'));

    expect(nameInput).toBeTruthy();
    expect(loanAmountInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });
});
