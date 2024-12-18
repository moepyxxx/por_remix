import {
  type ElementRef,
  useMemo,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { AnimationFrameProvider } from "providers/AnimationFrameProvider";
import { Title } from "./Title";
import { Navigation } from "./Navigation";
import { useSpring, animated } from "@react-spring/web";

type Props = PropsWithChildren & {
  title: string;
  isReady: boolean;
  onReady: () => void;
};
export const PageLayout: FC<Props> = ({
  children,
  title,
  isReady,
  onReady,
}) => {
  const [isTransition, setIsTransition] = useState(false);

  const navigationRef = useRef<ElementRef<typeof Navigation>>(null);

  const spring = useSpring({
    from: { opacity: 1, transform: "translateY(0)" },
    to: {
      opacity: isTransition ? 0 : 1,
      transform: isTransition ? "translateY(-10px)" : "translateY(0)",
    },
    config: {
      duration: 500,
    },
    onRest: () => {
      if (navigationRef.current) {
        navigationRef.current.transition();
      }
    },
  });

  const opacityClass = useMemo(
    () => (!isReady ? "opacity-0" : "opacity-1"),
    [isReady]
  );

  return (
    <animated.div style={spring} className="min-h-screen py-20">
      <div className={opacityClass}>
        <div className="fixed top-10 w-full">
          <Navigation
            ref={navigationRef}
            type="side"
            onTransition={() => setIsTransition(true)}
          />
        </div>
      </div>
      <div className="flex h-96 items-center justify-center">
        <AnimationFrameProvider>
          <Title label={title} type="sub" OnEndRenderTitle={onReady} />
        </AnimationFrameProvider>
      </div>
      {children}
    </animated.div>
  );
};
