export const getWidth = () => document.documentElement.clientWidth;

export const getHeight = () => document.documentElement.clientHeight;

export const getExplosionBase = () =>
  0.3 * (document.documentElement.clientWidth / 19.2);

// Get explosion size based on time left
// Means explosions grow slightly over time
export const getExplosionSize = (timer: number) =>
  getExplosionBase() + Math.abs(30 - timer);
