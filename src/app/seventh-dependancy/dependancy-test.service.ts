import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DependancyTestService {
  constructor(private http: HttpClient) { }

  add(todo) {
    return this.http.post('...', todo).pipe(map(r => r));
  }

  getTodos() {
    return this.http.get('...').pipe(map(r => r));
  }

  getTodosPromise() {
    return this.http.get('...').pipe(map(r => r)).toPromise();
  }

  delete(id) {
    return this.http.delete('...').pipe(map(r => r));
  }
}
