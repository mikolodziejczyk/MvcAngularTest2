import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextControlBaseComponent } from './text-control-base.component';

describe('TextControlBaseComponent', () => {
  let component: TextControlBaseComponent;
  let fixture: ComponentFixture<TextControlBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextControlBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextControlBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
