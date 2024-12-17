import { useMemo, useState, type FC } from "react";
import "./fluffy.css";
import { useSpring, animated } from "@react-spring/web";

type Props = {
  id: number;
};
export const Fluffy: FC<Props> = ({ id }) => {
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

  return (
    <>
      <div className="mizutama mizutama1">
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
                d="M51.5,-39.5C61.9,-28.2,61.9,-7,57.4,13.3C52.9,33.6,43.9,53,28.5,61.3C13,69.6,-8.9,66.7,-30.9,58.3C-52.9,49.9,-75,36.1,-82.1,15.7C-89.1,-4.6,-81,-31.4,-64.8,-44C-48.6,-56.7,-24.3,-55.3,-1.8,-53.8C20.6,-52.3,41.2,-50.8,51.5,-39.5Z"
                style={styles}
              />
            </clipPath>
          </defs>
        </svg>
      </div>
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
