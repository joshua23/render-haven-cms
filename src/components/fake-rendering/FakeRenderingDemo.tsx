/**
 * 伪渲染效果完整演示组件
 * 整合三个阶段：等待期 -> 接收期 -> 交互期
 */
import React, { useState, useCallback, useEffect } from 'react';
import { InkBreathing } from './InkBreathing';
import { LiquidCrystallization } from './LiquidCrystallization';
import { InkSlashComparison } from './InkSlashComparison';

// 演示阶段
type Phase = 'waiting' | 'crystallizing' | 'interactive';

interface FakeRenderingDemoProps {
  /** 原始图片 URL */
  originalImage: string;
  /** 高清/处理后的图片 URL */
  enhancedImage: string;
  /** 容器宽度 */
  width?: number;
  /** 容器高度 */
  height?: number;
  /** 模拟加载时间 (ms) */
  simulatedLoadTime?: number;
  /** 过渡动画时间 (ms) */
  transitionDuration?: number;
  /** 是否自动演示 */
  autoDemo?: boolean;
  /** 类名 */
  className?: string;
}

export const FakeRenderingDemo: React.FC<FakeRenderingDemoProps> = ({
  originalImage,
  enhancedImage,
  width = 600,
  height = 400,
  simulatedLoadTime = 4000,
  transitionDuration = 2000,
  autoDemo = true,
  className = '',
}) => {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [isLoading, setIsLoading] = useState(true);

  // 模拟 API 加载完成
  useEffect(() => {
    if (!autoDemo) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      setPhase('crystallizing');
    }, simulatedLoadTime);

    return () => clearTimeout(timer);
  }, [autoDemo, simulatedLoadTime]);

  // 过渡完成后进入交互阶段
  const handleCrystallizationComplete = useCallback(() => {
    setPhase('interactive');
  }, []);

  // 重新开始演示
  const handleRestart = useCallback(() => {
    setPhase('waiting');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setPhase('crystallizing');
    }, simulatedLoadTime);
  }, [simulatedLoadTime]);

  // 手动切换阶段（用于测试）
  const handlePhaseChange = useCallback((newPhase: Phase) => {
    setPhase(newPhase);
    setIsLoading(newPhase === 'waiting');
  }, []);

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      {/* 主要显示区域 */}
      <div
        className="relative"
        style={{
          background: '#000',
          padding: '2px',
          borderRadius: '26px',
          boxShadow: '0 0 30px rgba(0, 200, 255, 0.15), 0 0 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* 阶段一：水墨呼吸 - 等待期 */}
        {phase === 'waiting' && (
          <InkBreathing
            imageSrc={originalImage}
            width={width}
            height={height}
            blurAmount={8}
            inkIntensity={0.6}
            isLoading={isLoading}
          />
        )}

        {/* 阶段二：液态凝固 - 接收期 */}
        {phase === 'crystallizing' && (
          <LiquidCrystallization
            oldImageSrc={originalImage}
            newImageSrc={enhancedImage}
            width={width}
            height={height}
            duration={transitionDuration}
            autoStart={true}
            onComplete={handleCrystallizationComplete}
          />
        )}

        {/* 阶段三：水墨刀光 - 交互期 */}
        {phase === 'interactive' && (
          <InkSlashComparison
            oldImageSrc={originalImage}
            newImageSrc={enhancedImage}
            width={width}
            height={height}
            initialPosition={0.5}
            inkWidth={0.05}
            glassHighlight={0.4}
          />
        )}
      </div>

      {/* 控制面板 */}
      <div className="flex flex-col items-center gap-4">
        {/* 阶段指示器 */}
        <div className="flex items-center gap-4">
          <PhaseIndicator
            label="等待期"
            sublabel="水墨呼吸"
            isActive={phase === 'waiting'}
            isComplete={phase !== 'waiting'}
            onClick={() => handlePhaseChange('waiting')}
          />
          <div className="w-8 h-0.5 bg-slate-700" />
          <PhaseIndicator
            label="接收期"
            sublabel="液态凝固"
            isActive={phase === 'crystallizing'}
            isComplete={phase === 'interactive'}
            onClick={() => handlePhaseChange('crystallizing')}
          />
          <div className="w-8 h-0.5 bg-slate-700" />
          <PhaseIndicator
            label="交互期"
            sublabel="水墨刀光"
            isActive={phase === 'interactive'}
            isComplete={false}
            onClick={() => handlePhaseChange('interactive')}
          />
        </div>

        {/* 重新演示按钮 */}
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-white/80 rounded-lg text-sm transition-colors border border-slate-600/50"
        >
          重新演示
        </button>

        {/* 当前阶段说明 */}
        <div className="text-center text-sm text-slate-400 max-w-md">
          {phase === 'waiting' && (
            <p>
              <span className="text-cyan-400">等待期：</span>
              水墨在图片上缓缓流动，AI 正在重绘细节...
            </p>
          )}
          {phase === 'crystallizing' && (
            <p>
              <span className="text-emerald-400">接收期：</span>
              墨水迅速褪去，高清图像逐渐显现，伴随液态玻璃光泽...
            </p>
          )}
          {phase === 'interactive' && (
            <p>
              <span className="text-blue-400">交互期：</span>
              左右拖动滑块对比原图与增强后的效果，体验水墨晕染分割线...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// 阶段指示器组件
interface PhaseIndicatorProps {
  label: string;
  sublabel: string;
  isActive: boolean;
  isComplete: boolean;
  onClick: () => void;
}

const PhaseIndicator: React.FC<PhaseIndicatorProps> = ({
  label,
  sublabel,
  isActive,
  isComplete,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-1 p-3 rounded-lg transition-all
        ${isActive
          ? 'bg-slate-700/50 ring-2 ring-cyan-400/50'
          : 'bg-slate-800/30 hover:bg-slate-700/30'
        }
      `}
    >
      <div
        className={`
          w-3 h-3 rounded-full transition-colors
          ${isComplete
            ? 'bg-emerald-400'
            : isActive
              ? 'bg-cyan-400 animate-pulse'
              : 'bg-slate-600'
          }
        `}
      />
      <span className={`text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
        {label}
      </span>
      <span className="text-xs text-slate-500">{sublabel}</span>
    </button>
  );
};

export default FakeRenderingDemo;
