import comp from "/Users/yingxu.wang/Desktop/display/docs/.vuepress/.temp/pages/promise/myPromise.html.vue"
const data = JSON.parse("{\"path\":\"/promise/myPromise.html\",\"title\":\"创建 myPromise 实例\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"filePathRelative\":\"promise/myPromise.md\",\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")
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
