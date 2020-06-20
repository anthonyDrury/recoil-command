export function calculateNextItemState(item: any) {
  return {
    ...item,
    x: item.veerLeft
      ? item.x - 5 * item.xIncrement
      : item.x + 5 * item.xIncrement,
    y: item.y - 5 * item.yIncrement,
  };
}
