import React, { useEffect, useRef } from "react";

interface TickProps {
  isPhaseCompletes: boolean;
}

const Tick: React.FC<TickProps> = ({ isPhaseCompletes }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;

    if (!svg || !path) return;

    // Get the total length of the path
    const length = path.getTotalLength();

    // Initially hide the path by setting stroke-dasharray and stroke-dashoffset
    path.style.strokeDasharray = length.toString();
    path.style.strokeDashoffset = length.toString();

    // Trigger a reflow to apply initial styles
    svg.getBoundingClientRect();

    // If isPhaseCompletes is true, start the animation
    path.style.transition =
      "stroke-dashoffset 0.5s ease-out, fill 1.5s ease-in";
    if (isPhaseCompletes) {
      path.style.strokeDashoffset = "0";
      path.style.fill = "#000000";
      path.style.stroke = "#000000";
    } else {
      path.style.strokeDashoffset = length.toString();
      path.style.fill = "transparent";
    }
  }, [isPhaseCompletes]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 469.184 469.185"
      style={{
        width: "75px",
        height: "75px",
        position: "absolute",
        top: "0",
        right: "0",
        fill: "transparent",
      }}
      ref={svgRef}
    >
      <path
        d="M462.5,96.193l-21.726-21.726c-8.951-8.95-23.562-8.95-32.59,0L180.368,302.361l-119.34-119.34
          c-8.95-8.951-23.562-8.951-32.589,0L6.712,204.747c-8.95,8.951-8.95,23.562,0,32.589L163.997,394.62
          c4.514,4.514,10.327,6.809,16.218,6.809s11.781-2.295,16.219-6.809L462.27,128.783C471.45,119.68,471.45,105.145,462.5,96.193z"
        ref={pathRef}
        style={{
          stroke: "transparent",
          strokeWidth: "10px",
          strokeDasharray: "0",
        }}
      />
    </svg>
  );
};

export default Tick;
