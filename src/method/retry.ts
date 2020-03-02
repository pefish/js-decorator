import TimeUtil from "@pefish/js-util-time";


/**
 * 函数重试。函数返回字符串 retry 则重试。只能修饰异步函数
 * @param times 重试次数
 * @param errContainStr 当错误信息中包含这个字符串，则重试
 * @param interval 重试间隔时间
 */
export default function retry(times: number, errContainStr: string, interval: number = 2000) {
  return (target, name, descriptor) => {
    let fun = descriptor.value;
    descriptor.value = function (...args) {
      const that = this
      return new Promise((resolve, reject) => {
        async function attempt() {
          try {
            const result = await fun.apply(that, args)
            resolve(result)
          } catch (err) {
            if (err.message.indexOf(errContainStr) !== -1 && times > 0) {
              times--
              await TimeUtil.sleep(interval)
              await attempt()
            } else {
              reject(err)
            }
          }
        }
        attempt().catch((err) => {
          reject(err)
        })
      })
    }

    return descriptor
  }
}
