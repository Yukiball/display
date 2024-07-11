import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/promise/then.html.vue"
const data = JSON.parse("{\"path\":\"/promise/then.html\",\"title\":\"promise.then\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"then 的基础实现\",\"slug\":\"then-的基础实现\",\"link\":\"#then-的基础实现\",\"children\":[]},{\"level\":2,\"title\":\"异步情况实现\",\"slug\":\"异步情况实现\",\"link\":\"#异步情况实现\",\"children\":[]},{\"level\":2,\"title\":\"当then里面传入的是一个promise\",\"slug\":\"当then里面传入的是一个promise\",\"link\":\"#当then里面传入的是一个promise\",\"children\":[]}],\"filePathRelative\":\"promise/then.md\",\"git\":{\"createdTime\":1720200580000,\"updatedTime\":1720200580000}}")
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
