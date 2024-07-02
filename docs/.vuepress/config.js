import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { webpackBundler } from "@vuepress/bundler-webpack";

export default defineUserConfig({
  lang: "en-US",
  port: 8088,
  title: "学习ing",
  description: "My first VuePress Site",

  theme: defaultTheme({
    logo: "/images/logo.jpg",

    sidebar: [
      {
        text: "手写Promise",
        link: "/myPromise",
      },
      {
        text: "设计模式",
        link: "/designPattern",
      },
    ],
  }),

  bundler: webpackBundler(),
});
