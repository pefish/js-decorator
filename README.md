
## js Decorators

#### retry decorator

```js
/**
 * 函数重试。函数返回字符串 retry 则重试。只能修饰异步函数
 * @param times 重试次数
 * @param errContainStr 当错误信息中包含这个字符串，则重试
 * @param interval 重试间隔时间
 */
```

```js
class Test {
  a: number = 0

  @retry(6, `haha`)
  async test (a: string): Promise<string> {
    this.a++
    // throw new Error(`4351`)
    if (this.a !== 5) {
      throw new Error(`haha`) // trigger retry
    }
    return `1212`
  }
}

const t = new Test()
t.test(`11`).then((d) => {
  console.log(d)
}).catch((err) => {
  console.error(`err: `, err)
})

```