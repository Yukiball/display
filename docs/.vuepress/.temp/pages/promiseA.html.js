import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/promiseA.html.vue"
const data = JSON.parse("{\"path\":\"/promiseA.html\",\"title\":\"Promise/A+\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"术语\",\"slug\":\"术语\",\"link\":\"#术语\",\"children\":[]},{\"level\":2,\"title\":\"要求\",\"slug\":\"要求\",\"link\":\"#要求\",\"children\":[{\"level\":3,\"title\":\"2.1 promise状态\",\"slug\":\"_2-1-promise状态\",\"link\":\"#_2-1-promise状态\",\"children\":[]},{\"level\":3,\"title\":\"2.2 方法then​\",\"slug\":\"_2-2-方法then​\",\"link\":\"#_2-2-方法then​\",\"children\":[]},{\"level\":3,\"title\":\"2.3 resolvePromise\",\"slug\":\"_2-3-resolvepromise\",\"link\":\"#_2-3-resolvepromise\",\"children\":[]}]},{\"level\":2,\"title\":\"笔记\",\"slug\":\"笔记\",\"link\":\"#笔记\",\"children\":[]}],\"filePathRelative\":\"promiseA.md\",\"git\":{\"createdTime\":null,\"updatedTime\":null}}")
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
