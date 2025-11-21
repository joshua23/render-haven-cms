/**
 * 伪渲染效果展示页面
 * Progressive Fake-Rendering Showcase
 */
import React, { useState } from 'react';
import { FakeRenderingDemo, InkBreathing, LiquidCrystallization, InkSlashComparison } from '@/components/fake-rendering';

// 示例图片 - 使用 Unsplash 的免费图片
const DEMO_IMAGES = {
  portrait: {
    original: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop&q=60',
    enhanced: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&h=800&fit=crop&q=95',
  },
  landscape: {
    original: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=60',
    enhanced: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=95',
  },
  city: {
    original: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop&q=60',
    enhanced: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop&q=95',
  },
};

type DemoMode = 'full' | 'phase1' | 'phase2' | 'phase3';

const FakeRenderingPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<keyof typeof DEMO_IMAGES>('portrait');
  const [demoMode, setDemoMode] = useState<DemoMode>('full');
  const [customOriginal, setCustomOriginal] = useState('');
  const [customEnhanced, setCustomEnhanced] = useState('');

  const currentImages = DEMO_IMAGES[selectedImage];
  const displayOriginal = customOriginal || currentImages.original;
  const displayEnhanced = customEnhanced || currentImages.enhanced;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶部导航 */}
      <header className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-50 bg-black/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Progressive Fake-Rendering
          </h1>
          <span className="text-sm text-slate-500">伪渲染过渡效果</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* 介绍区域 */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            将"等待时间"变成"欣赏渲染过程的时间"
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            基于 WebGL Shader 驱动的视觉层，实现三个阶段的无缝过渡：
            <span className="text-cyan-400"> 水墨呼吸（等待期）</span> →
            <span className="text-emerald-400"> 液态凝固（接收期）</span> →
            <span className="text-blue-400"> 水墨刀光（交互期）</span>
          </p>
        </section>

        {/* 控制面板 */}
        <section className="mb-12">
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50">
            <div className="flex flex-wrap gap-6 items-start">
              {/* 图片选择 */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-slate-400 mb-2">预设图片</label>
                <div className="flex gap-2">
                  {(Object.keys(DEMO_IMAGES) as Array<keyof typeof DEMO_IMAGES>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedImage(key)}
                      className={`
                        px-4 py-2 rounded-lg text-sm transition-colors
                        ${selectedImage === key
                          ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-400/50'
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                        }
                      `}
                    >
                      {key === 'portrait' && '人像'}
                      {key === 'landscape' && '风景'}
                      {key === 'city' && '城市'}
                    </button>
                  ))}
                </div>
              </div>

              {/* 演示模式 */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-slate-400 mb-2">演示模式</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { value: 'full', label: '完整演示' },
                    { value: 'phase1', label: '阶段一' },
                    { value: 'phase2', label: '阶段二' },
                    { value: 'phase3', label: '阶段三' },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setDemoMode(value as DemoMode)}
                      className={`
                        px-3 py-1.5 rounded-lg text-sm transition-colors
                        ${demoMode === value
                          ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-400/50'
                          : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                        }
                      `}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 自定义图片输入 */}
            <div className="mt-6 pt-6 border-t border-slate-800/50">
              <label className="block text-sm text-slate-400 mb-2">自定义图片 URL（可选）</label>
              <div className="flex gap-4 flex-wrap">
                <input
                  type="text"
                  placeholder="原图 URL"
                  value={customOriginal}
                  onChange={(e) => setCustomOriginal(e.target.value)}
                  className="flex-1 min-w-[200px] px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                />
                <input
                  type="text"
                  placeholder="增强图 URL"
                  value={customEnhanced}
                  onChange={(e) => setCustomEnhanced(e.target.value)}
                  className="flex-1 min-w-[200px] px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                />
                {(customOriginal || customEnhanced) && (
                  <button
                    onClick={() => {
                      setCustomOriginal('');
                      setCustomEnhanced('');
                    }}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30"
                  >
                    清除
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 演示区域 */}
        <section className="flex justify-center">
          {demoMode === 'full' && (
            <FakeRenderingDemo
              originalImage={displayOriginal}
              enhancedImage={displayEnhanced}
              width={700}
              height={467}
              simulatedLoadTime={4000}
              transitionDuration={2000}
              autoDemo={true}
            />
          )}

          {demoMode === 'phase1' && (
            <div className="flex flex-col items-center gap-6">
              <div
                style={{
                  background: '#000',
                  padding: '2px',
                  borderRadius: '26px',
                  boxShadow: '0 0 30px rgba(0, 200, 255, 0.15)',
                }}
              >
                <InkBreathing
                  imageSrc={displayOriginal}
                  width={700}
                  height={467}
                  blurAmount={8}
                  inkIntensity={0.6}
                  isLoading={true}
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">阶段一：水墨呼吸</h3>
                <p className="text-sm text-slate-400 max-w-md">
                  等待 API 返回时，水墨在图片上缓缓流动、忽明忽暗，
                  仿佛 AI 正在重绘细节。
                </p>
              </div>
            </div>
          )}

          {demoMode === 'phase2' && (
            <div className="flex flex-col items-center gap-6">
              <div
                style={{
                  background: '#000',
                  padding: '2px',
                  borderRadius: '26px',
                  boxShadow: '0 0 30px rgba(0, 200, 255, 0.15)',
                }}
              >
                <LiquidCrystallization
                  oldImageSrc={displayOriginal}
                  newImageSrc={displayEnhanced}
                  width={700}
                  height={467}
                  duration={3000}
                  autoStart={true}
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">阶段二：液态凝固</h3>
                <p className="text-sm text-slate-400 max-w-md">
                  API 返回后，墨水迅速褪去（像潮水退去），
                  露出高清图和一层高亮的玻璃光泽。
                </p>
              </div>
            </div>
          )}

          {demoMode === 'phase3' && (
            <div className="flex flex-col items-center gap-6">
              <div
                style={{
                  background: '#000',
                  padding: '2px',
                  borderRadius: '26px',
                  boxShadow: '0 0 30px rgba(0, 200, 255, 0.15)',
                }}
              >
                <InkSlashComparison
                  oldImageSrc={displayOriginal}
                  newImageSrc={displayEnhanced}
                  width={700}
                  height={467}
                  initialPosition={0.5}
                  inkWidth={0.05}
                  glassHighlight={0.4}
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">阶段三：水墨刀光</h3>
                <p className="text-sm text-slate-400 max-w-md">
                  用户可以滑动对比 Before/After，
                  分割线带有水墨晕染效果和液态玻璃折射感。
                </p>
              </div>
            </div>
          )}
        </section>

        {/* 技术说明 */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center">技术实现</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 阶段一技术 */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4">
                <span className="text-cyan-400 text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">水墨呼吸 Shader</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>- 高斯模糊底图</li>
                <li>- Simplex Noise 生成流动水墨</li>
                <li>- Sin 波驱动的呼吸节奏</li>
                <li>- 动态遮罩忽明忽暗</li>
              </ul>
            </div>

            {/* 阶段二技术 */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                <span className="text-emerald-400 text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-emerald-400">液态凝固 Shader</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>- 径向扩散过渡</li>
                <li>- 噪声扰动边缘</li>
                <li>- 边缘高光模拟玻璃感</li>
                <li>- 完成时边框闪光</li>
              </ul>
            </div>

            {/* 阶段三技术 */}
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                <span className="text-blue-400 text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">水墨刀光 Shader</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>- 噪声驱动的不规则分割线</li>
                <li>- 液态玻璃高光效果</li>
                <li>- 轻微的折射扭曲</li>
                <li>- 水墨晕染边缘</li>
              </ul>
            </div>
          </div>

          {/* 代码示例 */}
          <div className="mt-8 bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50">
            <h3 className="text-lg font-semibold mb-4">快速使用</h3>
            <pre className="bg-black/50 rounded-xl p-4 overflow-x-auto text-sm">
              <code className="text-slate-300">{`import { FakeRenderingDemo } from '@/components/fake-rendering';

// 完整三阶段演示
<FakeRenderingDemo
  originalImage="/path/to/original.jpg"
  enhancedImage="/path/to/enhanced.jpg"
  width={600}
  height={400}
  simulatedLoadTime={4000}
  transitionDuration={2000}
/>

// 单独使用交互对比组件
import { InkSlashComparison } from '@/components/fake-rendering';

<InkSlashComparison
  oldImageSrc="/path/to/before.jpg"
  newImageSrc="/path/to/after.jpg"
  width={600}
  height={400}
  inkWidth={0.05}
  glassHighlight={0.4}
/>`}</code>
            </pre>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-slate-800/50 mt-20 py-8 text-center text-sm text-slate-500">
        <p>Progressive Fake-Rendering - WebGL Shader Powered</p>
      </footer>
    </div>
  );
};

export default FakeRenderingPage;
