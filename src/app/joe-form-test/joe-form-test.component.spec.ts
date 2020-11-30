import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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
      providers: [
        { provide: LoanApprovalService, useValue: loanApprovalServiceStub },
      ]
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

  it('should show error on blur of each input when left blank', () => {
    // input element
    const nameInput = fixture.debugElement.query(By.css('input[name = "name"]'));
    const loanAmountInput = fixture.debugElement.query(By.css('input[name = "loanAmount"]'));

    // error input element
    const nameInputError = () => fixture.debugElement.query(By.css('input[name = "name"] + .error'));
    const loanAmountInputError = () => fixture.debugElement.query(By.css('input[name = "loanAmount"] + .error'));

    // should not show error input until after input in touched
    expect(nameInputError()).toBeFalsy();

    loanAmountInput.triggerEventHandler('blur', null);
    fixture.detectChanges();
    expect(loanAmountInputError().nativeElement.textContent).toContain('amount required');
  });

  it('should hide error once input has become valid', () => {
    // input element
    const nameInput = fixture.debugElement.query(By.css('input[name = "name"]'));
    const loanAmountInput = fixture.debugElement.query(By.css('input[name = "loanAmount"]'));

    // error input element
    const nameInputError = () => fixture.debugElement.query(By.css('input[name = "name"] + .error'));
    const loanAmountInputError = () => fixture.debugElement.query(By.css('input[name = "loanAmount"] + .error'));

    nameInput.triggerEventHandler('blur', null);
    loanAmountInput.triggerEventHandler('blur', null);
    fixture.detectChanges();
    expect(nameInputError().nativeElement.textContent).toContain('name required');
    expect(loanAmountInputError().nativeElement.textContent).toContain('amount required');

    component.form.controls.name.setValue('Sahil');
    component.form.controls.loanAmount.setValue(30);
    fixture.detectChanges();
    expect(nameInputError()).toBeFalsy();
    expect(loanAmountInputError()).toBeFalsy();
  });

  it('should make async call when form submitted', fakeAsync(() => {
    const submitButton = fixture.debugElement.query(By.css('button[type = "submit"]'));

    const spyLoanService = spyOn(loanApprovalService, 'getLoanApproval').and.callThrough();

    component.form.controls.name.setValue('Sahil');
    component.form.controls.loanAmount.setValue(30);

    // submitButton.triggerEventHandler('click', null);
    submitButton.nativeElement.click();

    tick(1000);

    expect(spyLoanService).toHaveBeenCalledWith('Sahil', 30);
  }));

  it('should show result after submit', fakeAsync(() => {
    const message = () => fixture.debugElement.query(By.css('.message'));

    // Message should not display untill submit
    expect(message()).toBeFalsy();

    const submitButton = fixture.debugElement.query(By.css('button[type = "submit"]'));
    const spyLoanService = spyOn(loanApprovalService, 'getLoanApproval').and.callThrough();

    // Set Form Value
    component.form.controls.name.setValue('my-loan-1');
    component.form.controls.loanAmount.setValue(4000);

    // Submit form
    submitButton.nativeElement.click();
    tick(1000);
    fixture.detectChanges();

    expect(spyLoanService).toHaveBeenCalledWith('my-loan-1', 4000);
    expect(message().nativeElement.textContent).toContain('Name: my-loan-1');
    expect(message().nativeElement.textContent).toContain('Loan Amount: $4,000');
    expect(message().nativeElement.textContent).toContain('Approved: true');

    // Reset Form and set again
    component.form.reset();
    component.form.controls.name.setValue('my-loan-2');
    component.form.controls.loanAmount.setValue(6000);
    spyLoanService.calls.reset();

    // Submit Form
    submitButton.nativeElement.click();
    tick(1000);
    fixture.detectChanges();

    expect(spyLoanService).toHaveBeenCalledWith('my-loan-2', 6000);
    expect(message().nativeElement.textContent).toContain('Name: my-loan-2');
    expect(message().nativeElement.textContent).toContain('Loan Amount: $6,000');
    expect(message().nativeElement.textContent).toContain('Approved: false');
  }));
});
