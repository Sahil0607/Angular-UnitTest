import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { empty, Observable, Subject } from 'rxjs';

import { EigthRouterActivatedrouterComponent } from './eigth-router-activatedrouter.component';

class RouterStub {  // Here we'll create dummy and light weight router class
  navigate(params) { // We don't need to add all method of router class
    // Only need method which used in our component under test
  }
}

class ActivatedRouteStub {
  private subject =  new Subject(); // params is used in component as route.params. And it is observable

  push(value) {
    this.subject.next(value); // Push value to observable.
  }

  get params() {
    return this.subject.asObservable();  // Using this we can use route.params as observable.
  } // params: Observable<any> = empty(); // params is used in component as route.params. And it is observable
}

describe('EigthRouterActivatedrouterComponent', () => {
  let component: EigthRouterActivatedrouterComponent;
  let fixture: ComponentFixture<EigthRouterActivatedrouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EigthRouterActivatedrouterComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },   // Replace Router with RouterStub in component.
        { provide: ActivatedRoute, useClass: ActivatedRouteStub } // Replace ActivatedRoute with ActivatedRouteStub in component.
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EigthRouterActivatedrouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect user to user page by saving ', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate'); // Spy on navigate method. No need to do and.callFake() bcoz this is already fake method.

    component.save();
    expect(spy).toHaveBeenCalledWith(['users']);
  });

  it('should navigate user to not-found page when invalid user id is passed', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate'); // Spy on navigate method. No need to do and.callFake() bcoz this is already fake method.

    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);  // Type is stub bcoz we are replacing with actstub
    // Push the value in observable and use it as paramaeter pass to component.
    route.push({ id: 0 }); // Pushing new value in observable
    // It will execute this.router.navigate(['not-found']); in component.

    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});

// The toHaveBeenCalled() matcher verifies whether the spied method has been called or not. It returns true if the spy was called.
// The toHaveBeenCalledWith() matcher verifies whether the spied method has been called with the right argument(s). It returns true 
// if there has been any one call with the matching argument.
