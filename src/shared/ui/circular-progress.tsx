import React from "react";
import { cn } from "./utils";

const CircularProgress = ({
  size = 75,
  strokeWidth = 8,
  percentage,
  className,
  circleBaseClassName,
  circleProgressClassName,
  textClassName,
  hideText,
}: {
  size?: number;
  strokeWidth?: number;
  percentage: number;
  className?: string;
  circleBaseClassName?: string;
  circleProgressClassName?: string;
  textClassName?: string;
  hideText?: boolean;
}) => {
  const percentageText = Math.min(
    100,
    Math.max(0, Math.floor(percentage * 100)),
  );
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - percentage * circumference;

  return (
    <div
      className={cn(
        "flex justify-center items-center rounded-full  backdrop-blur bg-black/10",
        className,
      )}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className={cn("stroke-border", circleBaseClassName)}
          stroke="gray"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn(
            "stroke-blue-500 transition-all ease-out duration-500",
            circleProgressClassName,
          )}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset: offset }}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {!hideText && (
        <div
          className={cn("absolute text-xl text-white font-bold", textClassName)}
        >
          {percentageText}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
