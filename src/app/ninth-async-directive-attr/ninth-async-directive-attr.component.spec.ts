import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './directive-attr/highlight.directive';

import { NinthAsyncDirectiveAttrComponent } from './ninth-async-directive-attr.component';

describe('NinthAsyncDirectiveAttrComponent', () => {
  let component: NinthAsyncDirectiveAttrComponent;
  let fixture: ComponentFixture<NinthAsyncDirectiveAttrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NinthAsyncDirectiveAttrComponent, HighlightDirective ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NinthAsyncDirectiveAttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have skyblue <h2>', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const bgColor = h2.style.backgroundColor;
    expect(bgColor).toBe('skyblue');
  });
});
