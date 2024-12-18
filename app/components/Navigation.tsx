import { Link, useLocation } from "@remix-run/react";
import { useCustomNavigate } from "hooks/useCustomNavigate";
import { forwardRef, useImperativeHandle, useState, type FC } from "react";

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
      <div className="mx-10 flex justify-between items-center">
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
