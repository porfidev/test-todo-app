import { TaskState } from "../types/TaskState";
import { TaskStatusTypes } from "../enums/TaskStatus";

const isAnyTaskOnEdit = (tasks: TaskState) => {
  return Object.keys(tasks).some(
    (key: string) => tasks[key].status === TaskStatusTypes.EDITING
  );
};

export { isAnyTaskOnEdit };
