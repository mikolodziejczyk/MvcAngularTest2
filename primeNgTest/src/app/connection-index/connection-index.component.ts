import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectionListService } from '../connection-list.service';
import { Connection } from '../connection';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { ConnectionVM } from '../connectionVM';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-connection-index',
  templateUrl: './connection-index.component.html',
  styleUrls: ['./connection-index.component.less']
})
export class ConnectionIndexComponent implements OnInit {

  constructor(private connectionListService: ConnectionListService) {

    this.cols = [
      { field: 'ppe', header: 'PPE', isSortable: true },
      { field: 'meterCode', header: 'Kod licznika', isSortable: true },
      { field: 'name', header: 'Nazwa', isSortable: true, isHtml: true },
      { field: 'tariff', header: 'Taryfa', isSortable: true },
      { field: 'company', header: 'Akronim', isSortable: false }
    ];

    this.selectedColumns = this.cols;
    this.resetFilterControls();
  }

  ngOnInit() {

  }

  cols: any[];
  selectedColumns: any[];
  connectionCount: number;
  connections: ConnectionVM[];
  loading: boolean = true;
  visible: boolean = true;

  filtersVisible: boolean = false;
  savedViews: MenuItem[] = [
    { label: 'PLENED-y', id: '1', icon: 'fa fa-users', title : "(widok wspólny)" },
    { label: 'Wg PPE', id: '2', icon: 'fa fa-users', title : "(widok wspólny)"  },
    { label: 'Tylko licznik', id: '3', icon: 'fa fa-user', title : "(widok prywatny)"  },
    { label: 'Ostatni rok', id: '3', icon: 'fa fa-user', title : "(widok prywatny)"  },
  ];

  manageViews: MenuItem[] = [
    { label: 'Zapisz jako nowy', icon: 'fa fa-plus-circle' },
    { separator: true },
    { label: 'Aktualizuj bieżący', icon: 'fa fa-save' },
    { label: 'Właściwości', icon: 'fa fa-edit' },
    { separator: true },
    { label: 'Usuń ten widok', icon: 'fa fa-minus-circle' }
  ];

  @ViewChild("dt") dataTable: Table;

  async loadData(event: LazyLoadEvent) {
    console.log(`Update: ${JSON.stringify(event)}`);

    this.loading = true;

    try {
      let dataPage = await this.connectionListService.getConnectionPage(event);
      console.log(`Successfully retrieved ${dataPage.count} connections.`);
      this.connections = dataPage.rows.map(x => new ConnectionVM(x));
      this.connectionCount = dataPage.count;
    }
    catch (e) {
      console.log(`Retrieving connections failed, ${e}`);
    }

    this.loading = false;
  }


  rowClicked = (connection: Connection) => {
    alert(connection.id);
  }

  onColReorder = (event: any) => {
    console.log(`${JSON.stringify(event.columns)}`);
    console.log(`The current columns state: ${JSON.stringify(this.selectedColumns)}`);
  }

  savedState: any;

  saveState = () => {
    console.log(`---- Saving saving state`);
    // saving selected columns and their order
    let currentCols = this.selectedColumns.map(x => x.field);

    // saving column widths
    let absoluteWidths: number[] = Array.from(document.querySelectorAll("#dataTable table thead tr:first-child th")).map(x => (<HTMLElement>x).offsetWidth);
    let arrayWidth: number = (<HTMLElement>document.querySelector("#dataTable table")).offsetWidth;
    let relativeWidths: number[] = absoluteWidths.map(x => (x * 100 / arrayWidth).toFixed(3)).map(x => Number(x));

    this.savedState = {};
    this.savedState.cols = currentCols;
    this.savedState.relativeWidths = relativeWidths;
    this.savedState.sort = this.dataTable.multiSortMeta;
    this.savedState.filters = this.dataTable.filters;



    console.log(JSON.stringify(this.savedState));

    // we must clone the whole object as sort and filters are currently references and can change
    this.savedState = JSON.parse(JSON.stringify(this.savedState));



    // let filters = {"ppe":{"value":"480","matchMode":"contains"},"tariff":{"value":"c21","matchMode":"contains"}};
    // for (let key in filters) {
    //   let value = filters[key];
    //   this.dataTable.filter(value.value, key, value.matchMode);
    // }

    // this.dataTable.filters = {"ppe":{"value":"480","matchMode":"contains"},"tariff":{"value":"c21","matchMode":"contains"}};
    // this.dataTable.multiSortMeta = [{"field":"tariff","order":1},{"field":"name","order":-1}];

  }

  loadState = (): void => {
    // we must create a clone of the saved object, otherwise the current changes will be reflected in it (the table component doesn't recreate the filters and multiSortMeta but rather alters them)
    let view = JSON.parse(JSON.stringify(this.savedState));

    console.log(`Restoring state to: ${JSON.stringify(view)}`);

    // restore visible columns and their order
    this.selectedColumns = [];
    let savedCols: string[] = view.cols;
    savedCols.map(x => this.cols.find(y => y.field === x)).forEach(x => this.selectedColumns.push(x));

    this.dataTable.filters = view.filters;

    // reapply filter controls values (note: this doesn't apply filters but only shows the current filtering expressions)
    this.resetFilterControls();
    for (let col in view.filters) {
      this.filterControls[col] = view.filters[col].value;
    }


    // we apply filters manually if they aren't applied by sort
    if (!this.dataTable.multiSortMeta) {
      for (let key in view.filters) {
        let value = view.filters[key];
        this.dataTable.filter(value.value, key, value.matchMode);
      }
    }

    // (suspended) we apply default sort if none is specified
    this.dataTable.multiSortMeta = view.sort; // || [{ "field": "name", "order": 1 }];

    let columns: HTMLElement[] = <HTMLElement[]>Array.from(document.querySelectorAll("#dataTable table thead tr:first-child th"));
    let relativeWidths: number[] = this.savedState.relativeWidths;
    let arrayWidth: number = (<HTMLElement>document.querySelector("#dataTable table")).offsetWidth;

    // once bindings are updated, restore column widths
    window.setTimeout(() => {
      for (let i = 0; i < columns.length; i++) {

        let absoluteWidth = relativeWidths[i] * arrayWidth / 100;
        let widthString = `${absoluteWidth}px`;
        columns[i].style.width = widthString;
      }
    }, 0);

  }

  isAutoLayout: boolean = false;

  filterControls: any = {};

  resetFilterControls() {
    this.filterControls = {};

    for (let col of this.cols) {
      this.filterControls[col.field] = null;
    }

    this.filterControls['global'] = null;
  }
}
