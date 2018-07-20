import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectionListService } from '../connection-list.service';
import { Connection } from '../connection';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { ConnectionVM } from '../connectionVM';
import { Table } from 'primeng/table';
import { ViewSettings } from '../viewSettings';
import { ViewService } from '../view.service';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { SaveViewDialogComponent } from '../save-view-dialog/save-view-dialog.component';
import { ViewListEntry } from '../viewListEntry';

@Component({
  selector: 'app-connection-index',
  templateUrl: './connection-index.component.html',
  styleUrls: ['./connection-index.component.less']
})
export class ConnectionIndexComponent implements OnInit {

  constructor(private connectionListService: ConnectionListService,
    private viewService: ViewService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

    this.suspendLoadingData = true;

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

    window.setTimeout(() => this.restoreRecentView(), 0);
    this.refreshNamedViewList();
  }

  msgs: Message[] = [];

  listId = 234;
  cols: any[];
  selectedColumns: any[];
  connectionCount: number;
  connections: ConnectionVM[];
  loading: boolean = true;
  visible: boolean = true;
  suspendLoadingData: boolean = false;

  currentView: ViewSettings;
  get isCurrentViewNamedView(): boolean {
    // a named view isn't a temporary view and it has its id
    return !this.currentView.isTemporary && !(this.currentView.id === -1);
  }

  filtersVisible: boolean = false;

  savedPublicViews: MenuItem[] = [];
  savedPrivateViews: MenuItem[] = [];

  savedViews: MenuItem[] = [
    { label: 'Wspólne (publiczne)', icon: 'fa fa-users', items: this.savedPublicViews },
    { label: 'Moje (prywatne)', icon: 'fa fa-user', items: this.savedPrivateViews },
  ];


  @ViewChild("dt") dataTable: Table;
  @ViewChild("saveViewDialog") saveViewDialog: SaveViewDialogComponent;

