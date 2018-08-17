import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model//customer.model';
import { IQuestion } from 'app/shared/model//question.model';

export interface IQuestionHistory {
  id?: number;
  timestamp?: Moment;
  correct?: boolean;
  customer?: ICustomer;
  question?: IQuestion;
}

export const defaultValue: Readonly<IQuestionHistory> = {
  correct: false
};
