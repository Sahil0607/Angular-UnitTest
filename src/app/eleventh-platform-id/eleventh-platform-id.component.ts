import { isPlatformServer } from '@angular/common';
import { Component, Inject, isDevMode, OnInit, PLATFORM_ID } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-eleventh-platform-id',
  templateUrl: './eleventh-platform-id.component.html',
  styleUrls: ['./eleventh-platform-id.component.css']
})
export class EleventhPlatformIdComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: object, private storage: LocalStorageService,
              private sessionStorage: SessionStorageService) {
        // console.log(isPlatformBrowser(this.platformId));
        // console.log(this.platformId);
        // console.log(PLATFORM_ID);
        // console.log('Hello');
        // console.log('Is DevMode' + isDevMode);
   }

  ngOnInit(): void {
    // this.setLocalStorage('name', 'sahil');
  }

  getTodo() {
    if (isPlatformServer(this.platformId)) {
      return false;
    }
    return true;
  }

  setLocalStorage(key, value) {
    if (this.storage.store(key, value)) {
      console.log(this.storage.retrieve(key));
      return true;
    }
    return false;
  }

  getLocalStorage(key) {
    return this.storage.retrieve(key);
  }

  // setSessionStorage(key, value) {
  //   if (this.storage.store(key, value)) {
  //     return true;
  //   }
  //   return false;
  // }
}
