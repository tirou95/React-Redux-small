import React, { useState } from "react";
import { useTasksDispatchContext } from "../reducer/reducer";
import "../index.css";

export default function AddBox() {
  const [text, setText] = useState("");
  let nextID = 3;
  const dispatch = useTasksDispatchContext();
  return (
    <>
      <input
        placeholder="Add Tasks"
        value={text}
        onChange={(e) => {
          setText(e.text.value);
        }}
      />
      <button
        onClick={() => {
          dispatch({
            type: "added",
            id: nextID + 1,
            text: text,
          });
        }}
      >
        Add
      </button>
    </>
  );
}
