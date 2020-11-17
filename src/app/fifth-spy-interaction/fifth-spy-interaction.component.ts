import { Component, OnInit } from '@angular/core';
import { FifthAddTodoService } from './fifth-add-todo.service';

@Component({
  selector: 'app-fifth-spy-interaction',
  templateUrl: './fifth-spy-interaction.component.html',
  styleUrls: ['./fifth-spy-interaction.component.css']
})
export class FifthSpyInteractionComponent implements OnInit {
  todos: any = [];
  message;

  constructor(private fifthAddTodoService: FifthAddTodoService) { }

  ngOnInit(): void {
    this.fifthAddTodoService.getTodos().subscribe(todo => this.todos = todo);
  }

  add(todo) {
    this.fifthAddTodoService.add(todo).subscribe(
      td => this.todos.push(td),
      error => this.message = error
    );
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this.fifthAddTodoService.delete(id).subscribe();
    }
  }
}
