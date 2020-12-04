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

fdescribe('EcmCookieService', () => {
  let service: EcmCookieService;
  const cookieServiceSpy = new CookieServiceStub();
  let mockPlatformId = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EcmCookieService,
        { provide: CookieService, useValue: cookieServiceSpy},
        { provide: PLATFORM_ID, useValue: mockPlatformId},
      ]
    });
    // spyOn(cookieServiceSpy, 'getCookie').and.returnValue('-N-N--N-Y-N-Y-037-142-00');
    service = TestBed.inject(EcmCookieService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  // Check for PLATFORM_ID is 'server'
  it('should return false for getValueByIndex() if platform is server', () => {
    mockPlatformId = 'server';
    expect(service.getValueByIndex(3)).toBe(false);
  });
  it('should return false for getValueByName() if platform is server', () => {
    mockPlatformId = 'server';
    expect(service.getValueByName('CBOLECM')).toBe(false);
  });

  // Check for PLATFORM_ID is 'browser'
  // hasEcmCookie
  it('should return cookie if CBOLECM exists in cookies in browser', () => {
    mockPlatformId = 'browser';
    spyOn(cookieServiceSpy, 'getCookie').and.returnValue('-N-N--N-Y-N-Y-037-142-00');
    const cookie = cookieServiceSpy.getCookie('CBOLECM');
    service.init();
    expect(cookieServiceSpy.getCookie).toHaveBeenCalledWith('CBOLECM');
    expect(typeof cookie).toBe('string');
    expect(cookie).not.toBeUndefined();
  });
  it('should return true if CBOMECM present', () => {
    mockPlatformId = 'browser';
    spyOn(cookieServiceSpy, 'getCookie').and.returnValue('-N-N--N-Y-N-Y-037-142-00');
    const hasEcmCookie = 'hasEcmCookie';
    service.init();
    expect(service[hasEcmCookie]).toBe(true);
  });
  it('should return false if CBOLECM no present', () => {
    mockPlatformId = 'browser';
    spyOn(cookieServiceSpy, 'getCookie').and.returnValue(null);
    const hasEcmCookie = 'hasEcmCookie';
    service.init();
    expect(cookieServiceSpy.getCookie).toHaveBeenCalledWith('CBOLECM');
    expect(service[hasEcmCookie]).toBe(false);
  });

  // getValueByIndex() method
  it('should return value from ecm array if platform is not server', () => {
    mockPlatformId = 'browser';
    const hasEcmCookie = 'hasEcmCookie';
    const ecm = 'ecm';
    service[hasEcmCookie] = true;
    service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
    expect(service.getValueByIndex(3)).toBe('N');
    expect(service.getValueByIndex(3)).not.toBe(false);
  });
  it('should check index passed is number', () => {
    mockPlatformId = 'browser';
    const ecm = 'ecm';
    const hasEcmCookie = 'hasEcmCookie';
    service[hasEcmCookie] = true;
    service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
    const index = 4;
    expect(typeof index).toBe('number');
    expect(service.getValueByIndex(index)).not.toBe(false);
  });
  it('should check typeof index inside ecm array is not undefined', () => {
    mockPlatformId = 'browser';
    const ecm = 'ecm';
    const hasEcmCookie = 'hasEcmCookie';
    const index = 4;
    service[hasEcmCookie] = true;
    service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
    expect(service[ecm][index]).toBe('N');
    expect(service[ecm][index]).not.toBeUndefined();
  });
  it('should return value from ecm array from provided index', () => {
    mockPlatformId = 'browser';
    const index = 4;
    const hasEcmCookie = 'hasEcmCookie';
    const ecm = 'ecm';
    service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
    service[hasEcmCookie] = true;
    expect(service.getValueByIndex(index)).toBe('Y');
  });
  it('should return false if hasEcmCookie and isDevMode to be false', () => {
    mockPlatformId = 'browser';
    const hasEcmCookie = 'hasEcmCookie';
    service[hasEcmCookie] = false;
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(false);
    expect(service.getValueByIndex(4)).toBeFalsy();
  });
  it('should check isDevMode to be true', () => {
    mockPlatformId = 'browser';
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(true);
    expect(isDevMode()).toBe(true);
  });
  it('should return warning if devmode is true', () => {
    mockPlatformId = 'browser';
    const hasEcmCookie = 'hasEcmCookie';
    service[hasEcmCookie] = false;
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(true);
    spyOn(console, 'warn').and.callThrough();
    service.getValueByIndex(4);
    expect(console.warn).toHaveBeenCalledWith('The ECM cookie service did not find an ECM cookie');
  });

  // getValueByName() method
  it('should return true if platform is not server', () => {
    mockPlatformId = 'browser';
    const hasEcmCookie = 'hasEcmCookie';
    const ecm = 'ecm';
    service[hasEcmCookie] = true;
    service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
    expect(service.getValueByName('isVANEligible')).toBe('Y');
  });
  it('should check if "name" value is string', () => {
    mockPlatformId = 'browser';
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
    mockPlatformId = 'browser';
    const name = 'isVANEligible';
    const cookieValMap = 'cookieValueMap';
    const cookieValueMap = service[cookieValMap];
    expect(cookieValueMap[name]).toBeTruthy();
  });
  it('should check for numeric value of "name" inside cookieValueMap', () => {
    mockPlatformId = 'browser';
    const name = 'isBillPresentment';
    const cookieValMap = 'cookieValueMap';
    const cookieValueMap = service[cookieValMap];
    expect(cookieValueMap[name]).toEqual(5);
  });
  it('should check for typeof cookieValueMap[name] and should return number', () => {
    mockPlatformId = 'browser';
    const name = 'autoPayEnrllnd';
    const cookieValMap = 'cookieValueMap';
    const cookieValueMap = service[cookieValMap];
    expect(typeof cookieValueMap[name]).toBe('number');
  });
  it('should get ECM cookie value form cookieValueMap', () => {
    mockPlatformId = 'browser';
    const name = 'isThankYouEnrolledinCC';
    const hasEcmCookie = 'hasEcmCookie';
    const ecm = 'ecm';
    service[hasEcmCookie] = true;
    service[ecm] = ['', 'N', 'N', '', 'N', 'Y', 'N', 'Y', '037', '142', '00'];
    expect(service.getValueByName(name)).not.toBeUndefined();
    expect(service.getValueByName(name)).toBe('N');
  });
  it('should check only for isDevMode', () => {
    mockPlatformId = 'browser';
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(true);
    expect(isDevMode()).toBe(true);
  });
  it('should return warning with cookieValueMap if isDevMode is true', () => {
    mockPlatformId = 'browser';
    const hasEcmCookie = 'hasEcmCookie';
    service[hasEcmCookie] = true;
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(true);
    spyOn(console, 'warn').and.callThrough();
    service.getValueByName('CBOLECM');
    expect(console.warn).toHaveBeenCalledWith('EcmCookieService - getValueByName: you provided a non-string name or the name you passed was not valid. Valid names are: ',
    service['cookieValueMap']);
  });
  it('should check for typeof cookieValueMap[name] and should return "undefined"', () => {
    mockPlatformId = 'browser';
    const hasEcmCookie = 'hasEcmCookie';
    const cookieValueMap = 'cookieValueMap';
    service[hasEcmCookie] = true;
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(true);
    expect(service[cookieValueMap]['CBOLECM']).toBeUndefined();
  });
  it('should return false for passing number', () => {
    mockPlatformId = 'browser';
    const hasEcmCookie = 'hasEcmCookie';
    service[hasEcmCookie] = true;
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(true);
    expect(service.getValueByName(12)).toBeFalsy();
  });
  it('should check for isDevMode and hasEcmCookie to be false', () => {
    mockPlatformId = 'browser';
    const hasEcmCookie = 'hasEcmCookie';
    service[hasEcmCookie] = false;
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(true);
    expect(service.getValueByName('isCitigoldCookie')).toBeFalsy();
  });
  it('should return console warning if isDevMode and hasEcmCookie to be false', () => {
    mockPlatformId = 'browser';
    const hasEcmCookie = 'hasEcmCookie';
    service[hasEcmCookie] = false;
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(true);
    spyOn(console, 'warn').and.callThrough();
    service.getValueByName('CBOLECM');
    expect(console.warn).toHaveBeenCalledWith('The ECM cookie service did not find an ECM cookie.');
  });
  it('should return false for the hasEcmCookie false and isDevMod false', () => {
    mockPlatformId = 'browser';
    const hasEcmCookie = 'hasEcmCookie';
    service[hasEcmCookie] = false;
    const devModeService = TestBed.inject(DevModeService);
    spyOn(devModeService, 'isDevMode').and.returnValue(false);
    expect(service.getValueByName('isCitigoldCookie')).toBeFalsy();
  });
});
