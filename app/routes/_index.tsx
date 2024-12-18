import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "./index.css?url";
import { Title } from "~/components/Title";
import { Fluffy } from "~/components/Fluffy";
import { useMemo, useRef, useState, type ElementRef } from "react";
import { AnimationFrameProvider } from "providers/AnimationFrameProvider";
import { Navigation } from "~/components/Navigation";

export const FLUFFY_COUNT = 60;

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

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

  const opacityClass = useMemo(
    () => (isTransition ? "opacity-0" : "opacity-1"),
    [isTransition]
  );

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
      <div className={`flex justify-center items-center ${opacityClass}`}>
        <AnimationFrameProvider>
          <div className="">
            <Title
              label="moepyxxx"
              OnEndRenderTitle={() => {
                setIsEndIntroduction(true);
              }}
            />
          </div>
        </AnimationFrameProvider>
        <div className="fixed bottom-10">
          <Navigation
            ref={navigationRef}
            onTransition={() => setIsTransition(true)}
          />
        </div>
      </div>
    </div>
  );
}
