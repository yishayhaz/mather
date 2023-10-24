import { useCallback, useEffect, useState } from "react";
import styles from "./style.module.scss";

export type TimerProps = {
  duration: number;
  onEnd: () => void;
  svgRadius?: number;
};

export function Timer({ duration, onEnd, svgRadius = 70 }: TimerProps) {
  const [time, setTime] = useState<number>(duration);
  const [color, setColor] = useState<string>("var(--primary-light)");

  const getCircumference = (r = svgRadius) => {
    return 2 * Math.PI * r;
  };

  const getOffset = (time: number) => {
    return (time / duration) * getCircumference();
  };

  const tick = useCallback(() => {
    if (time === 0) {
      onEnd();
      return;
    }

    setTime((prv) => prv - 1);

    const completionPercentage = (time / duration) * 100;

    if (completionPercentage <= 10) {
      setColor("var(--danger)");
    } else if (completionPercentage <= 25) {
      setColor("var(--warning)");
    } else {
      setColor("var(--success)");
    }
  }, [setTime, onEnd, time, setColor, duration]);

  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

  return (
    <div className={styles.timer}>
      <span>{time}</span>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle
          r={svgRadius}
          cx="80"
          cy="80"
          fill="transparent"
          stroke="#e0e0e0"
          stroke-width="12px"
        ></circle>
        <circle
          r="70"
          cx="80"
          cy="80"
          fill="transparent"
          stroke={color}
          stroke-linecap="round"
          stroke-width="12px"
          stroke-dasharray="439.6px"
          stroke-dashoffset={getOffset(time)}
        ></circle>
      </svg>
    </div>
  );
}
