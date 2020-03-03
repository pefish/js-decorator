/**
 * 函数重试。函数返回字符串 retry 则重试。只能修饰异步函数
 * @param times 重试次数
 * @param errContainStrs 当错误信息中包含这些字符串其中一个，就重试
 * @param interval 重试间隔时间
 */
export default function retry(times: number, errContainStrs: string[], interval?: number): (target: any, name: any, descriptor: any) => any;
