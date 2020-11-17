import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { empty, from, throwError } from 'rxjs';
import { FifthAddTodoService } from './fifth-add-todo.service';

import { FifthSpyInteractionComponent } from './fifth-spy-interaction.component';

describe('FifthSpyInteractionComponent', () => {
  let service: FifthAddTodoService;
  let component: FifthSpyInteractionComponent;

  beforeEach(() => {
    service = new FifthAddTodoService(null);
    component = new FifthSpyInteractionComponent(service);
  });

  it('should set todos property with items returns from the server', () => {
    const todos = [
      {id: '1', name: 'ABC'},
      {id: '2', name: 'BCD'},
      {id: '3', name: 'DEF'}
    ];
    spyOn(service, 'getTodos').and.callFake(() => {
      return from([todos]);
    });

    component.ngOnInit();
    expect(component.todos).toBe(todos);
  });
});

// 1. This method is going to call server to save changes. So, Make sure service.add() called.
// 2. If it successful, we will make sure todo is add to this.todo Array.
// 3. Make sure If server send error we will put in message property.
describe('FifthSpyInteractionComponent', () => {
  let service: FifthAddTodoService;
  let component: FifthSpyInteractionComponent;

  beforeEach(() => {
    service = new FifthAddTodoService(null);
    component = new FifthSpyInteractionComponent(service);
  });

  it('Should call the server to save the changes when new todo item is added', () => {
    const spy = spyOn(service, 'add').and.callFake(() => {
      return empty();
    });
    component.add('abc');
    expect(spy).toHaveBeenCalled();
  });
  it('Should add new todo returned from the server', () => {
    const todo = { id: '1'};
    spyOn(service, 'add').and.returnValue(from([ todo ]));

    component.add(todo);
    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });
  it('should return error message if server return error when adding a new todo', () => {
    const err =  'oops error!';
    // spyOn(service, 'add').and.returnValue(throwError(new Error(err)));
    spyOn(service, 'add').and.returnValue(throwError(err));

    component.add('abc');
    expect(component.message).toContain(err);
  });
});
