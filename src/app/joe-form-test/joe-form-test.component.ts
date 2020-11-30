import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanApprovalInfo, LoanApprovalService } from './service/loan-approval.service';

@Component({
  selector: 'app-joe-form-test',
  templateUrl: './joe-form-test.component.html',
  styleUrls: ['./joe-form-test.component.css']
})
export class JoeFormTestComponent implements OnInit {
  showMessage: boolean;
  data: LoanApprovalInfo;
  form: FormGroup;

  @Input() title: string;

  constructor(private fb: FormBuilder, private service: LoanApprovalService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      loanAmount: [null, Validators.required]
    });
  }

  submitForm(): void {
    this.showMessage = false;
    const formValue = {
      name: this.form.controls.name.value,
      loanAmount: this.form.controls.loanAmount.value
    };

    if (this.form.valid) {
      this.service.getLoanApproval(formValue.name, formValue.loanAmount).subscribe(loanData => {
        this.data = loanData;
        this.showMessage = true;
      });
    }
  }

}
