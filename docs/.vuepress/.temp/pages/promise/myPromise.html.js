import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/promise/myPromise.html.vue"
const data = JSON.parse("{\"path\":\"/promise/myPromise.html\",\"title\":\"创建 myPromise 实例\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"filePathRelative\":\"promise/myPromise.md\",\"git\":{\"createdTime\":1719886497000,\"updatedTime\":1720980073000}}")
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
