import { Moment } from 'moment';
import { ICart } from 'app/shared/model//cart.model';
import { ICourse } from 'app/shared/model//course.model';

export interface ICourseCartBridge {
  id?: number;
  timestamp?: Moment;
  cart?: ICart;
  course?: ICourse;
}

export const defaultValue: Readonly<ICourseCartBridge> = {};
