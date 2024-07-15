import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/promise/all__allSettled.html.vue"
const data = JSON.parse("{\"path\":\"/promise/all__allSettled.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Promise.all\",\"slug\":\"promise-all\",\"link\":\"#promise-all\",\"children\":[]},{\"level\":2,\"title\":\"MyPromise.all\",\"slug\":\"mypromise-all\",\"link\":\"#mypromise-all\",\"children\":[]},{\"level\":2,\"title\":\"Promise.allSettled\",\"slug\":\"promise-allsettled\",\"link\":\"#promise-allsettled\",\"children\":[]},{\"level\":2,\"title\":\"MyPromise.allSettled\",\"slug\":\"mypromise-allsettled\",\"link\":\"#mypromise-allsettled\",\"children\":[]}],\"filePathRelative\":\"promise/all&&allSettled.md\",\"git\":{\"createdTime\":null,\"updatedTime\":null}}")
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
