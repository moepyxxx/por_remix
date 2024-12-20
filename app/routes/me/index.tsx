import type { MetaFunction } from "@remix-run/react";
import { useState } from "react";
import { Introduction } from "~/components/Introduction";
import { PageLayout } from "~/components/PageLayout";

export const meta: MetaFunction = () => {
  return [
    { title: "me | moepyxxx portfolio site" },
    { name: "description", content: "Welcome to moepyxxx portfolio site!" },
  ];
};

export default function Me() {
  const [isEndIntroduction, setIsEndIntroduction] = useState(false);

  return (
    <PageLayout
      title="わたくし"
      isReady={isEndIntroduction}
      onReady={() => setIsEndIntroduction(true)}>
      <div className="mx-auto space-y-14 sm:space-y-20 max-w-[600px] w-10/12">
        <Introduction isReady={isEndIntroduction} />
      </div>
    </PageLayout>
  );
}
