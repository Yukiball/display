import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/designPattern.html.vue"
const data = JSON.parse("{\"path\":\"/designPattern.html\",\"title\":\"设计模式git\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"filePathRelative\":\"designPattern.md\",\"git\":{\"createdTime\":1719886497000,\"updatedTime\":1720430182000,\"contributors\":[{\"name\":\"yukiball\",\"email\":\"yukiball\",\"commits\":2}]}}")
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
