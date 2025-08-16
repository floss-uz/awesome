// eslint-disable-next-line
export const debounce = <T extends (...args: any[]) => any>(callback: T, ms: number) => {
  let timeoutId: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.call(null, ...args);
    }, ms)
  }
}