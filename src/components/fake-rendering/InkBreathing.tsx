/**
 * 阶段一：水墨呼吸 (Ink Breathing) - 等待期
 * 用户上传图片后，等待 API 返回时显示的动态水墨效果
 */
import React, { useRef, useEffect, useCallback } from 'react';
import {
  initWebGL,
  setupQuad,
  createTextureFromImage,
  bindTexture,
  render,
  cleanup,
  WebGLContext,
} from '@/lib/webgl-utils';
import { vertexShader, inkBreathingShader, inkBreathingUniforms } from '@/lib/shaders';
import { generateNoiseTexture } from '@/lib/noise-generator';

interface InkBreathingProps {
  /** 原始图片 URL */
  imageSrc: string;
  /** 容器宽度 */
  width?: number;
  /** 容器高度 */
  height?: number;
  /** 模糊强度 (1-20) */
  blurAmount?: number;
  /** 水墨强度 (0-1) */
  inkIntensity?: number;
  /** 是否正在加载 */
  isLoading?: boolean;
  /** 加载完成回调 */
  onReady?: () => void;
  /** 类名 */
  className?: string;
}

export const InkBreathing: React.FC<InkBreathingProps> = ({
  imageSrc,
  width = 600,
  height = 400,
  blurAmount = 8,
  inkIntensity = 0.6,
  isLoading = true,
  onReady,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<WebGLContext | null>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const imageLoadedRef = useRef<boolean>(false);

  // 初始化 WebGL
  const initializeWebGL = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 设置 canvas 尺寸
    canvas.width = width;
    canvas.height = height;

    // 初始化 WebGL 上下文
    const ctx = initWebGL(canvas, vertexShader, inkBreathingShader, inkBreathingUniforms);
    if (!ctx) {
      console.error('Failed to initialize WebGL');
      return;
    }

    ctxRef.current = ctx;
    const { gl, program, uniforms } = ctx;

    gl.useProgram(program);
    setupQuad(ctx);

    // 生成噪声纹理
    const noiseCanvas = generateNoiseTexture({
      width: 256,
      height: 256,
      scale: 4,
      type: 'ink',
      seed: Date.now(),
    });
    const noiseTexture = createTextureFromImage(gl, noiseCanvas);

    if (noiseTexture) {
      ctx.textures.set('noise', noiseTexture);
    }

    // 加载图片
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const imageTexture = createTextureFromImage(gl, image);
      if (imageTexture) {
        ctx.textures.set('image', imageTexture);
        imageLoadedRef.current = true;
        onReady?.();
      }
    };
    image.src = imageSrc;

    // 设置固定 uniform
    if (uniforms.u_resolution) {
      gl.uniform2f(uniforms.u_resolution, width, height);
    }
    if (uniforms.u_blurAmount) {
      gl.uniform1f(uniforms.u_blurAmount, blurAmount);
    }
    if (uniforms.u_inkIntensity) {
      gl.uniform1f(uniforms.u_inkIntensity, inkIntensity);
    }

    startTimeRef.current = performance.now();
  }, [imageSrc, width, height, blurAmount, inkIntensity, onReady]);

  // 动画循环
  const animate = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !imageLoadedRef.current || !isLoading) return;

    const { gl, uniforms } = ctx;
    const time = (performance.now() - startTimeRef.current) / 1000;

    gl.useProgram(ctx.program);

    // 更新时间
    if (uniforms.u_time) {
      gl.uniform1f(uniforms.u_time, time);
    }

    // 绑定纹理
    const imageTexture = ctx.textures.get('image');
    const noiseTexture = ctx.textures.get('noise');

    if (imageTexture && uniforms.u_image) {
      bindTexture(gl, imageTexture, 0, uniforms.u_image);
    }
    if (noiseTexture && uniforms.u_noise) {
      bindTexture(gl, noiseTexture, 1, uniforms.u_noise);
    }

    // 渲染
    render(ctx);

    animationRef.current = requestAnimationFrame(animate);
  }, [isLoading]);

  // 初始化
  useEffect(() => {
    initializeWebGL();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (ctxRef.current) {
        cleanup(ctxRef.current);
      }
    };
  }, [initializeWebGL]);

  // 启动/停止动画
  useEffect(() => {
    if (isLoading && imageLoadedRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoading, animate]);

  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="block"
        style={{ width, height }}
      />

      {/* 液态玻璃覆盖层 */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 40%,
            transparent 60%,
            rgba(0, 0, 0, 0.2) 100%
          )`,
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      />

      {/* 加载状态指示器 */}
      {isLoading && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70 text-sm">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span>AI 正在重绘...</span>
        </div>
      )}
    </div>
  );
};

export default InkBreathing;
