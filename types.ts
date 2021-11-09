export type Category = {
  id: number;
  name: string;
  emoji?: string;
};

export type Calendar = {
  id: number;
  name: string;
  url: string;
  categoryId: number;
};
