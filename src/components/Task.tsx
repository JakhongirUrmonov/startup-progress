import React from "react";
import { TaskProps } from "../helpers/types";

const Task: React.FC<TaskProps> = ({
  title,
  isCompleted,
  isDisabled,
  onComplete,
  onReopen,
}) => {
  return (
    <label
      style={{
        display: "block",
        margin: "8px 0px",
        cursor: isDisabled ? "default" : "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        disabled={isDisabled}
        onChange={isCompleted ? onReopen : onComplete}
        style={{ marginRight: "10px" }}
      />
      {title}
    </label>
  );
};

export default Task;
