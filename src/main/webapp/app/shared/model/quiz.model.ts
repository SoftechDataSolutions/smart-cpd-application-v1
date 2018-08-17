export interface IQuiz {
  id?: number;
  name?: string;
  difficulty?: string;
  passingscore?: number;
}

export const defaultValue: Readonly<IQuiz> = {};
