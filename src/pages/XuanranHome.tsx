import { Sparkles, Image, MessageCircle, Wand2, Lock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNSFW } from '../contexts/NSFWContext';

export default function XuanranHome() {
  const { isNSFW } = useNSFW();
  return (
    <div className="min-h-screen bg-black">
      <section className="pt-48 pb-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-10 px-5 py-2 border border-neon-green/20 bg-neon-green/5">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-neon"></div>
            <span className="text-neon-green text-sm font-bold tracking-widest uppercase">先进AI技术驱动</span>
          </div>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none tracking-tighter">
            {isNSFW ? '释放你的想象' : '创造你的完美'}
            <span className="block mt-4 text-neon-green drop-shadow-neon">
              {isNSFW ? '成人AI伴侣' : 'AI伴侣'}
            </span>
          </h1>
          <p className="text-2xl text-neutral-400 mb-16 max-w-3xl leading-relaxed font-light">
            {isNSFW ? (
              <>
                探索无限可能,创建专属的成人AI伴侣。<br />
                享受私密、个性化的成人互动体验。
              </>
            ) : (
              <>
                使用强大的创作工具定制外观、性格和背景故事。<br />
                创建独特的AI伴侣,具备先进的对话和图像生成能力。
              </>
            )}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/create">
              <button className="px-12 py-5 bg-neon-green hover:brightness-110 text-black font-bold text-lg tracking-wide transition-all shadow-neon-lg">
                开始创作
              </button>
            </Link>
            <a href="#features">
              <button className="px-12 py-5 border-2 border-neutral-800 hover:border-neon-green text-white font-bold text-lg tracking-wide transition-all hover:shadow-neon">
                了解更多
              </button>
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="py-32 px-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              {isNSFW ? '成人专属功能' : '强大的AI功能'}
            </h2>
            <p className="text-xl text-neutral-400 font-light">
              {isNSFW ? '探索更多私密互动体验' : '创造完美伴侣所需的一切'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900">
            <Link to="/create" className="bg-black p-12 hover:bg-neutral-950 transition-colors group">
              <div className="mb-8">
                <Wand2 className="w-10 h-10 text-neon-green group-hover:scale-110 transition-transform drop-shadow-neon" strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">全面定制</h3>
              <p className="text-neutral-400 leading-relaxed text-lg font-light">
                设计AI伴侣的每一个方面。选择外观、性格特征、兴趣爱好和背景故事。
              </p>
            </Link>

            <Link to="/chat" className="bg-black p-12 hover:bg-neutral-950 transition-colors group">
              <div className="mb-8">
                <MessageCircle className="w-10 h-10 text-neon-green group-hover:scale-110 transition-transform drop-shadow-neon" strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">智能对话</h3>
              <p className="text-neutral-400 leading-relaxed text-lg font-light">
                体验由尖端AI驱动的自然流畅对话。建立有意义的连接。
              </p>
            </Link>

            <Link to="/generate" className="bg-black p-12 hover:bg-neutral-950 transition-colors group">
              <div className="mb-8">
                <Image className="w-10 h-10 text-neon-green group-hover:scale-110 transition-transform drop-shadow-neon" strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">图像生成</h3>
              <p className="text-neutral-400 leading-relaxed text-lg font-light">
                在任何场景中生成精美的个性化图像。高质量的视觉效果。
              </p>
            </Link>

            <Link to="/roleplay" className="bg-black p-12 hover:bg-neutral-950 transition-colors group">
              <div className="mb-8">
                <Sparkles className="w-10 h-10 text-neon-green group-hover:scale-110 transition-transform drop-shadow-neon" strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">角色扮演</h3>
              <p className="text-neutral-400 leading-relaxed text-lg font-light">
                探索无限的创意场景和故事情节。适应任何情境。
              </p>
            </Link>

            <div className="bg-black p-12 hover:bg-neutral-950 transition-colors group">
              <div className="mb-8">
                <Lock className="w-10 h-10 text-neon-green group-hover:scale-110 transition-transform drop-shadow-neon" strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">隐私优先</h3>
              <p className="text-neutral-400 leading-relaxed text-lg font-light">
                你的对话和创作完全私密。安全和数据保护放在首位。
              </p>
            </div>

            <div className="bg-black p-12 hover:bg-neutral-950 transition-colors group">
              <div className="mb-8">
                <Zap className="w-10 h-10 text-neon-green group-hover:scale-110 transition-transform drop-shadow-neon" strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">即时响应</h3>
              <p className="text-neutral-400 leading-relaxed text-lg font-light">
                体验闪电般快速的AI响应和图像生成。无缝互动。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="showcase" className="py-32 px-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              无限可能
            </h2>
            <p className="text-xl text-neutral-400 font-light">看看你可以用渲染AI创造什么</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900">
            {(isNSFW ? [
              { id: 1, img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=1200&fit=crop', name: '性感动漫' },
              { id: 2, img: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=1200&fit=crop', name: '魅惑少女' },
              { id: 3, img: '/Grok Ani.png', name: '诱人姿态' },
              { id: 4, img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&h=1200&fit=crop', name: '性感美人' },
              { id: 5, img: '/Grok Companion copy.webp', name: '动漫女神' },
              { id: 6, img: '/Grok Ani.webp', name: '二次元美女' },
            ] : [
              { id: 1, img: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800', name: '优雅女性' },
              { id: 2, img: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800', name: '时尚达人' },
              { id: 3, img: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800', name: '商务精英' },
              { id: 4, img: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=800', name: '活力女孩' },
              { id: 5, img: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=800', name: '魅力男士' },
              { id: 6, img: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=800', name: '自然美人' },
            ]).map((item) => (
              <div key={item.id} className="relative group overflow-hidden aspect-[3/4] bg-neutral-950">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-neon-green rounded-full shadow-neon"></div>
                    <span className="text-neon-green text-sm font-bold tracking-wider uppercase">AI生成</span>
                  </div>
                  <p className="text-white font-bold text-xl">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-8 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
            准备好创造你的<br />
            <span className="text-neon-green drop-shadow-neon">完美伴侣了吗?</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-12 font-light">
            加入数千名用户,开始创造精彩的AI伴侣
          </p>
          <Link to="/create">
            <button className="px-16 py-6 bg-neon-green hover:brightness-110 text-black font-bold text-xl tracking-wide transition-all shadow-neon-lg">
              免费开始
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
