import { Moment } from 'moment';
import { ITopic } from 'app/shared/model//topic.model';

export interface ICourse {
  id?: number;
  title?: string;
  section?: string;
  normCourses?: string;
  description?: string;
  amount?: number;
  imageContentType?: string;
  image?: any;
  startdate?: Moment;
  enddate?: Moment;
  point?: number;
  credit?: string;
  country?: string;
  state?: string;
  topic?: ITopic;
}

export const defaultValue: Readonly<ICourse> = {};
