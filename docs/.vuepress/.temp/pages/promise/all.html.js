import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/promise/all.html.vue"
const data = JSON.parse("{\"path\":\"/promise/all.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"filePathRelative\":\"promise/all.md\",\"git\":{\"createdTime\":null,\"updatedTime\":null}}")
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
