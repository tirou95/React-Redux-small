import React, { useState } from "react";
import { useTasksContext, useTasksDispatchContext } from "../reducer/reducer";

export default function Lists() {
  const tasks = useTasksContext();
  // key id is used to identity which list is edited or deleted
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatchContext();
  let tasksContent;
  if (isEditing) {
    tasksContent = (
      <>
        <input
          value={task.activity}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: {
                ...task,
                activity: e.target.value,
              },
            });
          }}
        />
        <button
          onClick={() => {
            setIsEditing(false);
          }}
        >
          save
        </button>
      </>
    );
  } else {
    tasksContent = (
      <>
        {task.activity}
        <button
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type={"checkbox"}
        checked={task.done}
        style={{ float: "left", listStyle: "none" }}
        onChange={(e) => {
          dispatch({
            type: "changed",
            task: {
              ...task,
              done: e.target.checked,
            },
          });
        }}
      />
      {tasksContent}
      <button
        onClick={() => {
          dispatch({
            type: "deleted",
            id: task.id,
          });
        }}
      >
        Delete
      </button>
    </label>
  );
}
