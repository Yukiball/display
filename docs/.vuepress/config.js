/*
 * @Author: yukiball yukiball
 * @Date: 2024-07-08 10:44:22
 * @LastEditors: yukiball yukiball
 * @LastEditTime: 2024-07-11 19:18:07
 * @FilePath: \display\docs\.vuepress\config.js
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { gitPlugin } from "@vuepress/plugin-git";
export default defineUserConfig({
  lang: "en-US",
  port: 8088,
  title: "学习ing",
  description: "LOOK AT ME",
  base: "/display/",
  theme: defaultTheme({
    logo: "/images/logo.png",
    navbar: [
      {
        text: "Promise",
        children: [
          {
            text: "手写Promise",
            link: "/promise/introPromise.md",
          },
          {
            text: "Promise/A+规范汉化版",
            link: "/promiseA",
          },
        ],
      },
      // {
      //   text: "设计模式",
      //   link: "/designPattern",
      // },
      {
        text: "手撕vue",
        children: [
          {
            text: "双向数据绑定",
            link: "/vue/双向数据绑定.md",
          },
        ],
      },
      // {
      //   text: "网络安全",
      //   link: "/designPattern",
      // },
    ],
    sidebar: {
      "/promise/": [
        {
          text: "",
          // 相对路径会自动追加子路径前缀
          children: [
            {
              text: "简单聊聊promise",
              link: "introPromise.md",
            },
            {
              text: "创建myPromise实例",
              link: "myPromise.md",
            },
            {
              text: "myPromise.then",
              link: "then.md",
            },
          ],
        },
      ],
      "/reference/": "heading",
      "/promiseA": "heading",
      "/vue/": "heading",
    },
  }),
  plugins: [
    gitPlugin({
      contributors: false,
    }),
  ],
  bundler: webpackBundler(),
});
