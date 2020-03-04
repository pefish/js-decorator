import { retry } from '../src/index'
import util from 'util'
export default class Test {
  a: number = 0

  @retry(6, [`haha`, `Client network socket disconnected1`])
  async test (a: string): Promise<string> {
    this.a++
    console.log(this.a)
    // throw new Error(`4351`)
    if (this.a !== 5) {
      throw new Error(`Error: Client network socket disconnected before secure TLS connection was established`)
    }
    return `1212`
  }
}

// console.log(util.inspect(new Error(`24635uethdghs`)))
const t = new Test()
t.test(`11`).then((d) => {
  console.log(d)
}).catch((err) => {
  console.error(`err: `, err)
})
