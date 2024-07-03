<template><div><h1 id="手写-promise" tabindex="-1"><a class="header-anchor" href="#手写-promise"><span>手写 Promise</span></a></h1>
<h2 id="promise-简介" tabindex="-1"><a class="header-anchor" href="#promise-简介"><span>Promise 简介</span></a></h2>
<p>相信大家对 Promise 并不陌生。陌生的人请看阮大佬写的<a href="https://es6.ruanyifeng.com/#docs/promise" target="_blank" rel="noopener noreferrer">es6权威指南promise</a>
Promise 是异步编程的一种解决方案，可以解决曾经回调地狱等问题。
Promise 对象有两个特点。一个是对象的状态不受外界影响。另一个是一旦状态改变，就不会再变，任何时候都可以得到这个结果。
Promise 的实例上拥有很多很多的方法供我们使用，下面我们就来逐步手写一个符合A+规范的 Promise😉。</p>
<h2 id="开始手写" tabindex="-1"><a class="header-anchor" href="#开始手写"><span>开始手写</span></a></h2>
<h3 id="搭框架" tabindex="-1"><a class="header-anchor" href="#搭框架"><span>搭框架</span></a></h3>
<p>首先我们要知道，除了then、catch、finally是定义在Promise的原型上的方法以外，其他的所有方法都是它的实例方法（可以通过hasOwnProperty获取下试试看～）。知道了这个我们就可以开始搭建Promise框架了。</p>
<p>如下所示，我们已经搭建好了一个简易Promise框架。后面所有的改动都将在这个框架上面去填充。</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">PENDING</span> <span class="token operator">=</span> <span class="token string">'pending'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">FULFILLED</span> <span class="token operator">=</span> <span class="token string">'fulfilled'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> <span class="token constant">REJECTED</span> <span class="token operator">=</span> <span class="token string">'rejected'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">myPromise</span> <span class="token punctuation">{</span></span>
<span class="line">  resolve<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span></span>
<span class="line">  reject<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span></span>
<span class="line">  all<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span></span>
<span class="line">  race<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span></span>
<span class="line">  allSettled<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span> <span class="token comment">//ES2020</span></span>
<span class="line">  <span class="token builtin">any</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span> <span class="token comment">// ES2021</span></span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>resolve <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>reject <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>all <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>race <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>allSettled <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token builtin">any</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"then"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"catch"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"finally"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="剖析a-规范" tabindex="-1"><a class="header-anchor" href="#剖析a-规范"><span>剖析A+规范</span></a></h3>
<h3 id="开始填充内容" tabindex="-1"><a class="header-anchor" href="#开始填充内容"><span>开始填充内容</span></a></h3>
<p>在填充之前我们要先了解promise的基础用法</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">const</span> promise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// ... some code</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token comment">/* 异步操作成功 */</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">resolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// success</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// failure</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


