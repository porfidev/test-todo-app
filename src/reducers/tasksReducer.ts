import { TaskActionTypes } from "../enums/TaskActionTypes";
import { TaskState } from "../types/TaskState";
import { TasksReducerAddAction } from "../types/TaskReducerAddAction";
import { TasksReducerAction } from "../types/TaskReducerAction";
import { TaskStatusTypes } from "../enums/TaskStatus";

const initialState: TaskState = {};

const tasksReducer = (
  state: TaskState,
  action: TasksReducerAddAction | TasksReducerAction
) => {
  switch (action.type) {
    case TaskActionTypes.ADD:
      if (action.payload) {
        return {
          ...state,
          [action.payload.id]: action.payload,
        };
      }
      throw new Error(`Invoke tasksReducer don't receive a valid payload`);
    case TaskActionTypes.SET_EDIT:
      if (action.payload) {
        return Object.keys(state).reduce((accumulator, key) => {
          return {
            ...accumulator,
            [key]: {
              ...state[key],
              status:
                state[key].id === action.payload?.id
                  ? TaskStatusTypes.EDITING
                  : state[key].status,
            },
          };
        }, {});
      }
      throw new Error(`Invoke tasksReducer don't receive a valid payload`);
    case TaskActionTypes.SET_COMPLETED:
      if (action.payload) {
        return Object.keys(state).reduce((accumulator, key) => {
          return {
            ...accumulator,
            [key]: {
              ...state[key],
              status:
                state[key].id === action.payload?.id
                  ? TaskStatusTypes.COMPLETED
                  : state[key].status,
            },
          };
        }, {});
      }
      throw new Error(`Invoke tasksReducer don't receive a valid payload`);
    case TaskActionTypes.REMOVE:
      if (action.payload) {
        const { [action.payload.id]: remove, ...rest } = state;
        return {
          ...rest,
          [action.payload.id]: {
            ...action.payload,
            status: TaskStatusTypes.DELETED,
          },
        };
      }
      throw new Error(`Invoke tasksReducer don't receive a valid payload`);
    case TaskActionTypes.CLEAR:
      return initialState;
    default:
      return state;
  }
};

export { tasksReducer, initialState, TaskActionTypes };
