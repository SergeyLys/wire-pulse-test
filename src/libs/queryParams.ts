export const setQueryParam = (url: string, params: Record<string, any>): string => {
  const urlParams = url.match(/\?(.*)/g);
  return Object.entries(params).reduce((acc, [key, value], i) => {
    if (typeof value === 'undefined' || value === null || value.length === 0) return acc;
    const prefix = urlParams === null && i === 0 ? '?' : '&';
    const param = `${prefix}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    return acc.concat(param);
  }, url);
}