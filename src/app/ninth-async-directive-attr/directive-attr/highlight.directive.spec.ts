import { Component, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

// Simple test component that will not in the actual app
@Component({
  template: `
  <h2 appHighlight="yellow">Something Yellow</h2>
  <h2 appHighlight>The Default (Gray)</h2>
  <h2>No Highlight</h2>
  <input #box [appHighlight]="box.value" value="cyan"/>`
})
class TestComponent { }

describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ HighlightDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
  });

  // color tests
  it('should have three highlighted elements', () => {
    const des = fixture.debugElement.queryAll(By.directive(HighlightDirective)); // all elements with an attached HighlightDirective
    expect(des.length).toBe(3);
  });

  it('should color 1st <h2> background "yellow"', () => {
    const de = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    const bgColor = de[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });

  it('should color 2nd <h2> background w/ default color', () => {
    const des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    const dir = des[1].injector.get(HighlightDirective) as HighlightDirective;
    const bgColor = des[1].nativeElement.style.backgroundColor;
    expect(bgColor).toBe(dir.defaultColor);
  });

  it('should bind <input> background to value color', () => {
    const des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    // easier to work with nativeElement
    const input = des[2].nativeElement as HTMLInputElement;
    expect(input.style.backgroundColor).toBe('cyan', 'initial backgroundColor');

    input.value = 'green';

    // Dispatch a DOM event so that Angular responds to the input value change.
    // In older browsers, such as IE, you might need a CustomEvent instead. See
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).toBe('green', 'changed backgroundColor');
  });

  it('bare <h2> should not have a customProperty', () => {
    // the h2 without the HighlightDirective
    const bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
    expect(bareH2.properties.customProperty).toBeUndefined();
  });
});



// @Component({
//   template: `
//     <p highlight="cyan">First</p>  // Test with value
//     <p highlight>Second</p>  // Test without value
//   `
// })
// class DirectiveHostComponent {}

// describe('HighlightDirective', () => {
//   let fixture: ComponentFixture<DirectiveHostComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({    // Dont forget to add HighlightDirective
//       declarations: [ DirectiveHostComponent, HighlightDirective ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(DirectiveHostComponent);
//     fixture.detectChanges();
//   });

//   it('should highlight first element with cyan ', () => {
//     const de = fixture.debugElement.queryAll(By.css('p'))[0];
//     expect(de.nativeElement.style.backgroundColor).toBe('cyan');
//   });

//   it('should highlight second element with default color ', () => {
//     const de = fixture.debugElement.queryAll(By.css('p'))[1];
//     const directive = de.injector.get(HighlightDirective);  // Get directive
//     expect(de.nativeElement.style.backgroundColor).toBe(directive.defaultColor);
//   });
// });
