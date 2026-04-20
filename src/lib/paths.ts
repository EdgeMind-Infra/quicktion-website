/**
 * 拼接带 base 前缀的 URL 路径。
 *
 * `import.meta.env.BASE_URL` 的末尾斜杠行为不稳定：
 * - `base: '/quicktion-website'` → `BASE_URL = '/quicktion-website'`（无末尾 /）
 * - `base: '/quicktion-website/'` → `BASE_URL = '/quicktion-website/'`
 * 为避免 `` `${BASE_URL}foo` `` 产生 `/quicktion-websitefoo` 这种 bug，
 * 总是在中间显式加 `/` 再折叠连续斜杠。
 */
export const withBase = (path: string): string =>
  `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, "/");
