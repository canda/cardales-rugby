export type Movement = {
  multiplier: number;
  value: number;
  date: number;
};

export type Account = {
  id?: string;
  dni?: string;
  firstname?: string;
  lastname?: string;
  movements: Movement[];
};
