import { TaskActionTypes } from "../enums/TaskActionTypes";
import { Task } from "./Task";

type TasksReducerAction = {
  type: TaskActionTypes;
  payload?: Task;
};

export type { TasksReducerAction };
