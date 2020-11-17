import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-str-array',
  templateUrl: './first-str-array.component.html',
  styleUrls: ['./first-str-array.component.css']
})
export class FirstStrArrayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}

export const greet = (name: string) => {
  return `Hey my name is ${name}`;
}

export const country = () => {
  return ['USA', 'India', 'UK', 'Austrelia'];
};
