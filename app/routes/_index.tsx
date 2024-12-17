import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "./index.css?url";
import { Title } from "~/components/Title";
import { Fluffy } from "~/components/Fluffy";

const FLUFFY_COUNT = 60;

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: "moepyxxx portfolio site" },
    { name: "description", content: "Welcome to moepyxxx portfolio site!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      {Array.from({ length: FLUFFY_COUNT }, (_, i) => i).map((i) => {
        return <Fluffy key={i} id={i} />;
      })}
      <Title />
    </div>
  );
}
