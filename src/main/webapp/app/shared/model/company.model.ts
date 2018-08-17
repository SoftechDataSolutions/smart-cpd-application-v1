import { Moment } from 'moment';

export interface ICompany {
  id?: number;
  name?: string;
  description?: string;
  notes?: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  cycledate?: Moment;
}

export const defaultValue: Readonly<ICompany> = {};
