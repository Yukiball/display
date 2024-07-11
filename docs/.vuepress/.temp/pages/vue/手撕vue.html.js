import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/vue/手撕vue.html.vue"
const data = JSON.parse("{\"path\":\"/vue/%E6%89%8B%E6%92%95vue.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"filePathRelative\":\"vue/手撕vue.md\",\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]}}")
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
