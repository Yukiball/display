import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/promise/resolve__reject.html.vue"
const data = JSON.parse("{\"path\":\"/promise/resolve__reject.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Promise.resolve\",\"slug\":\"promise-resolve\",\"link\":\"#promise-resolve\",\"children\":[]},{\"level\":2,\"title\":\"MyPromise.resolve\",\"slug\":\"mypromise-resolve\",\"link\":\"#mypromise-resolve\",\"children\":[]},{\"level\":2,\"title\":\"Promise.reject\",\"slug\":\"promise-reject\",\"link\":\"#promise-reject\",\"children\":[]},{\"level\":2,\"title\":\"MyPromise.reject\",\"slug\":\"mypromise-reject\",\"link\":\"#mypromise-reject\",\"children\":[]}],\"filePathRelative\":\"promise/resolve&&reject.md\",\"git\":{\"createdTime\":1720980073000,\"updatedTime\":1720980073000}}")
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