  async loadData(event: LazyLoadEvent) {
    console.log(`Update: ${JSON.stringify(event)}`);
    if (this.suspendLoadingData) console.log(`Update cancelled as requested with suspendLoadingData`);

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




  saveCurrentAsTemporaryView = async () => {
    let viewSettings: ViewSettings = this.createViewSettings("Widok tymczasowy", false, false, true, true);

    // we must clone the whole object as sort and filters are currently references and can change
    this.currentView = JSON.parse(JSON.stringify(viewSettings));

    await this.viewService.setTemporaryView(this.currentView);

    this.messageService.add({ severity: 'info', summary: 'Widok zapisany', detail: "Bieżące ustawienia widoku zostały zapamiętane." });
  }

  restoreRecentView = async (notifyAlsoForNamed: boolean = false) => {
    let view = await this.viewService.getCurrent(this.listId);

    this.applyViewSettings(view);

    if (this.currentView.isTemporary) {
      this.messageService.add({ severity: 'info', summary: 'Widok wczytany', detail: "Ostatnio zapisany tymczasowy widok został przywrócony." });
    }
    else {
      if (notifyAlsoForNamed) {
        this.messageService.add({ severity: 'info', summary: 'Widok wczytany', detail: `Widok ${view.name} został przywrócony.` });
      }
    }

  }

  restoreBuildInView = () => {
    this.applyViewSettings(null);
    this.messageService.add({ severity: 'info', summary: 'Widok wczytany', detail: "Przywrócono fabryczne ustawienia widoku." });
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


  saveNewNamedViewOk = async () => {
    // apply to the current view
    this.currentView.name = this.saveViewDialog.viewName;
    this.currentView.isPublic = this.saveViewDialog.isViewPublic;
    this.currentView.isDefault = this.saveViewDialog.isViewDefault;

    let viewSettings = this.createViewSettings(this.saveViewDialog.viewName,
      this.saveViewDialog.isViewPublic, this.saveViewDialog.isViewDefault, false, this.saveViewDialog.saveColumnWidths);

    try {
      let returnedView = await this.viewService.saveNewNamedView(viewSettings);
      this.currentView = returnedView;
      this.messageService.add({ severity: 'info', summary: 'Widok zapisany', detail: `Bieżące ustawienia widoku zostały zapamiętane jako widok ${this.currentView.name}.` });
      this.refreshNamedViewsSettingsDisabledState();
    }
    catch (e) {
      this.messageService.add({ severity: 'error', summary: 'Nieudane', detail: `Nie udało się zapisać bieżącego widoku.` });
    }

    this.refreshNamedViewList();

  }

  saveNewNamedView = () => {
    if (this.currentView) {
      this.saveViewDialog.isNew = true;
      this.saveViewDialog.viewName = this.currentView.name;
      this.saveViewDialog.isViewPublic = this.currentView.isPublic;
      this.saveViewDialog.isViewDefault = this.currentView.isDefault;
      this.saveViewDialog.saveColumnWidths = !!this.currentView.columnRelativeWidths;
      this.saveViewDialog.ok = this.saveNewNamedViewOk;
    }

    this.saveViewDialog.show();
  }

  updateNamedViewOk = async () => {
    // apply to the current view
    this.currentView.name = this.saveViewDialog.viewName;
    this.currentView.isDefault = this.saveViewDialog.isViewDefault;

    let viewSettings = this.createViewSettings(this.saveViewDialog.viewName,
      this.saveViewDialog.isViewPublic, this.saveViewDialog.isViewDefault, false, this.saveViewDialog.saveColumnWidths, this.currentView.id);

    try {
      let returnedView = await this.viewService.updateNamedView(viewSettings);
      this.currentView = returnedView;
      this.messageService.add({ severity: 'info', summary: 'Widok zapisany', detail: `Bieżące ustawienia widoku zostały zaktualizowane.` });
    }
    catch (e) {
      this.messageService.add({ severity: 'error', summary: 'Nieudane', detail: `Nie udało się zaktualizować bieżącego widoku.` });
    }

    this.refreshNamedViewList();
  }

  updateNamedView = () => {
    if (!this.isCurrentViewNamedView) {
      return;
    }


    if (this.currentView) {
      this.saveViewDialog.isNew = false;
      this.saveViewDialog.viewName = this.currentView.name;
      this.saveViewDialog.isViewPublic = this.currentView.isPublic;
      this.saveViewDialog.isViewDefault = this.currentView.isDefault;
      this.saveViewDialog.saveColumnWidths = !!this.currentView.columnRelativeWidths;
      this.saveViewDialog.ok = this.updateNamedViewOk;
    }

    this.saveViewDialog.show();
  }

  updateViewMenuItem = { label: 'Aktualizuj bieżący', icon: 'fa fa-save', disabled: false, command: () => { this.updateNamedView(); } };
  removeViewMenuItem = { label: 'Usuń ten widok', icon: 'fa fa-minus-circle', disabled: false, command: () => { this.removeCurrentView(); } };

  manageViews: MenuItem[] = [
    { label: 'Zapisz jako nowy', icon: 'fa fa-plus-circle', command: () => { this.saveNewNamedView(); } },
    { separator: true },
    this.updateViewMenuItem,
    { separator: true },
    this.removeViewMenuItem,
    { separator: true },
    { label: 'Przywróć widok fabryczny', /*, icon: 'fa fa-minus-circle',*/ command: this.restoreBuildInView }
  ];



  /**
   * Creates a ViewSettings instance based on the current view and the specified additional parameters.
   * @param name 
   * @param isPublic 
   * @param isDefault 
   * @param isTemporary 
   * @param saveColumnWidths 
   */
  createViewSettings(name: string, isPublic: boolean, isDefault: boolean, isTemporary: boolean, saveColumnWidths: boolean, id?: number): ViewSettings {
    // saving selected columns and their order
    let currentCols = this.selectedColumns.map(x => x.field);

    // saving column widths
    let absoluteWidths: number[] = Array.from(document.querySelectorAll("#dataTable table thead tr:first-child th")).map(x => (<HTMLElement>x).offsetWidth);
    let arrayWidth: number = (<HTMLElement>document.querySelector("#dataTable table")).offsetWidth;
    let relativeWidths: number[] = absoluteWidths.map(x => (x * 100 / arrayWidth).toFixed(3)).map(x => Number(x));

    let viewSettings = <ViewSettings>{};
    viewSettings.id = id;
    viewSettings.name = name;
    viewSettings.listId = this.listId;
    viewSettings.isPublic = isPublic;
    viewSettings.isTemporary = isTemporary;
    viewSettings.isDefault = isDefault;

    viewSettings.columns = currentCols;
    viewSettings.columnRelativeWidths = saveColumnWidths ? relativeWidths : null;
    viewSettings.sort = this.dataTable.multiSortMeta;
    viewSettings.filters = this.dataTable.filters;


    // we must clone the whole object as sort and filters are currently references and can change

    viewSettings = JSON.parse(JSON.stringify(viewSettings));

    return viewSettings;
  }

  async loadNamedView(id: number) {
    try {
      let viewSettings = await this.viewService.getViewById(id);
      this.applyViewSettings(viewSettings);
    }
    catch (e) {
      this.messageService.add({ severity: 'error', summary: 'Nieudane', detail: `Nie udało się wczytać wybranego widoku.` });
      this.refreshNamedViewList();
    }
  }

  async refreshNamedViewList() {
    let menuCallback = (event) => {
      this.loadNamedView(+event.item.id)
    };

    let vle: ViewListEntry[] = await this.viewService.getViewList(this.listId);

    vle.sort((a, b) => a.name.toLocaleUpperCase().localeCompare(b.name.toLocaleUpperCase()));

    while (this.savedPrivateViews.pop());
    while (this.savedPublicViews.pop());

    vle.filter(x => !x.isPublic).forEach(x => {
      let mi: MenuItem = { label: x.name, id: x.id.toString(), command: menuCallback };
      this.savedPrivateViews.push(mi);
    });

    vle.filter(x => x.isPublic).forEach(x => {
      let mi: MenuItem = { label: x.name, id: x.id.toString(), command: menuCallback };
      this.savedPublicViews.push(mi);
    });

  }

  /**
   * Applies the specified view settings
   * @param viewSettings
   */
  applyViewSettings(viewSettings: ViewSettings) {

    if (!viewSettings) {
      viewSettings = this.getBuildInView();
      this.dataTable.reset();
    }

    this.currentView = viewSettings;

    this.refreshNamedViewsSettingsDisabledState();

    // restore visible columns and their order
    this.selectedColumns = [];
    let savedCols: string[] = viewSettings.columns;
    savedCols.map(x => this.cols.find(y => y.field === x)).forEach(x => this.selectedColumns.push(x));

    if (viewSettings.filters) {
      this.dataTable.filters = viewSettings.filters;
      this.filtersVisible = true;
    } else {
      this.dataTable.filters = {};
      this.filtersVisible = false;
    }

    // reapply filter controls values (note: this doesn't apply filters but only shows the current filtering expressions)
    this.resetFilterControls();
    for (let col in viewSettings.filters) {
      this.filterControls[col] = viewSettings.filters[col].value;
    }

    // we apply filters manually if they aren't applied by sort
    if (!this.dataTable.multiSortMeta) {
      for (let key in viewSettings.filters) {
        let value = viewSettings.filters[key];
        this.dataTable.filter(value.value, key, value.matchMode);
      }
    }



    // (suspended) we apply default sort if none is specified
    this.dataTable.multiSortMeta = viewSettings.sort; // || [{ "field": "name", "order": 1 }];


    // once bindings are updated, restore column widths
    window.setTimeout(() => {

      this.isAutoLayout = !viewSettings.columnRelativeWidths;

      let columns: HTMLElement[] = <HTMLElement[]>Array.from(document.querySelectorAll("#dataTable table thead tr:first-child th"));
      let relativeWidths: number[] = viewSettings.columnRelativeWidths;
      let arrayWidth: number = (<HTMLElement>document.querySelector("#dataTable table")).offsetWidth;

      for (let i = 0; i < columns.length; i++) {

        if (relativeWidths) {
          let absoluteWidth = relativeWidths[i] * arrayWidth / 100;
          let widthString = `${absoluteWidth}px`;
          columns[i].style.width = widthString;
        }
        else {
          if (columns[i].style.width) {
            columns[i].style.removeProperty("width");
          }
        }
      }


    }, 0);

  }

  /**
   * Returns a build-in default view, used when there's no server-side stored view
   */
  getBuildInView(): ViewSettings {

    let viewSettings = <ViewSettings>{};
    viewSettings.id = -1;
    viewSettings.name = `Widok standardowy`;
    viewSettings.listId = this.listId;
    viewSettings.isPublic = false;
    viewSettings.isTemporary = false;
    viewSettings.isDefault = false;

    // we use all columns here, can be narrowed
    viewSettings.columns = this.cols.map(x => x.field);

    viewSettings.columnRelativeWidths = null;
    viewSettings.sort = [];
    viewSettings.filters = null;

    return viewSettings;
  }


  async removeCurrentView() {

    let name = this.currentView.name;

    if (!this.isCurrentViewNamedView) {
      return;
    }

    let confirm = await this.confirmRemoveView();

    if (!confirm) {
      return;
    }

    try {
      await this.viewService.removeViewId(this.currentView.id);
      this.messageService.add({ severity: 'info', summary: 'Widok usunięty', detail: `Widok ${name} został usunięty.` });
      this.refreshNamedViewList();
      this.restoreRecentView();
    }
    catch (e) {
      this.messageService.add({ severity: 'error', summary: 'Nieudane', detail: "Nie udało się usunąć tego widoku." });
    }
  }

  confirmRemoveView(): Promise<boolean> {
    let r = new Promise<boolean>((resolve, reject) => {
      this.confirmationService.confirm({
        message: `Czy na pewno chcesz usunąć widok ${this.currentView.name}?`,
        header: "Usuwanie widoku",
        acceptLabel: "Tak",
        rejectLabel: "Nie",
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        }
      });
    });
    return r;
  }

  /** Refreshes the disabled state of menu items */
  refreshNamedViewsSettingsDisabledState() {
    let isNamed = this.isCurrentViewNamedView;
    this.updateViewMenuItem.disabled = !isNamed;
    this.removeViewMenuItem.disabled = !isNamed;
  }

  viewNameClick = () => {
    if (this.isCurrentViewNamedView) {
      this.updateNamedView();
    }
    else {
      this.saveNewNamedView();
    }
  }
}
