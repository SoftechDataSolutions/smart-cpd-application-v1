import { IQuiz } from 'app/shared/model//quiz.model';

export interface IQuestion {
  id?: number;
  textQuestion?: string;
  difficulty?: string;
  quiz?: IQuiz;
}

export const defaultValue: Readonly<IQuestion> = {};
