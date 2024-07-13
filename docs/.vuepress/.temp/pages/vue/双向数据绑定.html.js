import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/vue/双向数据绑定.html.vue"
const data = JSON.parse("{\"path\":\"/vue/%E5%8F%8C%E5%90%91%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.html\",\"title\":\"双向数据绑定\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"vue2.0\",\"slug\":\"vue2-0\",\"link\":\"#vue2-0\",\"children\":[{\"level\":3,\"title\":\"Step One：\",\"slug\":\"step-one\",\"link\":\"#step-one\",\"children\":[]},{\"level\":3,\"title\":\"Step Two：\",\"slug\":\"step-two\",\"link\":\"#step-two\",\"children\":[]},{\"level\":3,\"title\":\"总结\",\"slug\":\"总结\",\"link\":\"#总结\",\"children\":[]}]}],\"filePathRelative\":\"vue/双向数据绑定.md\",\"git\":{\"createdTime\":1720696473000,\"updatedTime\":1720780511000}}")
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
