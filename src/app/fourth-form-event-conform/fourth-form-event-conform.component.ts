import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FourthDeleteService } from './fourth-delete.service';

@Component({
  selector: 'app-fourth-form-event-conform',
  templateUrl: './fourth-form-event-conform.component.html',
  styleUrls: ['./fourth-form-event-conform.component.css']
})
export class FourthFormEventConformComponent implements OnInit {
  form: FormGroup;

  totalVotes = 0;
  voteChanged = new EventEmitter();

  deletedTodo;

  constructor(private fb: FormBuilder, private fourthDeleteService: FourthDeleteService) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['']
    });
   }

  ngOnInit(): void {}

  // 2nd testcase
  upVote() {
    this.totalVotes++;
    this.voteChanged.emit(this.totalVotes);
  }

  // 3rd testcase
  delete(id) {
    if (confirm('Are you sure?')) {
      this.fourthDeleteService.delete(id).subscribe();
    }
  }

}
