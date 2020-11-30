import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }
  getCookie(cookieName: string): string {
    return '-N-N--N-Y-N-Y-142-00';
  }
}
