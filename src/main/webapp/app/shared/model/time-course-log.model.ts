import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model//customer.model';
import { ICourse } from 'app/shared/model//course.model';

export interface ITimeCourseLog {
  id?: number;
  loggedin?: Moment;
  loggedout?: Moment;
  timespent?: number;
  customer?: ICustomer;
  course?: ICourse;
}

export const defaultValue: Readonly<ITimeCourseLog> = {};
