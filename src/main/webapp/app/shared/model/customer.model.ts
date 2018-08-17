import { Moment } from 'moment';
import { ICompany } from 'app/shared/model//company.model';

export const enum TYPES {
  RESIDENCE = 'RESIDENCE',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL'
}

export interface ICustomer {
  id?: number;
  normalized?: string;
  phone?: string;
  streetaddress?: string;
  postalcode?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  profilePicContentType?: string;
  profilePic?: any;
  registered?: Moment;
  lastactive?: Moment;
  points?: number;
  cycledate?: Moment;
  areaserviced?: string;
  specialities?: TYPES;
  trades?: string;
  monthYear?: string;
  licenseNumber?: string;
  company?: ICompany;
}

export const defaultValue: Readonly<ICustomer> = {};
