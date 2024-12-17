import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "./index.css?url";
import { Title } from "~/components/Title";
import { Fluffy } from "~/components/Fluffy";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "@remix-run/react";

export const FLUFFY_COUNT = 60;

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => {
  return [
    { title: "moepyxxx portfolio site" },
    { name: "description", content: "Welcome to moepyxxx portfolio site!" },
  ];
};

export default function Index() {
  const [isEndIntroduction, setIsEndIntroduction] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const [waitingPath, setWaitingPath] = useState("");
  const navigate = useNavigate();

  const handleClick = (to: string) => {
    setWaitingPath(to);
    setIsTransition(true);
  };

  const opacityClass = useMemo(
    () => (isTransition ? "opacity-0" : "opacity-1"),
    [isTransition]
  );

  return (
    <div className="flex h-screen items-center justify-center">
      {Array.from({ length: FLUFFY_COUNT }, (_, i) => i).map((i) => {
        return (
          <Fluffy
            key={i}
            id={i}
            isReady={isEndIntroduction}
            isFadeOuting={isTransition}
            onFadeOutEnd={() => {
              if (waitingPath === "") return;

              document
                .startViewTransition()
                .updateCallbackDone.then(() => navigate(waitingPath));
            }}
          />
        );
      })}
      <div className={`flex justify-center ${opacityClass}`}>
        <Title
          OnEndRenderTitle={() => {
            setIsEndIntroduction(true);
          }}
        />
        <nav className="fixed bottom-10">
          <ul className="flex gap-6">
            <li className="text-xl">
              <Link
                to="/me"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick("/me");
                }}>
                わたくし
              </Link>
            </li>
            <li className="text-xl">
              <Link to="" viewTransition>
                書きもの
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
