import { useNavigate } from "@remix-run/react";

/**
 * 必要な処理をしてページ遷移を行う
 */
export const useCustomNavigate = () => {
  const navigate = useNavigate();

  return (to: string) => {
    navigate(to);
    // このAPIがiosのブラウザで動かない…
    // document.startViewTransition().updateCallbackDone.then(() => navigate(to));
  };
};
