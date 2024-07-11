import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"Home\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"title\":\"Home\",\"heroImage\":\"/images/logo.png\",\"actions\":[{\"text\":\"My Promise\",\"link\":\"/promise/introPromise.md\",\"type\":\"primary\"},{\"text\":\"My Vue\",\"link\":\"/vue/双向数据绑定.md\",\"type\":\"primary\"}],\"footer\":\"MIT Licensed | Copyright © 2018-present VuePress Community\",\"footerHtml\":true},\"headers\":[],\"filePathRelative\":\"README.md\",\"git\":{\"createdTime\":1719886497000,\"updatedTime\":1720696473000}}")
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
