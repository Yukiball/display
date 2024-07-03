export const redirects = JSON.parse("{\"/promiseA+.html\":\"/promiseA_.html\"}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/Users/yingxu.wang/Desktop/display/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/designPattern.html", { loader: () => import(/* webpackChunkName: "designPattern.html" */"/Users/yingxu.wang/Desktop/display/docs/.vuepress/.temp/pages/designPattern.html.js"), meta: {"title":"设计模式"} }],
  ["/myPromise.html", { loader: () => import(/* webpackChunkName: "myPromise.html" */"/Users/yingxu.wang/Desktop/display/docs/.vuepress/.temp/pages/myPromise.html.js"), meta: {"title":"手写 Promise"} }],
  ["/promiseA_.html", { loader: () => import(/* webpackChunkName: "promiseA_.html" */"/Users/yingxu.wang/Desktop/display/docs/.vuepress/.temp/pages/promiseA_.html.js"), meta: {"title":"Promise/A+"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/Users/yingxu.wang/Desktop/display/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
