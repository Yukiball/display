<template><div><!--
 * @Author: yukiball yukiball
 * @Date: 2024-07-14 20:19:53
 * @LastEditors: yukiball yukiball
 * @LastEditTime: 2024-07-14 22:31:30
 * @FilePath: \display\docs\promise\resolve&&reject.md
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
-->
<h2 id="promise-resolve" tabindex="-1"><a class="header-anchor" href="#promise-resolve"><span>Promise.resolve</span></a></h2>
<p>resolve 是静态方法，其实例化对象不可调用该方法，只有类本身，以及其子类可以调用。
返回值是一个已完成的 promise。</p>
<p>写 resolve 需要考虑三点</p>
<ol>
<li>传递的 data 本来就是 promise 对象</li>
<li>传递的 data 是 promiseLike,返回新的 Promise，状态和其保持一致</li>
<li>传递的 data 是其他</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">function</span> <span class="token function">isPromiseLike</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token punctuation">(</span></span>
<span class="line">    data <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">"object"</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span></span>
<span class="line">    <span class="token keyword">typeof</span> data<span class="token punctuation">.</span>then <span class="token operator">===</span> <span class="token string">"function"</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">Promise<span class="token punctuation">.</span><span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token keyword">instanceof</span> <span class="token class-name">Promise</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> data<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPromiseLike</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      data<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mypromise-resolve" tabindex="-1"><a class="header-anchor" href="#mypromise-resolve"><span>MyPromise.resolve</span></a></h2>
<p>把方法放到我们自己写的 MyPromise 中</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyPromise</span> <span class="token punctuation">{</span></span>
<span class="line">  ……</span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token function-variable function">func</span><span class="token operator">:</span> <span class="token punctuation">(</span>res<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> rej<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    ……</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  ……</span>
<span class="line">  <span class="token keyword">static</span> <span class="token function">resolve</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span><span class="token punctuation">(</span>data <span class="token keyword">instanceof</span> <span class="token class-name">MyPromise</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> data</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MyPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span>rej<span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span><span class="token punctuation">(</span>data <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span></span>
<span class="line">        <span class="token punctuation">(</span><span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">"object"</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">"function"</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span></span>
<span class="line">        <span class="token keyword">typeof</span> data<span class="token punctuation">.</span>then <span class="token operator">===</span> <span class="token string">"function"</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">            data<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span>rej<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">res</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="promise-reject" tabindex="-1"><a class="header-anchor" href="#promise-reject"><span>Promise.reject</span></a></h2>
<p>reject 就十分简单了，不用考虑那么多，直接抛出去就好。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line">Promise<span class="token punctuation">.</span><span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">reject</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mypromise-reject" tabindex="-1"><a class="header-anchor" href="#mypromise-reject"><span>MyPromise.reject</span></a></h2>
<p>把方法放到我们自己写的 MyPromise 中</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyPromise</span> <span class="token punctuation">{</span></span>
<span class="line">  ……</span>
<span class="line">  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token function-variable function">func</span><span class="token operator">:</span> <span class="token punctuation">(</span>res<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> rej<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    ……</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  ……</span>
<span class="line">  <span class="token keyword">static</span> <span class="token function">reject</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MyPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span>rej<span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">rej</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


