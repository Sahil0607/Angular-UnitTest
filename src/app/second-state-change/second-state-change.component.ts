import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-state-change',
  templateUrl: './second-state-change.component.html',
  styleUrls: ['./second-state-change.component.css']
})
export class SecondStateChangeComponent implements OnInit {
  totalVote = 0;
  constructor() { }

  ngOnInit(): void {}

  voteUp() {
    this.totalVote++;
  }

  voteDown() {
    this.totalVote--;
  }

}
