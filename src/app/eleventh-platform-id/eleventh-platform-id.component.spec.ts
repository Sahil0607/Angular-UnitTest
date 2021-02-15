import { PLATFORM_ID } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EleventhPlatformIdComponent } from './eleventh-platform-id.component';
import { NgxWebstorageModule } from 'ngx-webstorage';

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
      imports: [ NgxWebstorageModule.forRoot() ],
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

  it('should check value added in storage', () => {
    // console.log(component.setLocalStorage);
    component.setLocalStorage('myName', 'Alex');
    // spyOn(storage, 'store').and.returnValue('true');
    // spyOn(storage, 'retrieve').and.returnValue('Alex');
    console.log(component.getLocalStorage('myName'));
    expect(component.getLocalStorage('myName')).toBe('Alex');
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
