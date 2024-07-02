import comp from "E:/newProject/display/docs/.vuepress/.temp/pages/myPromise.html.vue"
const data = JSON.parse("{\"path\":\"/myPromise.html\",\"title\":\"手写 Promise\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Promise 简介\",\"slug\":\"promise-简介\",\"link\":\"#promise-简介\",\"children\":[]},{\"level\":2,\"title\":\"开始手写😉\",\"slug\":\"开始手写\",\"link\":\"#开始手写\",\"children\":[{\"level\":3,\"title\":\"搭框架\",\"slug\":\"搭框架\",\"link\":\"#搭框架\",\"children\":[]}]}],\"git\":{},\"filePathRelative\":\"myPromise.md\"}")
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
