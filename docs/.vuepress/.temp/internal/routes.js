export const redirects = JSON.parse("{\"/promise/catch&&finally.html\":\"/promise/catch__finally.html\",\"/promise/resolve&&reject.html\":\"/promise/resolve__reject.html\"}")

export const routes = Object.fromEntries([
  ["/designPattern.html", { loader: () => import(/* webpackChunkName: "designPattern.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/designPattern.html.js"), meta: {"title":"设计模式git"} }],
  ["/promiseA.html", { loader: () => import(/* webpackChunkName: "promiseA.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/promiseA.html.js"), meta: {"title":"Promise/A+"} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/promise/catch__finally.html", { loader: () => import(/* webpackChunkName: "promise_catch__finally.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/promise/catch__finally.html.js"), meta: {"title":""} }],
  ["/promise/introPromise.html", { loader: () => import(/* webpackChunkName: "promise_introPromise.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/promise/introPromise.html.js"), meta: {"title":"简单聊聊"} }],
  ["/promise/myPromise.html", { loader: () => import(/* webpackChunkName: "promise_myPromise.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/promise/myPromise.html.js"), meta: {"title":"创建 myPromise 实例"} }],
  ["/promise/resolve__reject.html", { loader: () => import(/* webpackChunkName: "promise_resolve__reject.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/promise/resolve__reject.html.js"), meta: {"title":""} }],
  ["/promise/then.html", { loader: () => import(/* webpackChunkName: "promise_then.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/promise/then.html.js"), meta: {"title":"Promise.then"} }],
  ["/vue/%E5%8F%8C%E5%90%91%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.html", { loader: () => import(/* webpackChunkName: "vue_双向数据绑定.html" */"E:/newProject/display/docs/.vuepress/.temp/pages/vue/双向数据绑定.html.js"), meta: {"title":"双向数据绑定"} }],
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
