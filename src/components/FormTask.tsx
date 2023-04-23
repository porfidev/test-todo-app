import { Task } from "../types/Task";
import React from "react";

type FormTaskProps = {
  task: Task;
  isEdit?: boolean;
  onConfirmAction: (
    event: React.FormEvent<HTMLFormElement>,
    taskId: string
  ) => void;
  onChangeAction: (
    event: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => void;
};
const FormTask = ({
  task,
  onConfirmAction,
  onChangeAction,
  isEdit,
}: FormTaskProps) => {
  if (task) {
    return (
      <form onSubmit={(event) => onConfirmAction(event, task.id)} key={task.id}>
        <input
          onChange={(event) => onChangeAction(event, task.id)}
          value={task.task}
          required={true}
        />
        {isEdit ? (
          <button>guardar cambios</button>
        ) : (
          <button>Agregar Tarea</button>
        )}
      </form>
    );
  }

  return null;
};

export { FormTask };
