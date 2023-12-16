import "./style.css";
import Task from "./Task";
import React from "react";
import TodoCounter from "./TodoCounter";
import InputMenu from "./InputMenu";
import useInputValue from "./hooks/use-input-value";
import Filter from "./Filter";
import { sortTasks } from "./utils/sort-tasks";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
// The application is adaptive to different screen sizes
// Tasks are not cleared after page reload
// Sortings are displayed with SVG icons;
// The "Only unCheked" filter is represented by a toggle switch

function MainScreen() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    const buffTasks = savedTasks ? JSON.parse(savedTasks) : [];
    const sortedSavedTasks = buffTasks.sort(
      (a, b) => b.dateForSort - a.dateForSort
    );
    return sortedSavedTasks;
  });

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleEditString = useCallback(
    (newExercise, index) => {
      let buffTasks = [...tasks];
      for (let i = 0; i < buffTasks.length; i++) {
        if (buffTasks[i].id === index) {
          buffTasks[i].name = newExercise;
        }
      }
      setTasks(buffTasks);
      handleSortingTask(currSort, buffTasks);
    },
    [tasks]
  );

  const [name, handleSetStatEname, setExercise] = useInputValue("");

  const handleAddExercise = () => {
    if (name.trim() === "") return;

    let task = {
      name: name.trim(),
      done: false,
      id: crypto.randomUUID(),
      date:new Date().getTime(),
      // dateForSort: new Date().getTime(),
      // date: new Date().toLocaleDateString(),
      // time: new Date().toLocaleTimeString(),
    };

    const buffTasks = [task, ...tasks];
    setTasks(buffTasks);
    setExercise("");
    handleSortingTask(currSort, buffTasks);
  };
  const handleDeleteExercise = useCallback(
    (i) => setTasks(tasks.filter((el) => el.id !== i)),
    [tasks]
  );


  /// обратить внимание!
  const handleMarkSolvedExersise = useCallback((newDone, index) => {
    setTasks((currentTasks) =>
      currentTasks.map((el) =>
        el.id === index ? { ...el, done: newDone } : el
      )
    );
  }, []);

  const [shoulFilter, setShoulFilter] = useState(false);
  const handleFilterTasks = useCallback((f) => {
    setShoulFilter(f);
  }, []);

  const [isLoadingOverlay, setIsLoadingOverlay] = useState(false);
  const handleChangeIsLoadingOverlay = useCallback(() => {
    setIsLoadingOverlay(true);
    setTimeout(() => {
      setIsLoadingOverlay(false);
    }, 300);
  }, []);

  const [currSort, setCurrSort] = useState("new");

  const handleSortingTask = useCallback((type, arr) => {
    setCurrSort(type);
    const sortedTasks = sortTasks(type, arr);
    setTasks(sortedTasks);
  }, []);

  const doneCount = useMemo(
    () => tasks.filter((task) => task.done).length,
    [tasks]
  );

  return (
    <>
      <div className={isLoading ? "spinner" : ""}>
        <div className={isLoading ? "loadBG" : ""}></div>
      </div>

      <div className="App">
        <div className="main-block">
          <TodoCounter count={doneCount} length={tasks.length} />
          <InputMenu
            string={name}
            onSetTask={handleSetStatEname}
            onAddTask={handleAddExercise}
          />

          <Filter
            onChangeIsLoadingOverlay={handleChangeIsLoadingOverlay}
            arr={tasks}
            onFilter={handleFilterTasks}
            onSort={handleSortingTask}
          />

          <div className="tasks-list-container">
            <div className={isLoadingOverlay ? "loading-overlay" : ""}></div>
            <ol className="task-list">
              {tasks
                .filter((el) => !shoulFilter || !el.done)
                .map((t) => (
                  <Task
                    key={t.id}
                    string={t.name}
                    indexEl={t.id}
                    date={t.date}
                    time={t.time}
                    onDeleteTodo={handleDeleteExercise}
                    done={t.done}
                    onDone={handleMarkSolvedExersise}
                    onEditString={handleEditString}
                  />
                ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
export default React.memo(MainScreen);
