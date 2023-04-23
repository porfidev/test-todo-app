import React from "react";
import { Task } from "../types/Task";
import { TaskStatusTypes } from "../enums/TaskStatus";

type SingleTaskProps = {
  task: Task;
  onPressAction: (event: React.MouseEvent<HTMLDivElement>, task: Task) => void;
  onPressDelete: (
    event: React.MouseEvent<HTMLButtonElement>,
    task: Task
  ) => void;
  onPressComplete: (
    event: React.ChangeEvent<HTMLInputElement>,
    task: Task
  ) => void;
};

const SingleTask = ({
  task,
  onPressAction,
  onPressDelete,
  onPressComplete,
}: SingleTaskProps) => {
  return (
    <div
      style={{
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <input
        type={"checkbox"}
        checked={task.status === TaskStatusTypes.COMPLETED}
        value={task.id}
        onChange={(e) => onPressComplete(e, task)}
      />

      <div onClick={(e) => onPressAction(e, task)}>{task.task}</div>
      {/*<button onClick={(e) => onPressUp(e, task.id)}>up</button>*/}
      {/*<button onClick={(e) => onPressDown(e, task.id)}>down</button>*/}
      <button onClick={(e) => onPressDelete(e, task)}>-borrar</button>
    </div>
  );
};

export { SingleTask };
