import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model//customer.model';
import { ICourse } from 'app/shared/model//course.model';

export interface ICourseHistory {
  id?: number;
  startdate?: Moment;
  lastactivedate?: Moment;
  isactive?: boolean;
  iscompleted?: boolean;
  access?: boolean;
  customer?: ICustomer;
  course?: ICourse;
}

export const defaultValue: Readonly<ICourseHistory> = {
  isactive: false,
  iscompleted: false,
  access: false
};
