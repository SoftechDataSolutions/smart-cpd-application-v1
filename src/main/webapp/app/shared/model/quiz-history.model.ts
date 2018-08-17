import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model//customer.model';
import { IQuiz } from 'app/shared/model//quiz.model';

export interface IQuizHistory {
  id?: number;
  start?: Moment;
  passed?: boolean;
  customer?: ICustomer;
  quiz?: IQuiz;
}

export const defaultValue: Readonly<IQuizHistory> = {
  passed: false
};
