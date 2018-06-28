import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionIndexComponent } from './connection-index.component';

describe('ConnectionIndexComponent', () => {
  let component: ConnectionIndexComponent;
  let fixture: ComponentFixture<ConnectionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
