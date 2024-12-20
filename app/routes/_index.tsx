import type { MetaFunction } from "@remix-run/node";
import { Title } from "~/components/Title";
import { Fluffy } from "~/components/Fluffy";
import { useMemo, useRef, useState, type ElementRef } from "react";
import { AnimationFrameProvider } from "providers/AnimationFrameProvider";
import { Navigation } from "~/components/Navigation";
import { useSpring, animated } from "@react-spring/web";

export const FLUFFY_COUNT = 10;

export const meta: MetaFunction = () => {
  return [
    { title: "moepyxxx portfolio site" },
    { name: "description", content: "Welcome to moepyxxx portfolio site!" },
  ];
};

export default function Index() {
  const [isEndIntroduction, setIsEndIntroduction] = useState(false);
  const [isTransition, setIsTransition] = useState(false);

  const navigationRef = useRef<ElementRef<typeof Navigation>>(null);

  const titleFadeStyles = useMemo(
    () => (isTransition ? "opacity-0" : "opacity-1"),
    [isTransition]
  );

  const naviFadeStyles = useSpring({
    from: { opacity: isEndIntroduction ? 1 : 0 },
    to: {
      opacity: isTransition || !isEndIntroduction ? 0 : 1,
    },
    config: {
      duration: 500,
    },
  });

  return (
    <div className="flex h-screen items-center justify-center">
      {Array.from({ length: FLUFFY_COUNT }, (_, i) => i).map((i) => {
        return (
          <Fluffy
            key={i}
            id={i}
            isReady={isEndIntroduction}
            isFadeOuting={isTransition}
            onFadeOutEnd={() => {
              if (navigationRef.current) {
                navigationRef.current.transition();
              }
            }}
          />
        );
      })}
      <div className={`flex justify-center items-center ${titleFadeStyles}`}>
        <AnimationFrameProvider>
          <Title
            label="moepyxxx"
            OnEndRenderTitle={() => {
              setIsEndIntroduction(true);
            }}
          />
        </AnimationFrameProvider>
      </div>
      <animated.div style={naviFadeStyles} className="fixed bottom-10">
        <Navigation
          ref={navigationRef}
          onTransition={() => setIsTransition(true)}
        />
      </animated.div>
    </div>
  );
}
