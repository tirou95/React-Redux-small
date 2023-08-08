import { createContext, useContext, useReducer } from "react";

//create tasks value context and task dispatch reducer context to pass to children to use it
const taskContext = createContext(null);
const taskDispatchContext = createContext(null);

export default function Reducer({ children }) {
  // useReducer takes in intial state values and a reducer function and returns a tasks(state) and a dispatch function to call reducer function
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  // need to pass these state and dispatch function to children so that they can be used to update the state
  return (
    <taskContext.Provider value={tasks}>
      <taskDispatchContext.Provider value={dispatch}>
        {children}
      </taskDispatchContext.Provider>
    </taskContext.Provider>
  );
}

export function useTasksContext() {
  // to use the tasks state context in other components
  return useContext(taskContext);
}

export function useTasksDispatchContext() {
  // to use the tasks dispatch context in other components
  return useContext(taskDispatchContext);
}

function taskReducer(tasks, action) {
  console.log("taskreducer");
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => {
        return t.id != action.id;
      });
    }
    default:
      throw Error("Unkown action: " + action.type);
  }
}

const initialTasks = [
  { id: 0, activity: "Philosopher’s Path", done: true },
  { id: 1, activity: "Visit the temple", done: false },
  { id: 2, activity: "Drink matcha", done: false },
];
