<template><div><!--
 * @Author: yukiball yukiball
 * @Date: 2024-07-08 17:24:52
 * @LastEditors: yukiball yukiball
 * @LastEditTime: 2024-07-15 02:01:12
 * @FilePath: \display\docs\promise\introPromise.md
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<h1 id="简单聊聊" tabindex="-1"><a class="header-anchor" href="#简单聊聊"><span>简单聊聊</span></a></h1>
<p>相信大家对 Promise 并不陌生。陌生的人请看阮大佬写的<a href="https://es6.ruanyifeng.com/#docs/promise" target="_blank" rel="noopener noreferrer">es6 权威指南 promise</a>
Promise 是异步编程的一种解决方案，可以解决曾经回调地狱等问题。
Promise 对象有两个特点。一个是对象的状态不受外界影响。另一个是一旦状态改变，就不会再变，任何时候都可以得到这个结果。
Promise 的实例上拥有很多很多的方法供我们使用，下面我们就来逐步手写一个符合 A+规范和 ES 规范的 Promise😉。</p>
<h1 id="开始手写" tabindex="-1"><a class="header-anchor" href="#开始手写"><span>开始手写</span></a></h1>
<h2 id="promise-应该长什么样" tabindex="-1"><a class="header-anchor" href="#promise-应该长什么样"><span>promise 应该长什么样？</span></a></h2>
<p>首先我们要知道，除了 then、catch、finally 是定义在 Promise 的原型上的方法以外，其他的所有方法都是静态方法（可以通过 hasOwnProperty 获取下试试看～）。同时他还有三个状态 pending、fulfilled、rejected。知道了这个我们就可以开始搭建 Promise 框架了。</p>
<p>如下所示，我们已经搭建好了一个简易 Promise 框架,这是我们能在浏览器看到的 Promise 原型与实例方法，当我们从控制台看到 promise 的时候能大致的想到 promise 应该是长成下面这个样子的。</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">const</span> <span class="token constant">PENDING</span> <span class="token operator">=</span> <span class="token string">"pending"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">FULFILLED</span> <span class="token operator">=</span> <span class="token string">"fulfilled"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">REJECTED</span> <span class="token operator">=</span> <span class="token string">"rejected"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">myPromise</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"then"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"catch"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"finally"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">static</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">static</span> <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">static</span> <span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">static</span> <span class="token function">race</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">static</span> <span class="token function">allSettled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">//ES2020</span></span>
<span class="line">  <span class="token keyword">static</span> <span class="token function">any</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// ES2021</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


