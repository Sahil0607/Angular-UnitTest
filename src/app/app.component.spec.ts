import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from 'protractor';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ RouterTestingModule.withRoutes([]) ],
      schemas: [ NO_ERRORS_SCHEMA ]  // Ignore and element or attributes it doesent recognize.
    }).compileComponents();
  }));

//   it('should have a link to todos page', () => {
//     const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

//     // <a href='/todos'>
//     const index = debugElements.findIndex(de => de.properties['href'] === '/todos' );
//     console.log('My index is ', index);
//     expect(index).toBeGreaterThan(-1);
//    });

  // it('should have a router outlet', () => {
  //   const de = fixture.debugElement.query(By.directive(RouterOutlet));
  //   expect(de).not.toBeNull();
  // });

// This 3 is default app.component test cases
  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'test-angular'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('test-angular');
  });
});
