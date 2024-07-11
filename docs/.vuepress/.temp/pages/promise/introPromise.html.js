import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/promise/introPromise.html.vue"
const data = JSON.parse("{\"path\":\"/promise/introPromise.html\",\"title\":\"简单聊聊\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"promise 应该长什么样？\",\"slug\":\"promise-应该长什么样\",\"link\":\"#promise-应该长什么样\",\"children\":[]}],\"filePathRelative\":\"promise/introPromise.md\",\"git\":{\"createdTime\":1720200580000,\"updatedTime\":1720200580000}}")
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
