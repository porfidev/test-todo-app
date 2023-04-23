import React, { useReducer, useState } from "react";
import "./App.css";
import {
  initialState,
  TaskActionTypes,
  tasksReducer,
} from "./reducers/tasksReducer";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./types/Task";
import { TaskStatusTypes } from "./enums/TaskStatus";
import { FormTask } from "./components/FormTask";
import { SingleTask } from "./components/SingleTask";
import { isAnyTaskOnCreate } from "./utils/isAnyTaskOnCreate";
import { isAnyTaskOnEdit } from "./utils/isAnyTaskonEdit";

function App() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialState);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const onPressCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newTask = {
      id: uuidv4(),
      task: "",
      status: TaskStatusTypes.NEW,
      order: Object.keys(tasks).length + 1,
    };

    // Prevent to add new one if a new exist
    if (isAnyTaskOnCreate(tasks)) {
      return;
    }

    dispatch({
      type: TaskActionTypes.ADD,
      payload: newTask,
    });
    setCurrentTask(newTask);
  };

  const onPressInit = () => {
    dispatch({ type: TaskActionTypes.CLEAR });
  };

  const onTypeTaskHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTask) {
      const updatedTask = { ...currentTask, task: event.target.value };
      setCurrentTask(updatedTask);
    }
  };

  const onAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentTask) {
      if (!currentTask.task) {
        return;
      }
      return dispatch({
        type: TaskActionTypes.ADD,
        payload: { ...currentTask, status: TaskStatusTypes.CREATED },
      });
    }
    setCurrentTask(null);
  };

  const onPressTask = (
    event: React.MouseEvent<HTMLDivElement>,
    selectedTask: Task
  ) => {
    const editTask: Task = { ...selectedTask, status: TaskStatusTypes.EDITING };

    if (isAnyTaskOnEdit(tasks)) {
      return;
    }
    dispatch({
      type: TaskActionTypes.SET_EDIT,
      payload: editTask,
    });
    setCurrentTask(editTask);
  };

  const onPressRemove = (
    event: React.FormEvent<HTMLButtonElement>,
    task: Task
  ) => {
    event.preventDefault();

    dispatch({
      type: TaskActionTypes.REMOVE,
      payload: task,
    });
  };

  const onPressComplete = (
    event: React.ChangeEvent<HTMLInputElement>,
    task: Task
  ) => {
    dispatch({
      type: TaskActionTypes.SET_COMPLETED,
      payload: task,
    });
  };

  const renderTask = (task: Task, key: string) => {
    if (
      task.status === TaskStatusTypes.NEW ||
      task.status === TaskStatusTypes.EDITING
    ) {
      if (currentTask) {
        return (
          <FormTask
            key={key}
            isEdit={tasks[key].status === TaskStatusTypes.EDITING}
            task={currentTask}
            onConfirmAction={onAddTask}
            onChangeAction={onTypeTaskHandler}
          />
        );
      }
    }

    if (
      task.status === TaskStatusTypes.CREATED ||
      task.status === TaskStatusTypes.COMPLETED
    ) {
      return (
        <SingleTask
          key={key}
          task={tasks[key]}
          onPressAction={onPressTask}
          onPressDelete={onPressRemove}
          onPressComplete={onPressComplete}
        />
      );
    }

    return null;
  };

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      {Object.keys(tasks).map((key) => {
        return renderTask(tasks[key], key);
      })}
      <button onClick={onPressCreate}>Crear Tarea</button>
      <button onClick={onPressInit}>Inicializar</button>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}

export default App;
