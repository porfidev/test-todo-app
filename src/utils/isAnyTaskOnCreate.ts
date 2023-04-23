import { TaskStatusTypes } from "../enums/TaskStatus";
import { TaskState } from "../types/TaskState";

const isAnyTaskOnCreate = (tasks: TaskState): boolean => {
  return Object.keys(tasks).some(
    (key: string) => tasks[key].status === TaskStatusTypes.NEW
  );
};

export { isAnyTaskOnCreate };
