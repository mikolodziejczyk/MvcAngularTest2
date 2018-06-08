import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringControlComponent } from './string-control.component';

describe('StringComponentComponent', () => {
  let component: StringControlComponent;
  let fixture: ComponentFixture<StringControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
