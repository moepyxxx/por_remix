import { Link, useLocation } from "@remix-run/react";
import { useCustomNavigate } from "hooks/useCustomNavigate";
import { forwardRef, useImperativeHandle, useState, type FC } from "react";
// import GithubWhiteImage from "~/assets/github-mark-white.png";
import GithubImage from "~/assets/github-mark.png";

const MENUS = [
  {
    path: "/me",
    content: "わたくし",
    internal: true,
  },
  {
    path: "https://zenn.dev/moepyxxx",
    content: "書きもの",
    internal: false,
  },
  {
    path: "https://github.com/moepyxxx/por_remix",
    content: (
      <img src={GithubImage} width={28} height={28} alt="githubアイコン" />
    ),
    internal: false,
  },
];

type Props = {
  onTransition: () => void;
  type?: "main" | "side";
};

type NavigationHandle = {
  transition: () => void;
};

export const Navigation = forwardRef<NavigationHandle, Props>(
  function Navigation({ onTransition, type = "main" }: Props, ref) {
    const [waitingPath, setWaitingPath] = useState("");
    const navigate = useCustomNavigate();

    useImperativeHandle(
      ref,
      () => {
        return {
          transition() {
            navigate(waitingPath);
          },
        };
      },
      [waitingPath, navigate]
    );

    const handleClick = (to: string) => {
      setWaitingPath(to);
      onTransition();
    };

    if (type === "main") {
      return <SideNavigation handleClick={handleClick} />;
    }

    return (
      <div className="mx-5 sm:mx-10 flex justify-between items-center">
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            handleClick("/");
          }}>
          moepyxxx
        </Link>
        <SideNavigation handleClick={handleClick} />
      </div>
    );
  }
);

type SideNavigationProps = {
  handleClick: (to: string) => void;
};
const SideNavigation: FC<SideNavigationProps> = ({ handleClick }) => {
  const location = useLocation();

  return (
    <nav>
      <ul className="flex gap-3 sm:gap-6 items-center">
        {MENUS.map((menu) => (
          <li
            className={`text-base sm:text-xl ${
              menu.path === location.pathname
                ? "pointer-events-none text-gray-300"
                : ""
            }`}
            key={menu.path}>
            {menu.internal ? (
              <Link
                to={menu.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(menu.path);
                }}>
                {menu.content}
              </Link>
            ) : (
              <a href={menu.path} target="_blank" rel="noopener noreferrer">
                {menu.content}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
