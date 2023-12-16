import "./style.css";
import React from "react";
function TodoCounter({ length, count }) {
  return (
    <nav className="nav">
      <div className="nav-item">All: {length}</div>
      <div className="nav-item">Solved:{count}</div>
      <div className="nav-item">
        UnSolved:
        {length - count}
      </div>
    </nav>
  );
}
export default React.memo(TodoCounter);
