import { Component, OnInit } from '@angular/core';
import { ConnectionListService } from '../connection-list.service';
import { Connection } from '../connection';
import { LazyLoadEvent } from 'primeng/api';
import { ConnectionVM } from '../connectionVM';

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
  }

  ngOnInit() {

  }

  cols: any[];
  connectionCount: number;
  connections: ConnectionVM[];
  loading: boolean = false;


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
}
