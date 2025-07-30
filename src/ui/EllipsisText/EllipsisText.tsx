import { useEffect, useRef, useState } from "react";
import "./EllipsisText.scss";
import { spawn } from "child_process";

interface EllipsisTextProps {
  text: string;
  className?: string;
}

const EllipsisText = ({ text, className = "" }: EllipsisTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const isOverflown = el.scrollWidth > el.clientWidth;
      setIsOverflowed(isOverflown);
    }
  }, [text]);

  return (
    <div className="container">
      <p
        ref={textRef}
        className={`text ${className} ${isOverflowed && "text__pointer"}`}
      >
        {text}
      </p>
      {isOverflowed && <p className="tooltip">{text}</p>}
    </div>
  );
};

export default EllipsisText;
