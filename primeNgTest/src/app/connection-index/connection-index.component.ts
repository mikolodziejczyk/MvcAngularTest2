import { Component, OnInit } from '@angular/core';
import { ConnectionListService } from '../connection-list.service';
import { Connection } from '../connection';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-connection-index',
  templateUrl: './connection-index.component.html',
  styleUrls: ['./connection-index.component.less']
})
export class ConnectionIndexComponent implements OnInit {

  constructor(private connectionListService: ConnectionListService) { }

  ngOnInit() {
    this.loadConnections();
  }

  // allData: Connection[];
  connectionCount: number;
  connections: Connection[];
  loading: boolean = false;

  async loadConnections() {

    // try {
    //   this.allData = await this.connectionListService.getConnections();
    //   // this.connectionCount = this.allData.length;
    //   console.log(`Successfully retrieved ${this.allData.length} connections.`);
    // }
    // catch (e) {
    //   console.log(`Retrieving connections failed, ${e}`);
    // }

  }

  async loadData(event: LazyLoadEvent) {
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort in single sort mode
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    //multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    //filters: Filters object having field as key and filter value, filter matchMode as value
    //globalFilter: Value of the global filter if available
    // this.cars = //do a request to a remote datasource using a service and return the cars that match the lazy load criteria
    
    console.log(`Update: ${JSON.stringify(event)}`);

    this.loading = true;
    // window.setTimeout(() => {
    //   this.connections = this.allData.slice(event.first, event.first + event.rows);
    //   this.connectionCount = this.allData.length;
    //   this.loading = false;
    // }, 2000);

    try {
      let dataPage = await this.connectionListService.getConnectionPage(event);
      console.log(`Successfully retrieved ${dataPage.count} connections.`);
      this.connections = dataPage.rows;
      this.connectionCount = dataPage.count;
    }
    catch(e) {
      console.log(`Retrieving connections failed, ${e}`);
    }

    this.loading = false;
}
}
