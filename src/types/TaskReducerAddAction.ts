import { TaskActionTypes } from "../enums/TaskActionTypes";
import { Task } from "./Task";

type TasksReducerAddAction = {
  type: TaskActionTypes;
  payload: Task;
};

export type { TasksReducerAddAction };
