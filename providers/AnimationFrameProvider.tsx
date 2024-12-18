"use client";

import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type AnimationFrameContextValue = {
  frame: number;
};

const AnimationFrameContext = createContext<AnimationFrameContextValue>({
  frame: 0,
});

export const AnimationFrameProvider: FC<PropsWithChildren> = ({ children }) => {
  const animationIDRef = useRef<number | null>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const animation = () => {
      setFrame((prev) => prev + 1);
      animationIDRef.current = requestAnimationFrame(animation);
    };
    animation();

    return () => {
      if (animationIDRef.current) {
        cancelAnimationFrame(animationIDRef.current);
      }
    };
  }, []);

  return (
    <AnimationFrameContext.Provider
      value={{
        frame,
      }}>
      {children}
    </AnimationFrameContext.Provider>
  );
};

export const useAnimationFrame = () => {
  return useContext(AnimationFrameContext);
};
