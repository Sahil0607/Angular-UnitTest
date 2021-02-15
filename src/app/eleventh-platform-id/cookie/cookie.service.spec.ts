import { TestBed } from '@angular/core/testing';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieService;
  let storage: LocalStorageService;
  let sessionStorage: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
    SessionStorageService,
      ]
    });
    service = TestBed.inject(CookieService);
    storage = TestBed.inject(LocalStorageService);
    sessionStorage = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
