export const themeData = JSON.parse("{\"logo\":\"/images/logo.png\",\"navbar\":[{\"text\":\"Promise\",\"children\":[{\"text\":\"手写Promise\",\"link\":\"/promise/introPromise.md\"},{\"text\":\"Promise/A+规范汉化版\",\"link\":\"/promiseA\"}]},{\"text\":\"手写vue\",\"children\":[{\"text\":\"双向数据绑定\",\"link\":\"/vue/双向数据绑定.md\"}]}],\"sidebar\":{\"/promise/\":[{\"text\":\"\",\"children\":[{\"text\":\"简单聊聊promise\",\"link\":\"introPromise.md\"},{\"text\":\"创建myPromise实例\",\"link\":\"myPromise.md\"},{\"text\":\"then\",\"link\":\"then.md\"},{\"text\":\"catch&&finally\",\"link\":\"catch&&finally.md\"},{\"text\":\"resolve&&reject\",\"link\":\"resolve&&reject.md\"},{\"text\":\"all&&allSettled\",\"link\":\"all&&allSettled.md\"}]}],\"/promiseA\":\"heading\",\"/vue/\":[{\"text\":\"\",\"children\":[{\"text\":\"双向数据绑定\",\"link\":\"双向数据绑定.md\"}]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

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
