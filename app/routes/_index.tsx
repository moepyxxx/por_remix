import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "./index.css?url";
import { useEffect, useRef } from "react";
import { Title } from "~/components/Title";
// import { useAnimationFrame } from "providers/AnimationFrameProvider";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: "moepyxxx portfolio site" },
    { name: "description", content: "Welcome to moepyxxx portfolio site!" },
  ];
};

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  // const {} = useAnimationFrame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const title = titleRef.current;
    if (!title) return;

    canvas.width = title.clientWidth * 1.5;
    canvas.height = title.clientHeight * 3;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#F8B966");
    gradient.addColorStop(1, "#78CEDB");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 80;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(151 / 2, 187.11 / 2);
    ctx.bezierCurveTo(
      325.5 / 2,
      132.11 / 2,
      360 / 2,
      52.61 / 2,
      398 / 2,
      87.61 / 2
    );
    ctx.bezierCurveTo(
      436 / 2,
      122.61 / 2,
      259 / 2,
      257.73 / 2,
      343 / 2,
      263.25 / 2
    );
    ctx.bezierCurveTo(
      427 / 2,
      268.78 / 2,
      540 / 2,
      35.11 / 2,
      563.5 / 2,
      87.61 / 2
    );
    ctx.bezierCurveTo(
      587 / 2,
      140.11 / 2,
      560 / 2,
      239.75 / 2,
      613.5 / 2,
      271.5 / 2
    );
    ctx.bezierCurveTo(
      667 / 2,
      303.25 / 2,
      748 / 2,
      34.61 / 2,
      768.5 / 2,
      87.61 / 2
    );
    ctx.bezierCurveTo(
      789 / 2,
      140.61 / 2,
      715.5 / 2,
      282 / 2,
      757 / 2,
      281.61 / 2
    );
    ctx.bezierCurveTo(
      798.5 / 2,
      281.61 / 2,
      807.5 / 2,
      199.61 / 2,
      968 / 2,
      126.11 / 2
    );
    ctx.stroke();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mizutama mizutama1">
        <span />
        <svg width="0" height="0">
          <title>mizutama1</title>
          <defs>
            <clipPath id="mizutama1">
              <path
                className="mizutama1"
                fill="#FF0066"
                d="M51.5,-39.5C61.9,-28.2,61.9,-7,57.4,13.3C52.9,33.6,43.9,53,28.5,61.3C13,69.6,-8.9,66.7,-30.9,58.3C-52.9,49.9,-75,36.1,-82.1,15.7C-89.1,-4.6,-81,-31.4,-64.8,-44C-48.6,-56.7,-24.3,-55.3,-1.8,-53.8C20.6,-52.3,41.2,-50.8,51.5,-39.5Z"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="mizutama mizutama2">
        <span />
        <svg width="0" height="0">
          <title>mizutama2</title>
          <defs>
            <clipPath id="mizutama2">
              <path
                className="mizutama2"
                fill="#FF0066"
                d="M51.5,-39.5C61.9,-28.2,61.9,-7,57.4,13.3C52.9,33.6,43.9,53,28.5,61.3C13,69.6,-8.9,66.7,-30.9,58.3C-52.9,49.9,-75,36.1,-82.1,15.7C-89.1,-4.6,-81,-31.4,-64.8,-44C-48.6,-56.7,-24.3,-55.3,-1.8,-53.8C20.6,-52.3,41.2,-50.8,51.5,-39.5Z"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <Title />
    </div>
  );
}
