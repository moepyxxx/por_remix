import { useState } from "react";
import { PageLayout } from "~/components/PageLayout";

export default function Text() {
  const [isEndIntroduction, setIsEndIntroduction] = useState(false);

  return (
    <PageLayout
      title="書きもの"
      isReady={isEndIntroduction}
      onReady={() => setIsEndIntroduction(true)}>
      <div className="mx-auto space-y-20 max-w-[600px] w-10/12">text</div>
    </PageLayout>
  );
}
