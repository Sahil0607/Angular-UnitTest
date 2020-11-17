import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { country, FirstStrArrayComponent, greet } from './first-str-array.component';

describe('greet', () => {
  it('Should include name in message', () => {
    const name = greet('Sahil');
    expect(name).toContain('Sahil');
  });
});

describe('country', () => {
  it('Should include name in country', () => {
    expect(country()).toContain('India');
    expect(country()).toContain('USA');
    expect(country()).toContain('UK');
  });
});

describe('FirstStrArrayComponent', () => {
  let component: FirstStrArrayComponent;
  let fixture: ComponentFixture<FirstStrArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstStrArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstStrArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
