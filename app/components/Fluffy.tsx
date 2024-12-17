import { useMemo, useState, type FC } from "react";
import "./fluffy.css";
import { useSpring, animated } from "@react-spring/web";

type Props = {
  id: number;
  isReady: boolean;
};
export const Fluffy: FC<Props> = ({ id, isReady }) => {
  const [startPosition, setStartPosition] = useState({
    x: Math.floor(Math.random() * window.innerWidth) + 1,
    y: Math.floor(Math.random() * window.innerHeight) + 1,
  });
  const [endPosition, setEndPosition] = useState(() => {
    const isX = Math.random() >= 0.5;
    const isZero = Math.random() >= 0.5;
    if (isX && isZero) {
      return {
        x: 0,
        y: Math.floor(Math.random() * window.innerHeight) + 1,
      };
    }
    if (isX && !isZero) {
      return {
        x: window.innerWidth,
        y: Math.floor(Math.random() * window.innerHeight) + 1,
      };
    }
    if (!isX && isZero) {
      return {
        x: Math.floor(Math.random() * window.innerWidth) + 1,
        y: 0,
      };
    }
    if (!isX && !isZero) {
      return {
        x: Math.floor(Math.random() * window.innerWidth) + 1,
        y: window.innerHeight,
      };
    }
    return {
      x: 0,
      y: 0,
    };
  });

  const shape = useMemo(
    () => FLUFFY_SHAPES[Math.floor(Math.random() * FLUFFY_SHAPES.length)],
    []
  );
  const scale = useMemo(() => getRandomScale(), []);

  const styles = useSpring({
    from: {
      transform: `translate(${startPosition.x}px, ${startPosition.y}px) scale(${scale}) rotate(0deg)`,
    },
    to: {
      transform: `translate(${endPosition.x}px, ${endPosition.y}px) scale(${scale}) rotate(360deg)`,
    },
    reset: true,
    config: {
      duration: getDistance(startPosition, endPosition) / 0.1,
    },
    onRest: () => {
      setStartPosition({
        x: endPosition.x,
        y: endPosition.y,
      });

      const possibleSides = [
        {
          side: "left",
          x: 0,
          y: Math.floor(Math.random() * window.innerHeight),
        },
        {
          side: "right",
          x: window.innerWidth,
          y: Math.floor(Math.random() * window.innerHeight),
        },
        { side: "top", x: Math.floor(Math.random() * window.innerWidth), y: 0 },
        {
          side: "bottom",
          x: Math.floor(Math.random() * window.innerWidth),
          y: window.innerHeight,
        },
      ];

      let filteredSides = possibleSides;

      if (endPosition.x === 0) {
        filteredSides = possibleSides.filter((side) => side.side !== "left");
      } else if (endPosition.x === window.innerWidth) {
        filteredSides = possibleSides.filter((side) => side.side !== "right");
      } else if (endPosition.y === 0) {
        filteredSides = possibleSides.filter((side) => side.side !== "top");
      } else if (endPosition.y === window.innerHeight) {
        filteredSides = possibleSides.filter((side) => side.side !== "bottom");
      }

      // ランダムに次の候補を選択
      const nextPosition =
        filteredSides[Math.floor(Math.random() * filteredSides.length)];

      setEndPosition({
        x: nextPosition.x,
        y: nextPosition.y,
      });
    },
  });

  const opacityStyles = useSpring({
    opacity: isReady ? 1 : 0,
    config: { duration: 2000 },
  });

  return (
    <>
      <animated.div className="mizutama mizutama1" style={opacityStyles}>
        <span
          style={{
            clipPath: `url(#mizutama${id})`,
          }}
        />
        <svg width="0" height="0">
          <title>mizutama{id}</title>
          <defs>
            <clipPath id={`mizutama${id}`}>
              <animated.path
                className={`mizutama${id}`}
                fill="#FF0066"
                d={shape}
                style={{
                  ...styles,
                }}
              />
            </clipPath>
          </defs>
        </svg>
      </animated.div>
    </>
  );
};

function getDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function getRandomScale() {
  return Math.random() * (1 - 0.05) + 0.05;
}

const FLUFFY_SHAPES = [
  "M51.5,-39.5C61.9,-28.2,61.9,-7,57.4,13.3C52.9,33.6,43.9,53,28.5,61.3C13,69.6,-8.9,66.7,-30.9,58.3C-52.9,49.9,-75,36.1,-82.1,15.7C-89.1,-4.6,-81,-31.4,-64.8,-44C-48.6,-56.7,-24.3,-55.3,-1.8,-53.8C20.6,-52.3,41.2,-50.8,51.5,-39.5Z",
  "M54.5,-65C69.3,-52.6,79,-34.1,81.5,-15.1C83.9,3.8,79,23.3,68.6,38.1C58.3,53,42.5,63.3,24.5,71.6C6.6,80,-13.7,86.5,-29.3,80.7C-44.9,74.9,-56,56.8,-64.7,38.8C-73.4,20.7,-79.9,2.8,-77.3,-13.9C-74.7,-30.5,-63,-45.9,-48.6,-58.4C-34.2,-70.8,-17.1,-80.5,1.4,-82.1C19.9,-83.7,39.7,-77.4,54.5,-65Z",
  "M50.8,-55.8C66.5,-47.4,80.3,-32,82.7,-15.1C85.1,1.8,76.1,20.3,65,35.8C53.9,51.3,40.9,63.8,26.1,67.4C11.2,70.9,-5.3,65.5,-21.4,59.4C-37.5,53.3,-53.1,46.5,-60,34.6C-66.9,22.7,-65,5.8,-61.3,-10C-57.5,-25.7,-51.8,-40.4,-41.3,-49.6C-30.7,-58.9,-15.4,-62.9,1.1,-64.2C17.6,-65.5,35.1,-64.1,50.8,-55.8Z",
  "M57.2,-65.8C73.6,-54.4,86,-35.9,89.2,-16C92.4,3.9,86.5,25.2,75.2,42.1C63.9,59.1,47.3,71.7,29.1,77.1C10.9,82.5,-8.9,80.8,-26,73.6C-43.1,66.5,-57.5,54,-61.5,39.3C-65.5,24.6,-59.2,7.6,-55.7,-9.4C-52.2,-26.4,-51.5,-43.5,-42.7,-56.3C-33.9,-69,-17,-77.4,1.7,-79.4C20.4,-81.5,40.8,-77.2,57.2,-65.8Z",
];
