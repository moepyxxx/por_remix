import { Link, useLocation } from "@remix-run/react";
import { useCustomNavigate } from "hooks/useCustomNavigate";
import { useEffect, useState, type FC } from "react";

const MENUS = [
  {
    path: "/me",
    label: "わたくし",
  },
  {
    path: "/text",
    label: "書きもの",
  },
];

type Props = {
  onTransition: () => void;
  isTransitionEnd: boolean;
};
export const Navigation: FC<Props> = ({ onTransition, isTransitionEnd }) => {
  const [waitingPath, setWaitingPath] = useState("");
  const navigate = useCustomNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isTransitionEnd) {
      navigate(waitingPath);
    }
  }, [isTransitionEnd, navigate, waitingPath]);

  const handleClick = (to: string) => {
    setWaitingPath(to);
    onTransition();
  };

  return (
    <nav>
      <ul className="flex gap-6">
        {MENUS.map((menu) => (
          <li
            className={`text-xl ${
              menu.path === location.pathname
                ? "pointer-events-none text-gray-300"
                : ""
            }`}
            key={menu.path}>
            <Link
              to={menu.path}
              onClick={(e) => {
                e.preventDefault();
                handleClick(menu.path);
              }}>
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
