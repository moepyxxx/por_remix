import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "./index.css?url";
import { useEffect, useRef } from "react";
// import { useAnimationFrame } from "providers/AnimationFrameProvider";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const {} = useAnimationFrame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "skyblue";
    ctx.fillRect(10, 10, 150, 100);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.strokeRect(10, 10, 150, 100);
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
      <canvas id="sketch" className="absolute" />
      <div className="flex flex-col items-center gap-16 relative">
        <h1 className="title font-bold text-6xl">hogehoge</h1>
      </div>
    </div>
  );
}
