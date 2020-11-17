import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FourthDeleteService {

  constructor(private http: HttpClient) { }

  delete(id) {
    return this.http.delete('...').pipe(map(r => r));
  }
}
