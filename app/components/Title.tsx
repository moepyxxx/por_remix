import { useEffect, useRef, type FC } from "react";

export const Title: FC = () => {
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
    <>
      <canvas ref={canvasRef} className="fixed inset-0 m-auto" />
      <div
        ref={titleRef}
        className="flex flex-col items-center gap-16 relative">
        <h1 className="title font-bold text-6xl text-thin-gray">hogehoge</h1>
      </div>
    </>
  );
};
