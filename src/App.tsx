import React from "react";
import StartupProgress from "./components/StartupProgress";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        height: "100vh",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <StartupProgress />
    </div>
  );
}

export default App;
