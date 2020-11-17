import { Component, OnInit } from '@angular/core';
import { DependancyTestService } from './dependancy-test.service';

@Component({
  selector: 'app-seventh-dependancy',
  templateUrl: './seventh-dependancy.component.html',
  styleUrls: ['./seventh-dependancy.component.css']
})
export class SeventhDependancyComponent implements OnInit {
  todos: any = [];
  message;

  constructor(private service: DependancyTestService) {}

  ngOnInit() {
    this.service.getTodos().subscribe(t => this.todos = t);
  }

  add() {
    const newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(
      t => this.todos.push(t),
      err => this.message = err);
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this.service.delete(id).subscribe();
    }
  }

}
