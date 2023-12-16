import { useCallback } from "react";
import "./style.css";
import React from "react";
 function InputMenu({ string, onSetTask, onAddTask }) {
  const handleSetStateTask = useCallback((e) => {
    onSetTask(e);
  }, []);
  const handleAddExercise = () => {
    onAddTask();
  };

  return (
    <div className="input-container">
      <input
        placeholder={string == "" ? "Enter a task" : ""}
        value={string}
        type="text"
        className="input-area"
        onChange={handleSetStateTask}
      ></input>
      <button
        className="input-button"
        disabled={string.trim() === ""}
        onClick={handleAddExercise}
      >
        Add Task
      </button>
    </div>
  );
}
export default React.memo(InputMenu)
