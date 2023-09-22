import React, { useEffect } from "react";
import Task from "./Task";
import { PhaseProps } from "../helpers/types";
import Tick from "./Tick";

const Phase: React.FC<PhaseProps> = ({
  title,
  tasks,
  isPreviousPhaseCompleted,
  onComplete,
  onTaskComplete,
  onTaskReopen,
  isPhaseCompleted,
  phaseNumber,
}) => {
  useEffect(() => {
    if (tasks.every((task) => task.isCompleted) && !isPhaseCompleted) {
      onComplete();
    }
  }, [isPhaseCompleted, onComplete, tasks]);
  return (
    <div>
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            style={{
              backgroundColor: "black",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              color: "white",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "10px",
              fontSize: "1rem",
            }}
          >
            {phaseNumber}
          </span>
          {title}
        </div>
        <Tick isPhaseCompletes={isPhaseCompleted} />
      </h2>
      {tasks.map((task, index) => (
        <Task
          key={index}
          title={task.title}
          isCompleted={task.isCompleted}
          isDisabled={!isPreviousPhaseCompleted || task.isDisabled} // Disable the task completion based on the previous phase
          onComplete={() => onTaskComplete(index)}
          onReopen={() => onTaskReopen(index)}
        />
      ))}
    </div>
  );
};

export default Phase;
