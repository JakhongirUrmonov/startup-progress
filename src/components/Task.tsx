import React from "react";

interface TaskProps {
  title: string;
  isCompleted: boolean;
  isDisabled: boolean; // Add a prop to disable the task completion
  onComplete: () => void;
  onReopen: () => void;
}

const Task: React.FC<TaskProps> = ({
  title,
  isCompleted,
  isDisabled,
  onComplete,
  onReopen,
}) => {
  return (
    <label style={{ display: "block", margin: "8px 0px" }}>
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
