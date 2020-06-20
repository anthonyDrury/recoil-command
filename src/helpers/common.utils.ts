export function getNumberInRange(num: number, min: number, max: number) {
  return Math.max(Math.min(num, max), min);
}
