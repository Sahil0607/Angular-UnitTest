import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { empty } from 'rxjs';
import { FourthDeleteService } from './fourth-delete.service';

import { FourthFormEventConformComponent } from './fourth-form-event-conform.component';

// 1. We have to make sure when component initialized, We have form group with two form object(Name and email). 
// 2. Validator for form control. Make sure name field is require.
describe('FourthFormEventConformComponent', () => {
  let component: FourthFormEventConformComponent;

  beforeEach(async(() => {
    component = new FourthFormEventConformComponent(new FormBuilder(), new FourthDeleteService(null));
    // Need instance of form ex: FormBuilder
  }));

  it('should create form with two controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
  });

  it('should check validation of name field', () => {
    const name = component.form.get('name');
    name.setValue('');
    expect(name.valid).toBeFalse();
  });
});

describe('FourthFormEventConformComponent', () => {
  let component: FourthFormEventConformComponent;

  beforeEach(() => {
    component = new FourthFormEventConformComponent(new FormBuilder(), new FourthDeleteService(null));
  });

  it('should check output totalvote', () => {
    let totalvote = null;
    component.voteChanged.subscribe(vote => totalvote = vote);

    component.upVote();
    expect(totalvote).toEqual(1);
  });
});

describe('FourthFormEventConformComponent', () => {
  let component: FourthFormEventConformComponent;
  let service: FourthDeleteService;

  beforeEach(() => {
    service = new FourthDeleteService(null);
    component = new FourthFormEventConformComponent(new FormBuilder(), service);
  });

  it('Should call server to delete todo item if user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'delete').and.returnValue(empty());

    component.delete('1');
    expect(spy).toHaveBeenCalledWith('1');   // Make sure not pass different id accidently
  });

  it('Should Not call server if user cancels', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      const spy = spyOn(service, 'delete').and.returnValue(empty());

      component.delete('1');
      expect(spy).not.toHaveBeenCalled();   // Make sure not pass different id accidently
  });
});
