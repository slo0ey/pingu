import { getRandomValues } from 'crypto';

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function safeRand(): number {
  const randomByte = new Uint32Array(1);
  getRandomValues(randomByte);
  return randomByte[0] / 0xffffffff;
}
