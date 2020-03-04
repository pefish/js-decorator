import TimeUtil from "@pefish/js-util-time";
import util from 'util'

/**
 * 函数重试。函数返回字符串 retry 则重试。只能修饰异步函数
 * @param times 重试次数
 * @param errContainStrs 当错误信息中包含这些字符串其中一个，就重试
 * @param interval 重试间隔时间
 */
export default function retry(times: number, errContainStrs: string[], interval: number = 2000) {
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
            let errorMessage = util.inspect(err, false, 5)
            // if (err instanceof Error) {
            //   errorMessage = err.message
            // } else if (err instanceof String) {
            //   errorMessage = err
            // }
            // if (!errorMessage) {
            //   reject(err)
            //   return
            // }
            let isRetry = false
            for (const str of errContainStrs) {
              if (errorMessage.indexOf(str) !== -1) {
                isRetry = true
                break
              }
            }
            if (isRetry && times > 0) {
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
