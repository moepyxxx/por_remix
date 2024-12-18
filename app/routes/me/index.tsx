import type { MetaFunction } from "@remix-run/react";
import { AnimationFrameProvider } from "providers/AnimationFrameProvider";
import { useState } from "react";
import { Introduction } from "~/components/Introduction";
import { Title } from "~/components/Title";

export const meta: MetaFunction = () => {
  return [
    { title: "me | moepyxxx portfolio site" },
    { name: "description", content: "Welcome to moepyxxx portfolio site!" },
  ];
};

export default function Me() {
  const [isEndIntroduction, setIsEndIntroduction] = useState(false);

  return (
    <div className="min-h-screen py-20">
      <div className="flex h-96 items-center justify-center">
        <AnimationFrameProvider>
          <Title
            label="わたくし"
            type="sub"
            OnEndRenderTitle={() => setIsEndIntroduction(true)}
          />
        </AnimationFrameProvider>
      </div>
      <div className="mx-auto space-y-20 max-w-[600px] w-10/12">
        <Introduction isReady={isEndIntroduction} />
      </div>
    </div>
  );
}
