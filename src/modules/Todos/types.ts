export type Todo = {
  name: string;
  id: string;
  completed: boolean;
};

export type Filter = "all" | "completed" | "current";
