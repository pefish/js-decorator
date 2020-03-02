/**
 * 函数重试。函数返回字符串 retry 则重试。只能修饰异步函数
 * @param times 重试次数
 * @param errContainStr 当错误信息中包含这个字符串，则重试
 * @param interval 重试间隔时间
 */
export default function retry(times: number, errContainStr: string, interval?: number): (target: any, name: any, descriptor: any) => any;
