/**
 * 阶段二：液态凝固 (Liquid Crystallization) - 接收期
 * API 返回结果后，水墨凝固成高清图片的过渡效果
 */
import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  initWebGL,
  setupQuad,
  createTextureFromImage,
  bindTexture,
  render,
  cleanup,
  WebGLContext,
} from '@/lib/webgl-utils';
import { vertexShader, liquidCrystallizationShader, liquidCrystallizationUniforms } from '@/lib/shaders';
import { generateNoiseTexture } from '@/lib/noise-generator';

interface LiquidCrystallizationProps {
  /** 原始/模糊图片 URL */
  oldImageSrc: string;
  /** 高清图片 URL */
  newImageSrc: string;
  /** 容器宽度 */
  width?: number;
  /** 容器高度 */
  height?: number;
  /** 过渡持续时间 (ms) */
  duration?: number;
  /** 是否自动开始过渡 */
  autoStart?: boolean;
  /** 过渡完成回调 */
  onComplete?: () => void;
  /** 类名 */
  className?: string;
}

export const LiquidCrystallization: React.FC<LiquidCrystallizationProps> = ({
  oldImageSrc,
  newImageSrc,
  width = 600,
  height = 400,
  duration = 2000,
  autoStart = true,
  onComplete,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<WebGLContext | null>(null);
  const animationRef = useRef<number>(0);
  const progressRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const transitionStartRef = useRef<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const imagesLoadedRef = useRef<{ old: boolean; new: boolean }>({ old: false, new: false });

  // 初始化 WebGL
  const initializeWebGL = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = initWebGL(
      canvas,
      vertexShader,
      liquidCrystallizationShader,
      liquidCrystallizationUniforms
    );

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
      type: 'fbm',
      seed: Date.now(),
    });
    const noiseTexture = createTextureFromImage(gl, noiseCanvas);
    if (noiseTexture) {
      ctx.textures.set('noise', noiseTexture);
    }

    // 加载原图
    const oldImage = new Image();
    oldImage.crossOrigin = 'anonymous';
    oldImage.onload = () => {
      const texture = createTextureFromImage(gl, oldImage);
      if (texture) {
        ctx.textures.set('imageOld', texture);
        imagesLoadedRef.current.old = true;
        checkAndStartTransition();
      }
    };
    oldImage.src = oldImageSrc;

    // 加载高清图
    const newImage = new Image();
    newImage.crossOrigin = 'anonymous';
    newImage.onload = () => {
      const texture = createTextureFromImage(gl, newImage);
      if (texture) {
        ctx.textures.set('imageNew', texture);
        imagesLoadedRef.current.new = true;
        checkAndStartTransition();
      }
    };
    newImage.src = newImageSrc;

    // 设置固定 uniform
    if (uniforms.u_resolution) {
      gl.uniform2f(uniforms.u_resolution, width, height);
    }

    startTimeRef.current = performance.now();
  }, [oldImageSrc, newImageSrc, width, height]);

  // 检查是否可以开始过渡
  const checkAndStartTransition = useCallback(() => {
    if (
      imagesLoadedRef.current.old &&
      imagesLoadedRef.current.new &&
      autoStart &&
      !isTransitioning
    ) {
      startTransition();
    }
  }, [autoStart, isTransitioning]);

  // 开始过渡
  const startTransition = useCallback(() => {
    setIsTransitioning(true);
    setIsComplete(false);
    progressRef.current = 0;
    transitionStartRef.current = performance.now();
  }, []);

  // 动画循环
  const animate = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const { gl, uniforms } = ctx;
    const currentTime = performance.now();
    const time = (currentTime - startTimeRef.current) / 1000;

    // 计算过渡进度
    if (isTransitioning && !isComplete) {
      const elapsed = currentTime - transitionStartRef.current;
      progressRef.current = Math.min(elapsed / duration, 1);

      if (progressRef.current >= 1) {
        setIsComplete(true);
        setIsTransitioning(false);
        onComplete?.();
      }
    }

    gl.useProgram(ctx.program);

    // 更新 uniform
    if (uniforms.u_time) {
      gl.uniform1f(uniforms.u_time, time);
    }
    if (uniforms.u_progress) {
      // 使用 easeOutCubic 缓动函数
      const t = progressRef.current;
      const easedProgress = 1 - Math.pow(1 - t, 3);
      gl.uniform1f(uniforms.u_progress, easedProgress);
    }

    // 绑定纹理
    const oldTexture = ctx.textures.get('imageOld');
    const newTexture = ctx.textures.get('imageNew');
    const noiseTexture = ctx.textures.get('noise');

    if (oldTexture && uniforms.u_imageOld) {
      bindTexture(gl, oldTexture, 0, uniforms.u_imageOld);
    }
    if (newTexture && uniforms.u_imageNew) {
      bindTexture(gl, newTexture, 1, uniforms.u_imageNew);
    }
    if (noiseTexture && uniforms.u_noise) {
      bindTexture(gl, noiseTexture, 2, uniforms.u_noise);
    }

    render(ctx);

    animationRef.current = requestAnimationFrame(animate);
  }, [isTransitioning, isComplete, duration, onComplete]);

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

  // 启动动画循环
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

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

      {/* 完成时的边框发光 */}
      {isComplete && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl animate-pulse"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 200, 0.3), inset 0 0 20px rgba(0, 255, 200, 0.1)',
          }}
        />
      )}

      {/* 状态指示 */}
      {isTransitioning && !isComplete && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/70 text-sm">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span>渲染完成，正在呈现...</span>
        </div>
      )}
    </div>
  );
};

export default LiquidCrystallization;
