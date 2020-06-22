export const getWidth = () => document.documentElement.clientWidth;

export const getHeight = () => document.documentElement.clientHeight;

export const getExplosionSize = (timer: number) => 30 + Math.abs(60 - timer);
