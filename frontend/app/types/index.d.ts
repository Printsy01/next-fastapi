export type Article = {
  id: number;
  title: string;
  date: string | Date;
  summary: string;
};

export type ApiResponse<T> = {
  data: T[];
  message: string;
};
