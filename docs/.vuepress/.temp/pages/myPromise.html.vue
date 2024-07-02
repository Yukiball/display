<template><div><h1 id="手写-promise" tabindex="-1"><a class="header-anchor" href="#手写-promise"><span>手写 Promise</span></a></h1>
<h2 id="promise-简介" tabindex="-1"><a class="header-anchor" href="#promise-简介"><span>Promise 简介</span></a></h2>
<p>相信大家对 Promise 并不陌生。</p>
<p>Promise 是异步编程的一种解决方案，可以解决曾经回调地狱等问题。
Promise 对象有两个特点。一个是对象的状态不受外界影响。另一个是一旦状态改变，就不会再变，任何时候都可以得到这个结果。</p>
<p>Promise 的实例上拥有很多很多的方法供我们使用，下面我们就来逐步手写一个 Promise。</p>
<h2 id="开始手写" tabindex="-1"><a class="header-anchor" href="#开始手写"><span>开始手写😉</span></a></h2>
<h3 id="搭框架" tabindex="-1"><a class="header-anchor" href="#搭框架"><span>搭框架</span></a></h3>
<p>首先我们要知道，除了then、catch、finally是Promise的原型方法以外，其他的所有方法都是它的实例方法。知道了这个我们就可以开始搭建Promise框架了。</p>
<p>如下所示，我们已经搭建好了一个简易Promise框架。后面所有的改动都将在这个框架上面去填充。</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">myPromise</span> <span class="token punctuation">{</span></span>
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
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


