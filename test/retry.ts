import { retry } from '../src/index'

export default class Test {
  a: number = 0

  @retry(6, [`haha`, `xixi`])
  async test (a: string): Promise<string> {
    this.a++
    console.log(this.a)
    // throw new Error(`4351`)
    if (this.a !== 5) {
      throw new Error(`xixi`)
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
