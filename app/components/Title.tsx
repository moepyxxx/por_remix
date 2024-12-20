import { useAnimationFrame } from "providers/AnimationFrameProvider";
import { useEffect, useRef, type FC } from "react";

const DELAY_FRAMES = 50;
const LINE_ANIMATION_TOTAL_FRAMES = 100;
const LINE_ANIMATION_COUNT = 7;
const LINE_CANVAS_WIDTH_BASE = 1119;
const LINE_CANVAS_HEIGHT_BASE = 361;
const LINE_BORDER_WIDTH_BASE = 160;

type Props = {
  label: string;
  type?: "main" | "sub";
  OnEndRenderTitle?: () => void;
};
export const Title: FC<Props> = ({
  OnEndRenderTitle,
  label,
  type = "main",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { frame } = useAnimationFrame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const title = titleRef.current;
    if (!title) return;
    const width = title.clientWidth * 1.5;
    const height = (width * LINE_CANVAS_HEIGHT_BASE) / LINE_CANVAS_WIDTH_BASE;
    canvas.width = width;
    canvas.height = height;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bezierPoints = [
      {
        c1x: (325.5 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c1y: (132.11 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        c2x: (360 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c2y: (52.61 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        px: (398 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        py: (87.61 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
      },
      {
        c1x: (436 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c1y: (122.61 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        c2x: (259 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c2y: (257.73 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        px: (343 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        py: (263.25 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
      },
      {
        c1x: (427 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c1y: (268.78 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        c2x: (540 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c2y: (35.11 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        px: (563.5 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        py: (87.61 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
      },
      {
        c1x: (587 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c1y: (140.11 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        c2x: (560 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c2y: (239.75 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        px: (613.5 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        py: (271.5 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
      },
      {
        c1x: (667 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c1y: (303.25 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        c2x: (748 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c2y: (34.61 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        px: (768.5 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        py: (87.61 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
      },
      {
        c1x: (789 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c1y: (140.61 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        c2x: (715.5 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c2y: (282 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        px: (757 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        py: (281.61 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
      },
      {
        c1x: (798.5 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c1y: (281.61 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        c2x: (807.5 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        c2y: (199.61 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
        px: (968 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        py: (126.11 * canvas.height) / LINE_CANVAS_HEIGHT_BASE,
      },
    ];

    const progress =
      frame < DELAY_FRAMES
        ? 0
        : (frame - DELAY_FRAMES) / LINE_ANIMATION_TOTAL_FRAMES; // アニメーション中のprogressを計算

    // タイトル表示終了を知らせる
    if (progress > 1.5) {
      OnEndRenderTitle?.();
      return;
    }
    if (progress > 1) {
      return;
    }

    if (progress === 0) return;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#F8B966");
    gradient.addColorStop(1, "#78CEDB");
    ctx.strokeStyle = gradient;
    ctx.lineWidth =
      (LINE_BORDER_WIDTH_BASE * canvas.width) / LINE_CANVAS_WIDTH_BASE;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (progress === 1) {
      ctx.beginPath();
      ctx.moveTo(
        (151 * canvas.width) / LINE_CANVAS_WIDTH_BASE,
        (187.11 * canvas.height) / LINE_CANVAS_HEIGHT_BASE
      );
      for (let i = 0; i < 7; i++) {
        ctx.bezierCurveTo(
          bezierPoints[i].c1x,
          bezierPoints[i].c1y,
          bezierPoints[i].c2x,
          bezierPoints[i].c2y,
          bezierPoints[i].px,
          bezierPoints[i].py
        );
      }
      ctx.stroke();
      return;
    }

    ctx.beginPath();
    let startX = (151 * canvas.width) / LINE_CANVAS_WIDTH_BASE;
    let startY = (187.11 * canvas.height) / LINE_CANVAS_HEIGHT_BASE;
    ctx.moveTo(startX, startY);
    const { lineProgress, remainingProgress } = calculateLineProgress(
      progress,
      LINE_ANIMATION_COUNT,
      LINE_ANIMATION_TOTAL_FRAMES
    );
    for (let i = 0; i < lineProgress; i++) {
      ctx.bezierCurveTo(
        bezierPoints[i].c1x,
        bezierPoints[i].c1y,
        bezierPoints[i].c2x,
        bezierPoints[i].c2y,
        bezierPoints[i].px,
        bezierPoints[i].py
      );
      startX = bezierPoints[i].px;
      startY = bezierPoints[i].py;
    }
    if (lineProgress < LINE_ANIMATION_COUNT) {
      ctx.bezierCurveTo(
        lerp(startX, bezierPoints[lineProgress].c1x, remainingProgress),
        lerp(startY, bezierPoints[lineProgress].c1y, remainingProgress),
        lerp(startX, bezierPoints[lineProgress].c2x, remainingProgress),
        lerp(startY, bezierPoints[lineProgress].c2y, remainingProgress),
        lerp(startX, bezierPoints[lineProgress].px, remainingProgress),
        lerp(startY, bezierPoints[lineProgress].py, remainingProgress)
      );
    }
    ctx.stroke();
  }, [frame, OnEndRenderTitle]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} />
      <div className="flex flex-col items-center justify-center gap-16 absolute inset-0 my-0 mx-auto">
        <div ref={titleRef} className="w-3/4 sm:w-400">
          <h1
            className={`text-center title font-bold leading-[3.8rem] ${
              type === "main" ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"
            } text-thin-gray`}>
            {label}
          </h1>
        </div>
      </div>
    </div>
  );
};

// 線形補間
function lerp(p1: number, p2: number, progress: number) {
  return p1 + (p2 - p1) * progress;
}

function calculateLineProgress(
  progress: number,
  divisor: number,
  total: number
) {
  const unit = Math.floor(total / divisor);
  const scaledProgress = progress * (total / unit);
  const lineProgress = Math.floor(scaledProgress);
  const remainingProgress = scaledProgress - Math.floor(scaledProgress);

  return { lineProgress, remainingProgress };
}
