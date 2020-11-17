import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from, of } from 'rxjs';
import { DependancyTestService } from './dependancy-test.service';

import { SeventhDependancyComponent } from './seventh-dependancy.component';

describe('SeventhDependancyComponent', () => {
  let component: SeventhDependancyComponent;
  let fixture: ComponentFixture<SeventhDependancyComponent>;
  let service: DependancyTestService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeventhDependancyComponent ],
      imports: [ HttpClientModule ],
      providers: [
        {provide: DependancyTestService, useValue: {
          getTodos: () => from([ [1, 2, 3] ]) // of({id: 123, name: 'Product'})
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeventhDependancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load todos from the server', () => {
    service = TestBed.get(DependancyTestService);
    spyOn(service, 'getTodos').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.getTodos).toHaveBeenCalled();
    expect(component.todos).toEqual([1, 2, 3]);
    expect(component.todos.length).toBe(3);
  });
});
