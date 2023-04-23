import {TaskStatusTypes} from "../enums/TaskStatus";

export type Task = {
  id: string;
  task: string;
  status: TaskStatusTypes;
  order: number;
}
