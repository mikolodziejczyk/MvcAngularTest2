import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-save-view-dialog',
  templateUrl: './save-view-dialog.component.html',
  styleUrls: ['./save-view-dialog.component.less']
})
export class SaveViewDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  visible: boolean = false;
  originalViewName: string;
  @Input() isNew: boolean = false;
  @Input() viewName: string = "nazwa widoku";
  @Input() isViewPublic: boolean = false;
  @Input() isViewDefault: boolean = false;
  @Input() saveColumnWidths: boolean = false;
  

  @Input() ok : () => void = () => {};
  @Input() cancel : () => void = () => {};

  onOk = () => {
    this.visible = false;
    this.ok();
  };

  onCancel = () => {
    this.visible = false;
    this.cancel();
  };

  show() {
    this.originalViewName = this.viewName;
    this.visible = true;
  }
}
