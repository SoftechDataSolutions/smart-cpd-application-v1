import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model//customer.model';

export interface ICart {
  id?: number;
  normCart?: string;
  createddate?: Moment;
  lastactivedate?: Moment;
  amount?: number;
  checkout?: boolean;
  customer?: ICustomer;
}

export const defaultValue: Readonly<ICart> = {
  checkout: false
};
