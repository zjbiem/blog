---
layout: post
title: Puppeteer踩坑记
categories: 前端技术
description: 记录 puppeteer 使用中遇到的问题
tags: puppeteer node
---
* content
{:toc}
<div class="postImg" style="background-image:url(https://likonion-1254082995.cos.ap-chengdu.myqcloud.com/media/0*WHo7bG8yHKyt_nzn.png)"></div>
记录 puppeteer 使用中遇到的问题




### 等待请求结果

当网络请求返回太快时，用 `page.waitForResponse()` 来等待会不稳定或者会错过返回，所以使用 `page.on('response')` 来监听最可靠

```js
let resData = null;
sync function getRes (res) {
    if (res.url() === 'url' && res.status() === 200) {
        const resJson = await res.json();
        resData = resJson.data;
    }
}
page.on('response', getRes)
await page.click('selector');
for (let i = 0; i < 30; i++) {
    if (resData === null) {
        await page.waitFor(1000);
    } else {
        page.removeListener('response', getRes);
        break;
    }
}
```

### 设置页面中执行方法返回的 Promise 值

```js
const result = await page.$eval('selector', () => {
    return Promise.resolve('value');
});
```

### 获取点击后打开的新标签页

```js
//在点击按钮之前，事先定义一个promise，用于返回新tab的page对象
const newPagePromise = new Promise(res =>
    browser.once('targetcreated',
        target => res(target.page())
    )
);
await page.$eval('a', a => a.click());
//点击按钮后，等待新tab对象
let newPage = await newPagePromise;
```

### 获取IFRAME

```js
const frameElement = await page.waitForSelector('ID or Class or other');
const iframe = await frameElement.contentFrame();
```

### `page.click()` 尽量使用页面方法替换

因为 `page.click()` 会受到页面元素遮挡的影响，所以使用页面方法中的 `click()` 成功率更高

```js
// bad
await page.click('a');
// good
await page.$eval('a', a => a.click());
```




