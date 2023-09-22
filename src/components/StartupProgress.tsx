import React, { useState, useEffect } from "react";
import Phase from "./Phase";
import { PhaseProps } from "../helpers/types";
import { phasesData } from "../helpers/data";

const STORAGE_KEY = "startup-progress";

const StartupProgress: React.FC = () => {
  const initialProgress = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "null"
  );
  const [phases, setPhases] = useState<PhaseProps[]>(
    initialProgress || phasesData
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(phases));
  }, [phases]);

  // Helper function to check if the previous phase is completed
  function isPreviousPhaseCompleted(phaseIndex: number): boolean {
    if (phaseIndex === 0) {
      // If it's the first phase, consider it as completed
      return true;
    }
    return phases[phaseIndex - 1].isPhaseCompleted;
  }

  const handleTaskComplete = (phaseIndex: number, taskIndex: number) => {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].tasks[taskIndex].isCompleted = true;
    // Disable checkboxes for previous phase tasks if any task in the current phase is checked
    if (phaseIndex > 0) {
      updatedPhases[phaseIndex - 1].tasks.forEach((task) => {
        task.isDisabled = true;
      });
    }
    updatedPhases.map((phase) => console.log("complete: ", phase));

    setPhases(updatedPhases);
  };

  function handleTaskReopen(phaseIndex: number, taskIndex: number) {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].tasks[taskIndex].isCompleted = false;
    updatedPhases[phaseIndex].isPhaseCompleted = false;

    const allTasksCompleted = updatedPhases[phaseIndex].tasks.every(
      (task) => task.isCompleted === false
    );
    if (phaseIndex > 0 && allTasksCompleted) {
      updatedPhases[phaseIndex - 1].tasks.forEach((task) => {
        task.isDisabled = false;
      });
    }
    updatedPhases.map((phase) => console.log("reopen: ", phase));
    setPhases(updatedPhases);
  }

  function handlePhaseComplete(phaseIndex: number) {
    const updatedPhases = [...phases];
    updatedPhases[phaseIndex].isPhaseCompleted = true;

    if (phaseIndex > 0) {
      const previousPhase = updatedPhases[phaseIndex - 1];
      const allTasksCompleted = previousPhase.tasks.every(
        (task) => task.isCompleted
      );
      if (!allTasksCompleted) {
        updatedPhases[phaseIndex].isPhaseCompleted = false;
      }
    }

    setPhases(updatedPhases);
  }

  return (
    <div
      style={{
        maxWidth: "300px",
        width: "100%",
        background: "#ffffff",
        borderRadius: "3px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        padding: "20px 40px",
      }}
    >
      <h1>Startup Progress</h1>
      {phases.map((phase, index) => (
        <Phase
          key={index}
          title={phase.title}
          phaseNumber={index + 1}
          tasks={phase.tasks}
          isPreviousPhaseCompleted={isPreviousPhaseCompleted(index)}
          onComplete={() => handlePhaseComplete(index)}
          onTaskComplete={(taskIndex) => handleTaskComplete(index, taskIndex)}
          onTaskReopen={(taskIndex) => handleTaskReopen(index, taskIndex)}
          isPhaseCompleted={phase.isPhaseCompleted}
        />
      ))}
    </div>
  );
};

export default StartupProgress;
