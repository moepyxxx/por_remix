import { useState, type FC, type PropsWithChildren } from "react";
import { AnimationFrameProvider } from "providers/AnimationFrameProvider";
import { Title } from "./Title";
import { Navigation } from "./Navigation";
import { useSpring, animated } from "@react-spring/web";

type Props = PropsWithChildren & {
  title: string;
  onReady: () => void;
};
export const PageLayout: FC<Props> = ({ children, title, onReady }) => {
  const [isTransition, setIsTransition] = useState(false);
  const [isEndTransition, setIsEndTransition] = useState(false);

  const spring = useSpring({
    from: { opacity: 1, transform: "translateY(0)" },
    to: {
      opacity: isTransition ? 0 : 1,
      transform: isTransition ? "translateY(-10px)" : "translateY(0)",
    },
    config: {
      duration: 500,
    },
    onRest: () => setIsEndTransition(true),
  });
  return (
    <animated.div style={spring} className="min-h-screen py-20">
      <div className="fixed top-10 right-10">
        <Navigation
          onTransition={() => setIsTransition(true)}
          isTransitionEnd={isEndTransition}
        />
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
