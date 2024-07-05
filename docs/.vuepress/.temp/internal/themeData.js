export const themeData = JSON.parse("{\"logo\":\"/images/logo.jpg\",\"navbar\":[{\"text\":\"Promise\",\"children\":[{\"text\":\"手写Promise\",\"link\":\"/promise/introPromise.md\"},{\"text\":\"Promise/A+规范汉化版\",\"link\":\"/promiseA+\"}]},{\"text\":\"设计模式\",\"link\":\"/designPattern\"},{\"text\":\"手写vuex\",\"link\":\"/designPattern\"},{\"text\":\"网络安全\",\"link\":\"/designPattern\"}],\"sidebar\":{\"/promise/\":[{\"text\":\"\",\"children\":[{\"text\":\"简单聊聊promise\",\"link\":\"introPromise.md\"},{\"text\":\"创建myPromise实例\",\"link\":\"myPromise.md\"},{\"text\":\"myPromise.then\",\"link\":\"then.md\"}]}],\"/reference/\":\"heading\"},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
