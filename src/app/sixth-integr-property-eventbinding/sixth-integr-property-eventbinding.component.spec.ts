import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SixthIntegrPropertyEventbindingComponent } from './sixth-integr-property-eventbinding.component';

describe('SixthIntegrPropertyEventbindingComponent', () => {
  let component: SixthIntegrPropertyEventbindingComponent;
  let fixture: ComponentFixture<SixthIntegrPropertyEventbindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixthIntegrPropertyEventbindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixthIntegrPropertyEventbindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('.vote-count'));

    const el: HTMLElement = de.nativeElement;

    expect(el.textContent).toEqual('21');
  });

  it('should highlight the upvote button if i upVoted', () => {
    component.myVote = 1;
    fixture.detectChanges();

    const de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    expect(de.classes['highlighted']).toBeTruthy();
  });

  it('should increase total votes when click on upvote button', () => {
    const button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    button.triggerEventHandler('click', null);

    expect(component.myVote).toBe(1);
  });
});
