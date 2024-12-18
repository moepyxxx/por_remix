import { useAnimationFrame } from "providers/AnimationFrameProvider";
import { useEffect, useRef, type FC } from "react";

const DELAY_FRAMES = 50;
const LINE_ANIMATION_TOTAL_FRAMES = 100;
const LINE_ANIMATION_COUNT = 7;

type Props = {
  title: string;
  OnEndRenderTitle?: () => void;
};
export const Title: FC<Props> = ({ OnEndRenderTitle, title }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { frame } = useAnimationFrame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const title = titleRef.current;
    if (!title) return;

    canvas.width = title.clientWidth * 1.5;
    canvas.height = title.clientHeight * 3;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
    ctx.lineWidth = 80;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (progress === 1) {
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
      return;
    }

    ctx.beginPath();
    let startX = 151 / 2;
    let startY = 187.11 / 2;
    ctx.moveTo(startX, startY);
    const { lineProgress, remainingProgress } = calculateLineProgress(
      progress,
      LINE_ANIMATION_COUNT,
      LINE_ANIMATION_TOTAL_FRAMES
    );
    for (let i = 0; i < lineProgress; i++) {
      ctx.bezierCurveTo(
        BEZIER_POINTS[i].c1x,
        BEZIER_POINTS[i].c1y,
        BEZIER_POINTS[i].c2x,
        BEZIER_POINTS[i].c2y,
        BEZIER_POINTS[i].px,
        BEZIER_POINTS[i].py
      );
      startX = BEZIER_POINTS[i].px;
      startY = BEZIER_POINTS[i].py;
    }
    if (lineProgress < LINE_ANIMATION_COUNT) {
      ctx.bezierCurveTo(
        lerp(startX, BEZIER_POINTS[lineProgress].c1x, remainingProgress),
        lerp(startY, BEZIER_POINTS[lineProgress].c1y, remainingProgress),
        lerp(startX, BEZIER_POINTS[lineProgress].c2x, remainingProgress),
        lerp(startY, BEZIER_POINTS[lineProgress].c2y, remainingProgress),
        lerp(startX, BEZIER_POINTS[lineProgress].px, remainingProgress),
        lerp(startY, BEZIER_POINTS[lineProgress].py, remainingProgress)
      );
    }
    ctx.stroke();
  }, [frame, OnEndRenderTitle]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 m-auto" />
      <div
        ref={titleRef}
        className="flex flex-col items-center gap-16 relative w-400">
        <h1 className="title font-bold text-6xl text-thin-gray">{title}</h1>
      </div>
    </>
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

const BEZIER_POINTS = [
  {
    c1x: 325.5 / 2,
    c1y: 132.11 / 2,
    c2x: 360 / 2,
    c2y: 52.61 / 2,
    px: 398 / 2,
    py: 87.61 / 2,
  },
  {
    c1x: 436 / 2,
    c1y: 122.61 / 2,
    c2x: 259 / 2,
    c2y: 257.73 / 2,
    px: 343 / 2,
    py: 263.25 / 2,
  },
  {
    c1x: 427 / 2,
    c1y: 268.78 / 2,
    c2x: 540 / 2,
    c2y: 35.11 / 2,
    px: 563.5 / 2,
    py: 87.61 / 2,
  },
  {
    c1x: 587 / 2,
    c1y: 140.11 / 2,
    c2x: 560 / 2,
    c2y: 239.75 / 2,
    px: 613.5 / 2,
    py: 271.5 / 2,
  },
  {
    c1x: 667 / 2,
    c1y: 303.25 / 2,
    c2x: 748 / 2,
    c2y: 34.61 / 2,
    px: 768.5 / 2,
    py: 87.61 / 2,
  },
  {
    c1x: 789 / 2,
    c1y: 140.61 / 2,
    c2x: 715.5 / 2,
    c2y: 282 / 2,
    px: 757 / 2,
    py: 281.61 / 2,
  },
  {
    c1x: 798.5 / 2,
    c1y: 281.61 / 2,
    c2x: 807.5 / 2,
    c2y: 199.61 / 2,
    px: 968 / 2,
    py: 126.11 / 2,
  },
];
