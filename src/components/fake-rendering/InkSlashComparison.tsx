/**
 * 阶段三：水墨刀光 (Ink Slash) - 交互期
 * 用户可以滑动对比 Before/After，带有水墨晕染分割线和液态玻璃效果
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
import { vertexShader, inkSlashShader, inkSlashUniforms } from '@/lib/shaders';
import { generateNoiseTexture } from '@/lib/noise-generator';

interface InkSlashComparisonProps {
  /** 原图 URL (Before) */
  oldImageSrc: string;
  /** 高清图 URL (After) */
  newImageSrc: string;
  /** 容器宽度 */
  width?: number;
  /** 容器高度 */
  height?: number;
  /** 初始滑块位置 (0-1) */
  initialPosition?: number;
  /** 水墨边缘宽度 */
  inkWidth?: number;
  /** 玻璃高光强度 */
  glassHighlight?: number;
  /** 位置变化回调 */
  onPositionChange?: (position: number) => void;
  /** 类名 */
  className?: string;
}

export const InkSlashComparison: React.FC<InkSlashComparisonProps> = ({
  oldImageSrc,
  newImageSrc,
  width = 600,
  height = 400,
  initialPosition = 0.5,
  inkWidth = 0.05,
  glassHighlight = 0.4,
  onPositionChange,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<WebGLContext | null>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const [sliderPos, setSliderPos] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const imagesLoadedRef = useRef<{ old: boolean; new: boolean }>({ old: false, new: false });

  // 初始化 WebGL
  const initializeWebGL = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = initWebGL(canvas, vertexShader, inkSlashShader, inkSlashUniforms);

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
      scale: 5,
      type: 'turbulence',
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
        checkReady();
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
        checkReady();
      }
    };
    newImage.src = newImageSrc;

    // 设置固定 uniform
    if (uniforms.u_resolution) {
      gl.uniform2f(uniforms.u_resolution, width, height);
    }
    if (uniforms.u_inkWidth) {
      gl.uniform1f(uniforms.u_inkWidth, inkWidth);
    }
    if (uniforms.u_glassHighlight) {
      gl.uniform1f(uniforms.u_glassHighlight, glassHighlight);
    }

    startTimeRef.current = performance.now();
  }, [oldImageSrc, newImageSrc, width, height, inkWidth, glassHighlight]);

  // 检查是否准备就绪
  const checkReady = useCallback(() => {
    if (imagesLoadedRef.current.old && imagesLoadedRef.current.new) {
      setIsReady(true);
    }
  }, []);

  // 动画循环
  const animate = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !isReady) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const { gl, uniforms } = ctx;
    const time = (performance.now() - startTimeRef.current) / 1000;

    gl.useProgram(ctx.program);

    // 更新 uniform
    if (uniforms.u_time) {
      gl.uniform1f(uniforms.u_time, time);
    }
    if (uniforms.u_sliderPos) {
      gl.uniform1f(uniforms.u_sliderPos, sliderPos);
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
  }, [isReady, sliderPos]);

  // 处理拖拽
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  const updatePosition = useCallback(
    (e: React.PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const newPos = Math.max(0, Math.min(1, x));

      setSliderPos(newPos);
      onPositionChange?.(newPos);
    },
    [onPositionChange]
  );

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
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl select-none ${className}`}
      style={{
        cursor: isDragging ? 'grabbing' : 'ew-resize',
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="block pointer-events-none"
        style={{ width, height }}
      />

      {/* 滑块指示器 */}
      <div
        className="absolute top-0 bottom-0 w-0.5 pointer-events-none transition-opacity"
        style={{
          left: `${sliderPos * 100}%`,
          transform: 'translateX(-50%)',
          background: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(0, 200, 255, 0.3)',
        }}
      >
        {/* 滑块手柄 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 200, 255, 0.4)',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-700"
          >
            <path d="M8 4l-6 8 6 8M16 4l6 8-6 8" />
          </svg>
        </div>
      </div>

      {/* Before/After 标签 */}
      <div className="absolute top-4 left-4 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-white/80 text-xs">
        After
      </div>
      <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-white/80 text-xs">
        Before
      </div>

      {/* 液态玻璃覆盖层 */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            transparent 40%,
            transparent 60%,
            rgba(0, 0, 0, 0.15) 100%
          )`,
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      />

      {/* 加载指示器 */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default InkSlashComparison;
