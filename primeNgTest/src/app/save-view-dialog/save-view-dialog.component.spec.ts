import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveViewDialogComponent } from './save-view-dialog.component';

describe('SaveViewDialogComponent', () => {
  let component: SaveViewDialogComponent;
  let fixture: ComponentFixture<SaveViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
