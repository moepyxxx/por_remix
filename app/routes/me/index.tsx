import type { MetaFunction } from "@remix-run/react";
import { AnimationFrameProvider } from "providers/AnimationFrameProvider";
import { Title } from "~/components/Title";

export const meta: MetaFunction = () => {
  return [
    { title: "me | moepyxxx portfolio site" },
    { name: "description", content: "Welcome to moepyxxx portfolio site!" },
  ];
};

export default function Me() {
  return (
    <div className="flex h-screen items-center justify-center">
      <AnimationFrameProvider>
        <Title title="わたくし" />
      </AnimationFrameProvider>
    </div>
  );
}
