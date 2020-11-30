import { PLATFORM_ID } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EleventhPlatformIdComponent } from './eleventh-platform-id.component';

describe('EleventhPlatformIdComponent Server PlatformId', () => {
  let component: EleventhPlatformIdComponent;
  let fixture: ComponentFixture<EleventhPlatformIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EleventhPlatformIdComponent ],
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' },  // change platform id for component
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleventhPlatformIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Check for Platform id', () => {
    it('should check platform server id', () => {
      const result = component.getTodo();
      expect(result).toBe(false);
    });
  });
});

describe('EleventhPlatformIdComponent Browser PlatformId', () => {
  let component: EleventhPlatformIdComponent;
  let fixture: ComponentFixture<EleventhPlatformIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EleventhPlatformIdComponent ],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },  // change platform id for component
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleventhPlatformIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Check for Platform id', () => {
    it('should check platform browser id', () => {
      const result = component.getTodo();
      expect(result).toBe(true);
      expect(result).not.toBe(false);
    });
  });
});