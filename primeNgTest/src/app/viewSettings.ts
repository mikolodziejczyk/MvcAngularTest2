import { SortMeta, FilterMetadata } from "primeng/api";

export interface ViewSettings {
    /** server-issued id of this view */
    id: number;
    listId: number;

    name: string;
    isPublic: boolean;
    isTemporary: boolean;
    isDefault: boolean;
    
    /** Visible columns and their order */
    columns: string[];

    /** Relative (to the whole table) widths of individual columns, in their order */
    columnRelativeWidths?: number[];

    sort?: SortMeta[];

    filters: { [s: string]: FilterMetadata; }

}