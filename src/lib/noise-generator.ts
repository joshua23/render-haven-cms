/**
 * 程序化噪声纹理生成器 - 用于水墨效果
 * 生成 Simplex Noise / Perlin Noise 纹理
 */

// Simplex noise 置换表
const perm = new Uint8Array(512);
const permMod12 = new Uint8Array(512);

// 3D 梯度向量
const grad3 = new Float32Array([
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0,
  1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1,
  0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
]);

// 初始化置换表
function initPerm(seed: number = 0): void {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    p[i] = i;
  }

  // Fisher-Yates 洗牌
  let random = seed || Math.random() * 65536;
  for (let i = 255; i > 0; i--) {
    random = (random * 16807) % 2147483647;
    const j = Math.floor((random / 2147483647) * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }

  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }
}

// 2D Simplex Noise
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;

function dot2(gx: number, gy: number, x: number, y: number): number {
  return gx * x + gy * y;
}

export function simplex2D(x: number, y: number): number {
  const s = (x + y) * F2;
  const i = Math.floor(x + s);
  const j = Math.floor(y + s);
  const t = (i + j) * G2;
  const X0 = i - t;
  const Y0 = j - t;
  const x0 = x - X0;
  const y0 = y - Y0;

  let i1: number, j1: number;
  if (x0 > y0) {
    i1 = 1;
    j1 = 0;
  } else {
    i1 = 0;
    j1 = 1;
  }

  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + 2 * G2;
  const y2 = y0 - 1 + 2 * G2;

  const ii = i & 255;
  const jj = j & 255;
  const gi0 = permMod12[ii + perm[jj]] * 3;
  const gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
  const gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;

  let n0 = 0;
  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 >= 0) {
    t0 *= t0;
    n0 = t0 * t0 * dot2(grad3[gi0], grad3[gi0 + 1], x0, y0);
  }

  let n1 = 0;
  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 >= 0) {
    t1 *= t1;
    n1 = t1 * t1 * dot2(grad3[gi1], grad3[gi1 + 1], x1, y1);
  }

  let n2 = 0;
  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 >= 0) {
    t2 *= t2;
    n2 = t2 * t2 * dot2(grad3[gi2], grad3[gi2 + 1], x2, y2);
  }

  return 70 * (n0 + n1 + n2);
}

// FBM (Fractal Brownian Motion) - 多层噪声叠加
export function fbm2D(
  x: number,
  y: number,
  octaves: number = 6,
  lacunarity: number = 2.0,
  gain: number = 0.5
): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * simplex2D(x * frequency, y * frequency);
    maxValue += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }

  return value / maxValue;
}

// 水墨噪声 - 带有云雾感的噪声
export function inkNoise(x: number, y: number, time: number = 0): number {
  const n1 = fbm2D(x + time * 0.1, y, 4, 2.0, 0.5);
  const n2 = fbm2D(x * 2 + time * 0.05, y * 2 + 100, 3, 2.0, 0.6);
  const warp = fbm2D(x + n1 * 0.3, y + n2 * 0.3, 2, 2.0, 0.5);
  return (warp + 1) * 0.5; // 归一化到 0-1
}

// 涡流噪声 - 用于水墨流动效果
export function turbulence(
  x: number,
  y: number,
  octaves: number = 6
): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * Math.abs(simplex2D(x * frequency, y * frequency));
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return value / maxValue;
}

export interface NoiseTextureOptions {
  width: number;
  height: number;
  scale: number;
  seed?: number;
  octaves?: number;
  type?: 'simplex' | 'fbm' | 'ink' | 'turbulence';
}

/**
 * 生成噪声纹理 Canvas
 */
export function generateNoiseTexture(options: NoiseTextureOptions): HTMLCanvasElement {
  const {
    width,
    height,
    scale,
    seed = Date.now(),
    octaves = 4,
    type = 'ink',
  } = options;

  initPerm(seed);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get 2d context');

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const nx = x / width * scale;
      const ny = y / height * scale;

      let value: number;
      switch (type) {
        case 'simplex':
          value = (simplex2D(nx, ny) + 1) * 0.5;
          break;
        case 'fbm':
          value = (fbm2D(nx, ny, octaves) + 1) * 0.5;
          break;
        case 'ink':
          value = inkNoise(nx, ny);
          break;
        case 'turbulence':
          value = turbulence(nx, ny, octaves);
          break;
        default:
          value = (simplex2D(nx, ny) + 1) * 0.5;
      }

      const pixel = Math.floor(value * 255);
      const idx = (y * width + x) * 4;
      data[idx] = pixel;     // R
      data[idx + 1] = pixel; // G
      data[idx + 2] = pixel; // B
      data[idx + 3] = 255;   // A
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * 生成无缝平铺噪声纹理
 */
export function generateSeamlessNoiseTexture(
  size: number,
  scale: number = 4,
  seed?: number
): HTMLCanvasElement {
  if (seed !== undefined) {
    initPerm(seed);
  }

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get 2d context');

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // 使用环形映射实现无缝平铺
      const s = x / size;
      const t = y / size;
      const TWO_PI = Math.PI * 2;

      // 4D 噪声映射到 2D 环面
      const nx = Math.cos(s * TWO_PI) * scale / TWO_PI;
      const ny = Math.sin(s * TWO_PI) * scale / TWO_PI;
      const nz = Math.cos(t * TWO_PI) * scale / TWO_PI;
      const nw = Math.sin(t * TWO_PI) * scale / TWO_PI;

      // 使用组合的 2D 噪声近似 4D 效果
      const n1 = simplex2D(nx + 1000, ny + 1000);
      const n2 = simplex2D(nz + 2000, nw + 2000);
      const value = ((n1 + n2) / 2 + 1) * 0.5;

      const pixel = Math.floor(value * 255);
      const idx = (y * size + x) * 4;
      data[idx] = pixel;
      data[idx + 1] = pixel;
      data[idx + 2] = pixel;
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

/**
 * 创建动态噪声纹理（用于动画）
 */
export class AnimatedNoiseTexture {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private scale: number;
  private time: number = 0;

  constructor(width: number, height: number, scale: number = 4) {
    this.width = width;
    this.height = height;
    this.scale = scale;

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');
    this.ctx = ctx;

    initPerm(Date.now());
  }

  /**
   * 更新噪声纹理
   */
  update(deltaTime: number): HTMLCanvasElement {
    this.time += deltaTime;

    const imageData = this.ctx.createImageData(this.width, this.height);
    const data = imageData.data;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const nx = x / this.width * this.scale;
        const ny = y / this.height * this.scale;
        const value = inkNoise(nx, ny, this.time);

        const pixel = Math.floor(value * 255);
        const idx = (y * this.width + x) * 4;
        data[idx] = pixel;
        data[idx + 1] = pixel;
        data[idx + 2] = pixel;
        data[idx + 3] = 255;
      }
    }

    this.ctx.putImageData(imageData, 0, 0);
    return this.canvas;
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }
}

// 初始化默认置换表
initPerm(12345);
