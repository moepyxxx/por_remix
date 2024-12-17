import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "me | moepyxxx portfolio site" },
    { name: "description", content: "Welcome to moepyxxx portfolio site!" },
  ];
};

export default function Me() {
  return <div className="w-dvw h-dvh flex">this is me page</div>;
}
