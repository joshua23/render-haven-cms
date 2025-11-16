import { useState } from 'react';
import { Image as ImageIcon, Wand2, Download, RefreshCw, Sparkles } from 'lucide-react';
import { useNSFW } from '../contexts/NSFWContext';

export default function XuanranImageGenerator() {
  const { isNSFW } = useNSFW();
  const [prompt, setPrompt] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [style, setStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);

  const characters = [
    { id: '1', name: '小美', avatar: '👩' },
    { id: '2', name: '艾米', avatar: '👱‍♀️' },
    { id: '3', name: '莉莉', avatar: '👩‍🦰' },
  ];

  const styles = [
    { id: 'realistic', name: '写实风格', icon: '📸' },
    { id: 'anime', name: '动漫风格', icon: '🎨' },
    { id: 'artistic', name: '艺术风格', icon: '🖼️' },
    { id: 'fantasy', name: '奇幻风格', icon: '✨' },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            AI图像生成器
          </h1>
          <p className="text-xl text-slate-300">
            用文字创造专属于你的AI伴侣图像
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-neon-green" />
                创作指令
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    选择角色
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {characters.map((char) => (
                      <button
                        key={char.id}
                        onClick={() => setSelectedCharacter(char.id)}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                          selectedCharacter === char.id
                            ? 'bg-neon-green text-slate-900 shadow-lg shadow-neon-green/50'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <span className="text-2xl">{char.avatar}</span>
                        <span>{char.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    风格选择
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {styles.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStyle(s.id)}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                          style === s.id
                            ? 'bg-neon-green text-slate-900 shadow-lg shadow-neon-green/50'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <span className="text-xl">{s.icon}</span>
                        <span>{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    <Sparkles className="w-4 h-4 inline mr-2 text-neon-green" />
                    描述你想要的图像
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="例如: 在海边日落时分,穿着白色连衣裙,微笑着看向镜头..."
                    rows={4}
                    className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-neon-green focus:ring-2 focus:ring-neon-green/50 transition-all outline-none resize-none"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt || !selectedCharacter}
                  className="w-full bg-neon-green text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-neon-green/90 transition-all shadow-lg shadow-neon-green/50 hover:shadow-xl hover:shadow-neon-green/60 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5" />
                      生成图像
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">生成预览</h2>
              <div className="aspect-square bg-slate-700/30 rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center">
                {isGenerating ? (
                  <div className="text-center">
                    <RefreshCw className="w-12 h-12 text-neon-green animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">正在生成你的专属图像...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">图像将在这里显示</p>
                  </div>
                )}
              </div>

              {!isGenerating && prompt && (
                <div className="mt-4 flex gap-3">
                  <button className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    下载
                  </button>
                  <button className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg hover:bg-slate-600 transition-all flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    重新生成
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">最近生成</h3>
              <div className="grid grid-cols-2 gap-3">
                {(isNSFW ? [
                  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=300&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=300&h=300&fit=crop'
                ] : [
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
                  'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
                  'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
                  'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=300'
                ]).map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden border border-slate-600 hover:border-neon-green/50 transition-all cursor-pointer group">
                    <img
                      src={img}
                      alt={`生成图像 ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">生成技巧</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <span className="text-neon-green">•</span>
                  <p className="text-slate-300">详细描述场景和环境</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon-green">•</span>
                  <p className="text-slate-300">指定服装和配饰</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon-green">•</span>
                  <p className="text-slate-300">添加情绪和表情描述</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon-green">•</span>
                  <p className="text-slate-300">使用具体的视觉细节</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-neon-green/20 to-neon-green/5 rounded-2xl p-6 border border-neon-green/30">
              <h3 className="text-xl font-bold text-white mb-2">升级会员</h3>
              <p className="text-slate-300 text-sm mb-4">解锁更多高级功能和生成次数</p>
              <button className="w-full bg-neon-green text-slate-900 px-4 py-3 rounded-lg font-bold hover:bg-neon-green/90 transition-all">
                立即升级
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
