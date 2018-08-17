import { IQuiz } from 'app/shared/model//quiz.model';
import { ICourse } from 'app/shared/model//course.model';

export interface ISection {
  id?: number;
  name?: string;
  notes?: string;
  normSection?: string;
  contentContentType?: string;
  content?: any;
  quiz?: IQuiz;
  course?: ICourse;
}

export const defaultValue: Readonly<ISection> = {};
