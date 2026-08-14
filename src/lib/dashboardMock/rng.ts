// 문자열 시드 → 32bit 정수 해시 (xmur3)
function xmur3(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

// mulberry32 PRNG: 32bit 정수 시드로부터 [0,1) 난수 생성
function mulberry32(a: number): () => number {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 동일 seed 문자열 -> 항상 동일한 [0,1) 난수 시퀀스를 생성하는 함수 반환
export function createRng(seed: string): () => number {
  const seedFn = xmur3(seed);
  return mulberry32(seedFn());
}

export function randInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function randFloat(
  rng: () => number,
  min: number,
  max: number,
  decimals = 1,
): number {
  const value = rng() * (max - min) + min;
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
