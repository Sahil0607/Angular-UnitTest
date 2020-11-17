import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNumberService } from './add-number.service';

import { ThirdServiceComponent } from './third-service.component';

describe('ThirdServiceComponent', () => {
  let component: ThirdServiceComponent;
  let fixture: ComponentFixture<ThirdServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdServiceComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
