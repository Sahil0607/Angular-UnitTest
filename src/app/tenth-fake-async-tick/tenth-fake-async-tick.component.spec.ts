import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TenthFakeAsyncTickComponent } from './tenth-fake-async-tick.component';
import { TenthFakeAsyncTickService } from './tenth-fake-async-tick.service';

describe('TenthFakeAsyncTickComponent', () => {
  let component: TenthFakeAsyncTickComponent;
  let fixture: ComponentFixture<TenthFakeAsyncTickComponent>;

  const TenthFakeAsyncTickServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenthFakeAsyncTickComponent ],
      imports: [ HttpClientModule ],
      providers: [ TenthFakeAsyncTickService ]  // { provide: TenthFakeAsyncTickService, useValue: TenthFakeAsyncTickServiceStub }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenthFakeAsyncTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // UserService from the root injector
    // const tenthFakeAsyncTickService = TestBed.inject(TenthFakeAsyncTickService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos from the server using async', async(() => {
    const service = fixture.debugElement.injector.get(TenthFakeAsyncTickService);
    const spy = spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([ 1, 2, 3 ]));  // Promise.resolve([ [1, 2, 3] ])

    fixture.detectChanges();
    console.log('my service is ' + service);

    fixture.whenStable().then(() => {    // Delay this line until async process completed.
      expect(service.getTodosPromise()).toHaveBeenCalled();
      // expect(component.todos.length).toBe(3);
    });
  }));

  // it('should load todos from the server using fakeAsyanc and tick', fakeAsync(() => {
  //   const service = TestBed.get(TenthFakeAsyncTickService);

  //   // fixture.debugElement.injector.get(TodoTestService); // This is more verbal so use different approach
  //   spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([ [1, 2, 3] ]));

  //   fixture.detectChanges();  // Angular call ngoninit and initialized todos property.
  //   tick(); // Delay this line until async process completed. Or simulate passage of time. Can use tick(1000); wait 1 sec
  //   fixture.detectChanges();

  //   expect(component.todos.length).toBe(3);
  // }));
});





// it('should load todos from the server using async', async(() => {
  //   const service = TestBed.get(TenthFakeAsyncTickService);

  //   // fixture.debugElement.injector.get(TodoTestService); // This is more verbal so use different approach
  //   spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([ [1, 2, 3] ]));
  //   fixture.detectChanges();  // Angular call ngoninit and initialized todos property.

  //   fixture.whenStable().then(() => {    // Delay this line until async process completed.
  //     expect(component.todos.length).toBe(3);
  //   });
  // }));

  // it('should load todos from the server using fakeAsyanc and tick', fakeAsync(() => {
  //   const service = TestBed.get(TenthFakeAsyncTickService);

  //   // fixture.debugElement.injector.get(TodoTestService); // This is more verbal so use different approach
  //   spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([ [1, 2, 3] ]));

  //   fixture.detectChanges();  // Angular call ngoninit and initialized todos property.
  //   tick(); // Delay this line until async process completed. Or simulate passage of time. Can use tick(1000); wait 1 sec
  //   fixture.detectChanges();

  //   expect(component.todos.length).toBe(3);