import comp from "/Users/yingxu.wang/Desktop/display/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":\"/images/logo.jpg\",\"actions\":[{\"text\":\"Get Started\",\"link\":\"/myPromise\",\"type\":\"primary\"}],\"footer\":\"MIT Licensed | Copyright © 2018-present VuePress Community\",\"footerHtml\":true},\"headers\":[],\"filePathRelative\":\"README.md\",\"git\":{\"createdTime\":1719886497000,\"updatedTime\":1720033471000,\"contributors\":[{\"name\":\"yingxu.wang\",\"email\":\"1354583681@qq.com\",\"commits\":1},{\"name\":\"yukiball\",\"email\":\"yukiball\",\"commits\":1}]}}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
