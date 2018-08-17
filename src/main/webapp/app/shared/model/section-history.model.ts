import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model//customer.model';
import { ISection } from 'app/shared/model//section.model';

export interface ISectionHistory {
  id?: number;
  startdate?: Moment;
  lastactivedate?: Moment;
  watched?: boolean;
  customer?: ICustomer;
  section?: ISection;
}

export const defaultValue: Readonly<ISectionHistory> = {
  watched: false
};
