import comp from "/Users/yingxu.wang/Desktop/display/docs/.vuepress/.temp/pages/myPromise.html.vue"
const data = JSON.parse("{\"path\":\"/myPromise.html\",\"title\":\"手写 Promise\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Promise 简介\",\"slug\":\"promise-简介\",\"link\":\"#promise-简介\",\"children\":[]},{\"level\":2,\"title\":\"开始手写\",\"slug\":\"开始手写\",\"link\":\"#开始手写\",\"children\":[{\"level\":3,\"title\":\"promise 应该长什么样？\",\"slug\":\"promise-应该长什么样\",\"link\":\"#promise-应该长什么样\",\"children\":[]},{\"level\":3,\"title\":\"创建 myPromise 实例\",\"slug\":\"创建-mypromise-实例\",\"link\":\"#创建-mypromise-实例\",\"children\":[]},{\"level\":3,\"title\":\"promise.then\",\"slug\":\"promise-then\",\"link\":\"#promise-then\",\"children\":[]}]}],\"filePathRelative\":\"myPromise.md\",\"git\":{\"createdTime\":1719886497000,\"updatedTime\":1720115063000,\"contributors\":[{\"name\":\"yingxu.wang\",\"email\":\"1354583681@qq.com\",\"commits\":1},{\"name\":\"yuki\",\"email\":\"1354583681@qq.com\",\"commits\":1},{\"name\":\"yukiball\",\"email\":\"yukiball\",\"commits\":1}]}}")
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
