import { Component, OnInit } from '@angular/core';
import { ConnectionListService } from '../connection-list.service';
import { Connection } from '../connection';

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

  connections: Connection[];

  async loadConnections() {

    try {
      this.connections = await this.connectionListService.getConnections();
      console.log(`Successfully retrieved ${this.connections.length} connections.`);
    }
    catch (e) {
      console.log(`Retrieving connections failed, ${e}`);
    }

  }
}
