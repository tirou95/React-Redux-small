import React, { useState } from "react";
import { useTasksDispatchContext } from "../reducer/reducer";
import "../index.css";

export default function AddBox() {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatchContext();
  return (
    <>
      <input
        placeholder="Add Tasks"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          dispatch({
            type: "added",
            id: nextID++,
            text: text,
          });
          setText("");
        }}
      >
        Add
      </button>
    </>
  );
}

// initializing the id value globally to avoid re-initialization on each render
let nextID = 3;

