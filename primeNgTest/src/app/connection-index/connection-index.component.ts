import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectionListService } from '../connection-list.service';
import { Connection } from '../connection';
import { LazyLoadEvent } from 'primeng/api';
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
  }

  ngOnInit() {

  }

  cols: any[];
  selectedColumns: any[];
  connectionCount: number;
  connections: ConnectionVM[];
  loading: boolean = true;
  visible: boolean = true;

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


  rowClicked = (connection : Connection) => {
    alert(connection.id);
  }

  onColReorder = (event: any )=> {
    console.log(`${JSON.stringify(event.columns)}`);
    console.log(`The current columns state: ${JSON.stringify(this.selectedColumns)}`);
  }

  saveState = () => {
    console.log(`---- Simulating saving state`);
    console.log(`The current columns state:\r\n ${JSON.stringify(this.selectedColumns)}`);
    console.log(`The current sort state:\r\n ${JSON.stringify(this.dataTable.multiSortMeta)}`);
    console.log(`The current filter state:\r\n ${JSON.stringify(this.dataTable.filters)}`);
    console.log(`---- Setting the sort and filter state`);
    // this.dataTable.multiSortMeta = [{"field":"tariff","order":1},{"field":"name","order":-1}];

    // this.visible = false;
    
    // window.setTimeout( () => {
    //   this.visible = true;
    //   this.dataTable.filters = {"ppe":{"value":"480","matchMode":"contains"},"tariff":{"value":"c21","matchMode":"contains"}};
    // }, 0);
    

    // let filters = {"ppe":{"value":"480","matchMode":"contains"},"tariff":{"value":"c21","matchMode":"contains"}};
    // for (let key in filters) {
    //   let value = filters[key];
    //   this.dataTable.filter(value.value, key, value.matchMode);
    // }

    this.dataTable.filters = {"ppe":{"value":"480","matchMode":"contains"},"tariff":{"value":"c21","matchMode":"contains"}};
    this.dataTable.multiSortMeta = [{"field":"tariff","order":1},{"field":"name","order":-1}];

  }
}
