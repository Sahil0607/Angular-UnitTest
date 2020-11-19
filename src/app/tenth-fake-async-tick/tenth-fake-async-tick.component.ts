import { Component, OnInit } from '@angular/core';
import { TenthFakeAsyncTickService } from './tenth-fake-async-tick.service';

@Component({
  selector: 'app-tenth-fake-async-tick',
  templateUrl: './tenth-fake-async-tick.component.html',
  styleUrls: ['./tenth-fake-async-tick.component.css']
})
export class TenthFakeAsyncTickComponent implements OnInit {
  todos: any = [];
  message;

  constructor(private service: TenthFakeAsyncTickService) {}

  ngOnInit() {
    // this.service.getTodos().subscribe(t => this.todos = t);
    this.service.getTodosPromise().then(t => {
      this.todos = t;
    });
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
