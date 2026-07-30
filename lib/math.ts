/**
 * 通用数值求解工具库。
 * 所有计算器（复利、退休、贷款等）可共享使用。
 */

/** 通用二分法求根器。在区间 [lo, hi] 上寻找 f(x)=0 的根。 */
export function bisect(
  f: (x: number) => number,
  lo: number,
  hi: number,
  tol: number,
  maxIter: number,
): number | null {
  let flo = f(lo)
  const fhi = f(hi)
  if (!isFinite(flo) || !isFinite(fhi)) return null
  if (flo * fhi > 0) return null // 区间内无符号变化
  let mid = lo
  for (let iter = 0; iter < maxIter; iter++) {
    mid = (lo + hi) / 2
    const fm = f(mid)
    if (Math.abs(fm) < tol) return mid
    if (flo * fm < 0) {
      hi = mid
    } else {
      lo = mid
      flo = fm
    }
  }
  return mid
}
