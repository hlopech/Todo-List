import { useState } from "react";
import "./style.css";
import React from "react";
import useInputValue from "./hooks/use-input-value";

function Task({
  string,
  indexEl,
  date,
  time,
  onDeleteTodo,
  done,
  onDone,
  onEditString,
}) {
  const [isEdit, setIsEdit] = useState(false);

  const [editValue, handleSetNewString] = useInputValue(string);
  let longClick;
  const handleTouchStart = () => {
    longClick = setTimeout(() => {
      setIsEdit(true);
    }, 2000);
  };
  const handleTouchEnd = (e) => {
    clearTimeout(longClick);
  };
  const handleDoubleClick = () => {
    setIsEdit(true);
  };

  const handleCloseInputBox = () => {
    setIsEdit(false);
    onEditString(editValue, indexEl);
  };
  const handleInputEnterPress = (e) => {
    if (e.key === "Enter") {
      handleCloseInputBox();
    }
  };
  const handleDeleteTodo = () => {
    onDeleteTodo(indexEl, done);
  };
  const handleMarkSolved = (e) => {
    const done = e.target.checked;
    onDone(done, indexEl, string);
  };
  console.log(string);
  return (
    <li
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
      className={done ? "task done" : "task"}
    >
      {isEdit ? (
        <input
          className="task"
          type="text"
          value={editValue}
          onChange={handleSetNewString}
          onBlur={handleCloseInputBox}
          onKeyDown={handleInputEnterPress}
        />
      ) : (
        <span className="task-text">{string}</span>
      )}
      <div className={isEdit ? "closeCheckboxs" : "checkboxs"}>
        <input
          type="checkbox"
          className="solved-task"
          checked={done}
          onChange={handleMarkSolved}
        ></input>
        <button className="delete-task" onClick={handleDeleteTodo}></button>
        <div className="datatime">
          <span className="data">{new Date(date).toLocaleDateString()}</span>
          <span className="time">{new Date(date).toLocaleTimeString()} </span>
        </div>
      </div>
    </li>
  );
}
export default React.memo(Task);
