import comp from "/Users/yingxu.wang/Desktop/display/docs/.vuepress/.temp/pages/designPattern.html.vue"
const data = JSON.parse("{\"path\":\"/designPattern.html\",\"title\":\"设计模式\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"filePathRelative\":\"designPattern.md\",\"git\":{\"createdTime\":1719886497000,\"updatedTime\":1719886497000,\"contributors\":[{\"name\":\"yukiball\",\"email\":\"yukiball\",\"commits\":1}]}}")
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
