import { isPlatformServer } from '@angular/common';
import { Component, Inject, isDevMode, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-eleventh-platform-id',
  templateUrl: './eleventh-platform-id.component.html',
  styleUrls: ['./eleventh-platform-id.component.css']
})
export class EleventhPlatformIdComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
        // console.log(isPlatformBrowser(this.platformId));
        // console.log(this.platformId);
        // console.log(PLATFORM_ID);
        // console.log('Hello');
        // console.log('Is DevMode' + isDevMode);
   }

  ngOnInit(): void {
  }

  getTodo() {
    if (isPlatformServer(this.platformId)) {
      return false;
    }
    return true;
  }
}
