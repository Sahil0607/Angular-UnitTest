import { Component, HostListener } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NewDirectiveDirective } from './new-directive.directive';

// Simple test component that will not in the actual app
@Component({
  template: '<p appNewDirective>Testing Directives is awesome!</p>'
})
class TestComponent {
  // clickCount is not necessary but it's used here to verify that the component
  // is actually getting clicked
  clickCount = 0;

  constructor() { }

  // allows us to listen to click events on the main wrapper element of our component
  @HostListener('click')
  onClick() {
    this.clickCount = ++this.clickCount; // increment clickCount
  }
}

describe('NewDirectiveDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NewDirectiveDirective
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an component', () => {
    expect(component).toBeTruthy();
  });

  it('should capitalize text when initially clicked', () => {
    // const de = fixture.debugElement.query(By.css('p'));  // optional selector
    // const de = fixture.debugElement.queryAll(By.directive(NewDirectiveDirective));

    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const p: HTMLElement = debugEl.querySelector('p');

    // change clickCount to 1 and capitalize text
    p.click();
    fixture.detectChanges();

    expect(component.clickCount).toEqual(1);
    // textTransform is the property that gets/sets text casing
    expect(p.style.textTransform).toBe('uppercase');
  });

  it('should lowercase when clicked twice', () => {
    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const p: HTMLElement = debugEl.querySelector('p');

    // set clickCount to 1 and capitalize text
    p.click();
    fixture.detectChanges();

    // set clickCount to 2 and set to lowercase text
    p.click();
    fixture.detectChanges();

    expect(component.clickCount).toEqual(2);
    expect(p.style.textTransform).toBe('lowercase');
  });
});
