export interface ITopic {
  id?: number;
  name?: string;
  description?: string;
  imageContentType?: string;
  image?: any;
}

export const defaultValue: Readonly<ITopic> = {};
