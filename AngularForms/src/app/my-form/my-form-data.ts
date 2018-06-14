export interface MyFormData {
    id: number | null; // null for add
    locationId: number; // data to preserve

    unitPrice: number | null;
    startYear: number;
    lastName: string;
    notifyViaMail: boolean;
}