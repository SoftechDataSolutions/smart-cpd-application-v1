import { IQuestion } from 'app/shared/model//question.model';

export interface IChoice {
  id?: number;
  textChoice?: string;
  isanswer?: boolean;
  question?: IQuestion;
}

export const defaultValue: Readonly<IChoice> = {
  isanswer: false
};
