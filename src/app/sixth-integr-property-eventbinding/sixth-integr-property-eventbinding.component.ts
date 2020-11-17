import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sixth-integr-property-eventbinding',
  templateUrl: './sixth-integr-property-eventbinding.component.html',
  styleUrls: ['./sixth-integr-property-eventbinding.component.css']
})
export class SixthIntegrPropertyEventbindingComponent implements OnInit {
  @Input() othersVote = 0;
  @Input() myVote = 0;
  @Output() vote = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  upVote() {
    if (this.myVote === 1) {
      return;
    }
    this.myVote++;
    this.vote.emit(this.myVote);
  }

  downVote() {
    if (this.myVote === -1) {
      return;
    }
    this.myVote--;
    this.vote.emit(this.myVote);
  }

  get totalVotes() {
    return this.othersVote + this.myVote;
  }
}
