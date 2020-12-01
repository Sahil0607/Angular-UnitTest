import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, isDevMode, PLATFORM_ID } from '@angular/core';
import { CookieService } from '../cookie/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class EcmCookieService {

  constructor(private cookieService: CookieService, @Inject(PLATFORM_ID) private _platform: object) {
    this.init();
  }

  private ecm: any;
  private hasEcmCookie: boolean;

  private cookieValueMap: any = {
    isCitigoldCookie: 1,
    alertEnrollnd: 2,
    autoPayEnrllnd: 3,
    BALCONId: 4,
    isBillPresentment: 5,
    isSPFMigrated: 6,
    isThankYouEnrolledinCC: 7,
    isVANEligible: 8,
    mob: 9,
    PID: 10,
    StatusCode: 11,
    isBPActive: 12,
    hasCD: 13,
    hasCheckin: 14,
    hasCheckingPlus: 15,
    hasCreditCard: 16,
    hasMortgage: 17,
    hasSavings: 18,
    isBrokerage: 19,
    isCitiblue: 20,
    isCitigold: 21,
    isCPC: 22,
    isGEB: 23,
    isIPB: 24,
    isPaperless: 25,
    isPBG: 26,
    isThankYou: 27,
    isBusinessCust: 28,
    isBusinessOnly: 29,
    isCitiBizTier: 30,
    isRELOnly: 31,
    isCitiPriority: 32,
    isCitiGoldPrivateClientCookie: 53
  };

  init = () => {
    this.ecm = this.cookieService.getCookie('CBOLECM');
    if (this.ecm) {
      this.ecm = this.ecm.split('-');
    }
    this.hasEcmCookie = this.ecm ? true : false;
  }

  getValueByName = (name) => {
    if (isPlatformServer(this._platform)) { return false; }

    if (this.hasEcmCookie) {
      if (typeof name === 'string'  && name.length && typeof this.cookieValueMap[name] !== 'undefined') {
        return this.ecm[this.cookieValueMap[name] - 1];
      } else if (isDevMode) {
        console.warn('EcmCookieService - getValueByName: you provided a non-string name or the name you passed was not valid. Valid names are: ',
        this.cookieValueMap
        );
      }
      return false;
    } else if (isDevMode) {
      console.warn('The ECM cookie service did not find an ECM cookie.');
    }
    return false;
  }

  getValueByIndex = (index) => {
    if (isPlatformServer(this._platform)) { return false; }

    if (this.hasEcmCookie) {
      if (typeof index === 'number' && typeof this.ecm[index] !== 'undefined') {
        return this.ecm[index + 1];
      }
    } else if (isDevMode) {
      console.warn('The ECM cookie service did not find an ECM cookie');
    }
    return false;
  }
}
