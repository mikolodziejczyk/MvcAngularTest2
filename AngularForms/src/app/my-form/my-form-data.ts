import { PersonNameVM } from "./PersonNameVM";
import { AddressData } from "../address/addressData";

export interface MyFormData {
    id: number | null; // null for add
    locationId: number; // data to preserve
    displayName: string; // the name of the edited element, if in edit mode

    unitPrice: number | null;
    startYear: number;
    lastName: string;
    notifyViaMail: boolean;

    extraPerson: PersonNameVM;
    recipients: string[];
    contacts: PersonNameVM[];

    address: AddressData

}
