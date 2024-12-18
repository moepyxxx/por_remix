import { useSprings, animated } from "@react-spring/web";
import type { FC } from "react";

type Props = {
  isReady: boolean;
};
export const Introduction: FC<Props> = ({ isReady }) => {
  const [springs] = useSprings(
    5,
    (i) => ({
      from: { opacity: 0, transform: "translateY(10px)" },
      to: {
        opacity: isReady ? 1 : 0,
        transform: isReady ? "translateY(0)" : "none",
      },
      delay: i * 300,
      config: {
        duration: 500,
      },
    }),
    [isReady]
  );
  return (
    <>
      <div className="space-y-10">
        <animated.h2 style={springs[0]} className="text-2xl font-bold">
          これまでのこと
        </animated.h2>
        <animated.div style={springs[1]}>
          <div className="flex items-center justify-start py-4 border-y-slate-900 border-dashed border-y">
            <p className="w-44 shrink-0">2017.12 - </p>
            <p>プログラミングをはじめる。</p>
          </div>
          <div className="flex items-center justify-start py-4 border-y-slate-900 border-dashed border-b">
            <p className="w-44 shrink-0">2020.01 - 2022.02</p>
            <p>デジタルマーケティングの会社でサイト制作とWordPressを学ぶ。</p>
          </div>
          <div className="flex items-center justify-start py-4 border-y-slate-900 border-dashed border-b">
            <p className="w-44 shrink-0">2022.03 - 2024.11</p>
            <p>
              人材系Saasサービスの開発に関わる。アジャイル開発の手法や、フロントエンド開発、バックエンド開発などを体系的に学ぶ。
            </p>
          </div>
        </animated.div>
      </div>
      <div className="space-y-10">
        <div className="space-y-8">
          <animated.h2 style={springs[2]} className="text-2xl font-bold">
            できること
          </animated.h2>
          <animated.div
            style={springs[3]}
            className="space-y-3 leading-relaxed">
            <h3 className="text-xl">Webアプリケーション開発</h3>
            <p>
              Webサービスのアプリ開発において、アジャイル開発のいろはを一通り知っているため、チーム開発にシュッとジョインできると思います。また、フロントエンド・バックエンド問わず開発に携わってきた経験があるため、ニーズによってどちらの案件にも入れます（好きなのは……フロントエンドです！）。
            </p>
            <p className="text-sm">
              JavaScript / TypeScript / React / Next.js / Vue.js / Go /
              PostgreSQL / MySQL
            </p>
          </animated.div>
          <animated.div
            style={springs[4]}
            className="space-y-3 leading-relaxed">
            <h3 className="text-xl">Webサイト制作</h3>
            <p>
              シンプルなWebサイトはもちろんですが、WordPressを中心とした更新性のあるサイトやそのカスタマイズが得意です。CSSやJavaScriptを中心としたアニメーションを作るのも好きです。
            </p>
            <p className="text-sm">HTML / CSS / JavaScript / PHP / WordPress</p>
          </animated.div>
        </div>
      </div>
    </>
  );
};
