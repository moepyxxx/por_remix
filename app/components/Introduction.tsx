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
      <div className="space-y-8 sm:space-y-10">
        <animated.h2
          style={springs[0]}
          className="text-xl sm:text-2xl font-bold">
          これまでのこと
        </animated.h2>
        <animated.div style={springs[1]}>
          {EXPERIENCES.map((ex, index) => (
            <div
              key={ex.period}
              className={`flex items-center justify-start py-3 sm:py-4 border-y-slate-900 border-dashed ${
                index === 0 ? "border-y" : "border-b"
              } text-sm sm:text-base`}>
              <p className="w-40 sm:w-44 shrink-0">{ex.period}</p>
              <p>{ex.content}</p>
            </div>
          ))}
        </animated.div>
      </div>
      <div className="pace-y-7 sm:space-y-10">
        <div className="space-y-6 sm:space-y-8">
          <animated.h2
            style={springs[2]}
            className="text-xl sm:text-2xl font-bold">
            できること
          </animated.h2>
          {SKILLS.map((skill, index) => {
            return (
              <animated.div
                key={skill.title}
                style={springs[index + 3]}
                className="space-y-3 leading-loose sm:leading-relaxed">
                <h3 className="text-base sm:text-xl">{skill.title}</h3>
                <p className="text-sm sm:text-base">{skill.content}</p>
                <p className="text-slate-500 text-sm">
                  {skill.keywords.join(" / ")}
                </p>
              </animated.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const EXPERIENCES = [
  {
    period: "2017.12 - ",
    content:
      "新卒の仕事のかたわらで、独学でプログラミングを学びはじめる（画面を作るのが楽しすぎる！という感じで、当時はWebデザイナーという形でHTML/CSSやAdobeXDなどを利用していました。懐かしい）。",
  },
  {
    period: "2020.01 - 2022.02",
    content:
      "デジタルマーケティングの会社へWebのプログラミングをする人として転職。サイトフルリニューアル等の経験をしながらWordPressにがっつり触る。総合的なWebシステムの開発に興味を持ち始める。",
  },
  {
    period: "2022.03 - 2024.11",
    content:
      "人材系Saasサービスの開発に関わる。SaaSサービスのアジャイル開発を通して、フロントエンド開発、バックエンド開発、インフラ面などを体系的に学ぶ。このあたりでITに関わる基礎がすっぽ抜けていることに気づき、基本・応用情報技術者の資格を取得する。",
  },
];

const SKILLS = [
  {
    title: "Webアプリケーション開発",
    content:
      "Webサービスのアプリ開発において、アジャイル開発のいろはを一通り知っているため、チーム開発にシュッとジョインできると思います。また、フロントエンド・バックエンド問わず開発に携わってきた経験があるため、ニーズによってどちらの案件にも入れます（好きなのは……フロントエンドです！）。",
    keywords: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "Go",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    title: "Webサイト制作",
    content:
      "シンプルなWebサイトはもちろんですが、WordPressを中心とした更新性のあるサイトやそのカスタマイズが得意です。CSSやJavaScriptを中心としたアニメーションを作るのも好きです。",
    keywords: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
  },
];
