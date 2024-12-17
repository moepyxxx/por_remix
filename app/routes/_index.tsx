import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "./index.css?url";
import { Title } from "~/components/Title";
import { Fluffy } from "~/components/Fluffy";

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
      <Fluffy />
      <Title />
    </div>
  );
}
