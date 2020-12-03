import { Injectable, isDevMode, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CookieService } from '../cookie/cookie.service';
import { EcmCookieService } from './ecm-cookie.service';

@Injectable({ providedIn: 'root' })
export class DevModeService {
  constructor() { }

  isDevMode() {
    return this.isDevMode();
  }
}
class CookieServiceStub {
  getCookie: any = cookieName => { };
}

describe('EcmCookieService', () => {
  let service: EcmCookieService;
  const cookieServiceSpy = new CookieServiceStub();

  describe('EcmCookieService for server', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          EcmCookieService,
          { provide: CookieService, useValue: cookieServiceSpy},
          { provide: PLATFORM_ID, useValue: 'server'}
        ]
      });
      spyOn(cookieServiceSpy, 'getCookie').and.returnValue('-N-N--N-Y-N-Y-037-142-00');
      service = TestBed.inject(EcmCookieService);
    });
    it('should return false for getValueByIndex() if platform is server', () => {
      expect(service.getValueByIndex(3)).toBe(false);
    });
    it('should return false for getValueByName() if platform is server', () => {
      expect(service.getValueByName('CBOLECM')).toBe(false);
    });
  });

  describe('EcmCookieService for browser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          EcmCookieService,
          { provide: CookieService, useValue: cookieServiceSpy},
          { provide: PLATFORM_ID, useValue: 'browser'}
        ]
      });
      // spyOn(cookieServiceSpy, 'getCookie').and.returnValue('-N-N--N-Y-N-Y-037-142-00');
      service = TestBed.inject(EcmCookieService);
    });

    describe('hasEcmCookie', () => {
      it('can load instance', () => {
        expect(service).toBeTruthy();
      });
      it('should return cookie if CBOLECM exists in cookies in browser', () => {
        spyOn(cookieServiceSpy, 'getCookie').and.returnValue('-N-N--N-Y-N-Y-037-142-00');
        const cookie = cookieServiceSpy.getCookie('CBOLECM');
        service.init();
        expect(cookieServiceSpy.getCookie).toHaveBeenCalledWith('CBOLECM');
        expect(typeof cookie).toBe('string');
        expect(cookie).not.toBeUndefined();
      });
      it('should return true if CBOMECM present', () => {
        spyOn(cookieServiceSpy, 'getCookie').and.returnValue('-N-N--N-Y-N-Y-037-142-00');
        const hasEcmCookie = 'hasEcmCookie';
        service.init();
        expect(service[hasEcmCookie]).toBe(true);
      });
      it('should return false if CBOLECM no present', () => {
        spyOn(cookieServiceSpy, 'getCookie').and.returnValue(null);
        const hasEcmCookie = 'hasEcmCookie';
        service.init();
        expect(cookieServiceSpy.getCookie).toHaveBeenCalledWith('CBOLECM');
        expect(service[hasEcmCookie]).toBe(false);
      });
    });
    describe('getValueByIndex()', () => {
      it('should return value from ecm array if platform is not server', () => {
        const hasEcmCookie = 'hasEcmCookie';
        const ecm = 'ecm';
        service[hasEcmCookie] = true;
        service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
        expect(service.getValueByIndex(3)).toBe('N');
        expect(service.getValueByIndex(3)).not.toBe(false);
      });
      it('should check index passed is number', () => {
        const ecm = 'ecm';
        const hasEcmCookie = 'hasEcmCookie';
        service[hasEcmCookie] = true;
        service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
        const index = 4;
        expect(typeof index).toBe('number');
        expect(service.getValueByIndex(index)).not.toBe(false);
      });
      it('should check typeof index inside ecm array is not undefined', () => {
        const ecm = 'ecm';
        const hasEcmCookie = 'hasEcmCookie';
        const index = 4;
        service[hasEcmCookie] = true;
        service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
        expect(service[ecm][index]).toBe('N');
        expect(service[ecm][index]).not.toBeUndefined();
      });
      it('should return value from ecm array from provided index', () => {
        const index = 4;
        const hasEcmCookie = 'hasEcmCookie';
        const ecm = 'ecm';
        service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
        service[hasEcmCookie] = true;
        expect(service.getValueByIndex(index)).toBe('Y');
      });
      it('should return false if hasEcmCookie and isDevMode to be false', () => {
        const hasEcmCookie = 'hasEcmCookie';
        service[hasEcmCookie] = false;
        const devModeService = TestBed.inject(DevModeService);
        spyOn(devModeService, 'isDevMode').and.returnValue(false);
        console.log(service.getValueByIndex(4), 'Hello');
        expect(service.getValueByIndex(4)).toBeFalsy();
      });
      it('should check isDevMode to be true', () => {
        const devModeService = TestBed.inject(DevModeService);
        spyOn(devModeService, 'isDevMode').and.returnValue(true);
        expect(isDevMode()).toBe(true);
      });
      it('should return warning if devmode is true', () => {
        const hasEcmCookie = 'hasEcmCookie';
        service[hasEcmCookie] = false;
        const devModeService = TestBed.inject(DevModeService);
        spyOn(devModeService, 'isDevMode').and.returnValue(true);
        spyOn(console, 'warn').and.callThrough();
        service.getValueByIndex(4);
        expect(console.warn).toHaveBeenCalled();
      });
    });

    describe('getValueByName()', () => {
      it('should return true if platform is not server', () => {
        const hasEcmCookie = 'hasEcmCookie';
        const ecm = 'ecm';
        service[hasEcmCookie] = true;
        service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
        expect(service.getValueByName('isCitigoldCookie')).toBe('');
        expect(service.getValueByName('isVANEligible')).toBe('Y');
        expect(service.getValueByIndex(3)).not.toBe(false);
      });
      it('should check if "name" value is string', () => {
        const name = 'isVANEligible';
        const hasEcmCookie = 'hasEcmCookie';
        const ecm = 'ecm';
        service[hasEcmCookie] = true;
        service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
        const result = service.getValueByName(name);
        expect(typeof name).toBe('string');
        expect(result).toBe('Y');
      });
      it('should check "name" exist in cookieValueMap object', () => {
        const name = 'isVANEligible';
        const cookieValMap = 'cookieValueMap';
        const cookieValueMap = service[cookieValMap];
        expect(cookieValueMap[name]).toBeTruthy();
      });
      it('should check for numeric value of "name" inside cookieValueMap', () => {
        const name = 'isBillPresentment';
        const cookieValMap = 'cookieValueMap';
        const cookieValueMap = service[cookieValMap];
        expect(cookieValueMap[name]).toEqual(5);
      });
      it('should check for typeof cookieValueMap[name] and should return number', () => {
        const name = 'autoPayEnrllnd';
        const cookieValMap = 'cookieValueMap';
        const cookieValueMap = service[cookieValMap];
        expect(typeof cookieValueMap[name]).toBe('number');
      });
      it('should get ECM cookie value form cookieValueMap', () => {
        const name = 'isThankYouEnrolledinCC';
        const hasEcmCookie = 'hasEcmCookie';
        const ecm = 'ecm';
        service[hasEcmCookie] = true;
        service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
        expect(service.getValueByName(name)).not.toBeUndefined();
        expect(service.getValueByName(name)).toBe('N');
      });
      it('should check only for isDevMode', () => {
        const devModeService = TestBed.inject(DevModeService);
        spyOn(devModeService, 'isDevMode').and.returnValue(true);
        expect(isDevMode()).toBe(true);
      });
      it('should return warning with cookieValueMap if isDevMode is true', () => {
        const hasEcmCookie = 'hasEcmCookie';
        service[hasEcmCookie] = true;
        const devModeService = TestBed.inject(DevModeService);
        spyOn(devModeService, 'isDevMode').and.returnValue(true);
        spyOn(console, 'warn').and.callThrough();
        service.getValueByName('CBOLECM');
        expect(console.warn).toHaveBeenCalled();
      });
      it('should check for typeof cookieValueMap[name] and should return "undefined"', () => {
        const hasEcmCookie = 'hasEcmCookie';
        const cookieValueMap = 'cookieValueMap';
        service[hasEcmCookie] = true;
        const devModeService = TestBed.inject(DevModeService);
        spyOn(devModeService, 'isDevMode').and.returnValue(true);
        expect(service[cookieValueMap]['CBOLECM']).toBeUndefined();
      });
      it('should return false for passing number', () => {
        const hasEcmCookie = 'hasEcmCookie';
        service[hasEcmCookie] = true;
        const devModeService = TestBed.inject(DevModeService);
        spyOn(devModeService, 'isDevMode').and.returnValue(true);
        expect(service.getValueByName(12)).toBeFalsy();
      });
      it('should check for isDevMode and hasEcmCookie to be false', () => {
        const hasEcmCookie = 'hasEcmCookie';
        service[hasEcmCookie] = false;
        const devModeService = TestBed.inject(DevModeService);
        spyOn(devModeService, 'isDevMode').and.returnValue(true);
        expect(service.getValueByName('isCitigoldCookie')).toBeFalsy();
      });
      it('should return console warning if isDevMode and hasEcmCookie to be false', () => {
        const hasEcmCookie = 'hasEcmCookie';
        service[hasEcmCookie] = false;
        const devModeService = TestBed.inject(DevModeService);
        spyOn(devModeService, 'isDevMode').and.returnValue(true);
        spyOn(console, 'warn').and.callThrough();
        service.getValueByName('CBOLECM');
        expect(console.warn).toHaveBeenCalled();
      });
      it('should return false for the hasEcmCookie false and isDevMod false', () => {
        const hasEcmCookie = 'hasEcmCookie';
        service[hasEcmCookie] = false;
        const devModeService = TestBed.inject(DevModeService);
        spyOn(devModeService, 'isDevMode').and.returnValue(false);
        expect(service.getValueByName('isCitigoldCookie')).toBeFalsy();
      });
    });
  });
});
