import { useState } from "react";
import "./style.css";
import React from "react";
import newSorting from "./icons/newSorting.svg";
import oldSorting from "./icons/oldSorting.svg";
import alpha from "./icons/alpha.svg";

function Filter({ onFilter, onSort, arr, onChangeIsLoadingOverlay }) {
  const [done, setDone] = useState(false);
  const [activeBut, setActiveBut] = useState(1);
  const handleAddFilter = () => {
    const newDone = !done;
    setDone(newDone);
    onFilter(newDone);
    onChangeIsLoadingOverlay();
  };

  const handleSetAlphaviteSort = () => {
    onSort("alphavite", arr);
    setActiveBut(3);
    onChangeIsLoadingOverlay();
  };

  const handleSetOldSort = () => {
    onSort("old", arr);
    setActiveBut(2);
    onChangeIsLoadingOverlay();
  };

  const handleSetNewSort = () => {
    onSort("new", arr);
    setActiveBut(1);
    onChangeIsLoadingOverlay();
  };

  return (
    <div className="sort-filter-container">
      <div className="filter">
        <span className="text-filter"> FILTER:</span>
        <div className="filter-solved-checkbox-text">
          <label className="switch">
            <input className="input-1" type="checkbox" checked={done} onChange={handleAddFilter} />
            <span className="slider round"></span>
          </label>

          <span className="name-of-filter">Only solved</span>
        </div>
      </div>

      <div className="sort">
        <button
          className={
            activeBut === 1 ? "sort-Btm" : "sort-Btm disabled-sort-btm"
          }
          onClick={handleSetNewSort}
        >
          <img src={newSorting} alt="first old date sorting" />
        </button>
        <button
          className={
            activeBut === 2 ? "sort-Btm" : "sort-Btm disabled-sort-btm"
          }
          onClick={handleSetOldSort}
        >
          <img src={oldSorting} alt="first new date sorting" />
        </button>
        <button
          className={
            activeBut === 3 ? "sort-Btm" : "sort-Btm disabled-sort-btm"
          }
          onClick={handleSetAlphaviteSort}
        >
          <img src={alpha} alt="alphavit sorting" />
        </button>
      </div>
    </div>
  );
}
export default React.memo(Filter);
