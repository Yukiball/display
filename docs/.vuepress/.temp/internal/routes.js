export const redirects = JSON.parse("{\"/promiseA+.html\":\"/promiseA_.html\"}")

export const routes = Object.fromEntries([
  ["/designPattern.html", { loader: () => import(/* webpackChunkName: "designPattern.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/designPattern.html.js"), meta: {"title":"设计模式git"} }],
  ["/promiseA_.html", { loader: () => import(/* webpackChunkName: "promiseA_.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/promiseA_.html.js"), meta: {"title":"Promise/A+"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/promise/introPromise.html", { loader: () => import(/* webpackChunkName: "promise_introPromise.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/promise/introPromise.html.js"), meta: {"title":"简单聊聊"} }],
  ["/promise/myPromise.html", { loader: () => import(/* webpackChunkName: "promise_myPromise.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/promise/myPromise.html.js"), meta: {"title":"创建 myPromise 实例"} }],
  ["/promise/then.html", { loader: () => import(/* webpackChunkName: "promise_then.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/promise/then.html.js"), meta: {"title":"promise.then"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
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
