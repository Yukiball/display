import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { webpackBundler } from "@vuepress/bundler-webpack";

export default defineUserConfig({
  lang: "en-US",
  port: 8088,
  title: "学习ing",
  description: "LOOK AT ME",

  theme: defaultTheme({
    logo: "/images/logo.jpg",
    navbar: [
      {
        text: "Promise",
        children: [
          {
            text: "手写Promise",
            link: "/myPromise",
          },
          {
            text: "Promise/A+规范汉化版",
            link: "/promiseA+",
          },
        ],
      },
      {
        text: "设计模式",
        link: "/designPattern",
      },
      {
        text: "手写vuex",
        link: "/designPattern",
      },
      {
        text: "网络安全",
        link: "/designPattern",
      },
    ],
  }),

  bundler: webpackBundler(),
});
