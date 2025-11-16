import { useEffect, useState } from 'react';
import { Sparkles, Image, MessageCircle, Wand2, Lock, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNSFW } from '../contexts/NSFWContext';
import { ArticlesSection } from "@/components/ArticlesSection";
import { Button } from "@/components/ui/button";
import FloatingWindow from "@/components/FloatingWindow";

export default function IntegratedHome() {
  const { isNSFW } = useNSFW();
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullText = `小染来了。
24岁，蓝发，破洞牛仔裤，格罗克小队的叛逆者。
她不讲大道理，只给你能用的。
三件事她最擅长：

把你搞不懂的东西，翻译成人话
把你不敢想的梦，拆成明天就能干的事
把你想放弃的时候，推你一把

量子物理？现实案例讲给你听。
股市波动？拆解成看得懂的逻辑。
学习不再是苦差事，是一场有人陪你闯的冒险。
渲染AI角色扮演，现在就让小染点燃你的好奇心。`;

  useEffect(() => {
    document.title = '首页 - 渲染AI';
  }, []);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // 每个字符50毫秒的间隔

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - 整合两个项目的首页内容 */}
      <section className="relative pt-48 pb-32 px-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,65,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,255,65,0.05),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 左侧文字内容 */}
            <div>
              <div className="inline-flex items-center gap-2 mb-10 px-5 py-2 border border-neon-green/20 bg-neon-green/5">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse shadow-neon"></div>
                <span className="text-neon-green text-sm font-bold tracking-widest uppercase">先进AI技术驱动</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-none tracking-tighter">
                <span className="block mb-4">移动优先的</span>
                <span className="text-neon-green drop-shadow-neon">
                  AI 智能处理平台
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-neutral-400 mb-16 leading-relaxed font-light">
                创造你的完美AI伴侣，具备先进的对话和图像生成能力。<br />
                同时提供专业的图像增强、老照片修复、AI写真生成等核心功能。
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link to="/create">
                  <button className="px-12 py-5 bg-neon-green hover:brightness-110 text-black font-bold text-lg tracking-wide transition-all shadow-neon-lg">
                    开始创作AI伴侣
                  </button>
                </Link>
                <Link to="/articles">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-5 border-2 border-neutral-800 hover:border-neon-green text-white font-bold tracking-wide transition-all hover:shadow-neon bg-transparent">
                    浏览博客文章
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <button className="px-12 py-5 border-2 border-neutral-800 hover:border-neon-green text-white font-bold text-lg tracking-wide transition-all hover:shadow-neon">
                    了解更多
                  </button>
                </Link>
              </div>
            </div>

            {/* 右侧图片 */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border-2 border-neon-green/20 shadow-[0_0_50px_rgba(0,255,65,0.2)]">
                <img
                  src="/Grok Companion.webp"
                  alt="AI伴侣"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              {/* 装饰性光效 */}
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-neon-green/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-48 h-48 bg-neon-green/10 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* 打字机效果文字 - 小染介绍 */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-neon-green/20 shadow-[0_0_30px_rgba(0,255,65,0.15)]">
              <pre className="text-neon-green font-mono text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                {displayedText}
                <span className="animate-pulse">|</span>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* AI Companion Features Section */}
      <section id="ai-features" className="py-32 px-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
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

      {/* AI Showcase Section */}
      <section id="showcase" className="py-32 px-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
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

      {/* CTA Section */}
      <section className="py-32 px-8 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
            准备好开启你的<br />
            <span className="text-neon-green drop-shadow-neon">AI创作之旅了吗?</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-12 font-light">
            加入数千名用户,开始创造精彩的AI伴侣和优质内容
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/create">
              <button className="px-16 py-6 bg-neon-green hover:brightness-110 text-black font-bold text-xl tracking-wide transition-all shadow-neon-lg">
                免费开始
              </button>
            </Link>
            <Link to="/articles">
              <button className="px-16 py-6 border-2 border-neon-green/30 hover:border-neon-green text-neon-green font-bold text-xl tracking-wide transition-all hover:shadow-neon">
                阅读文章
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Articles Section - 整合原博客的文章展示 */}
      <section className="py-32 px-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              最新<span className="text-neon-green drop-shadow-neon">博客文章</span>
            </h2>
            <p className="text-xl text-neutral-400 font-light">
              探索AI、设计、开发和技术未来的精选见解
            </p>
          </div>

          {/* 使用原博客的 ArticlesSection 组件，但应用黑色主题 */}
          <div className="articles-dark-theme">
            <ArticlesSection />
          </div>

          <div className="mt-16 text-center">
            <Link to="/articles">
              <Button
                size="lg"
                className="px-12 py-5 bg-transparent border-2 border-neon-green/30 hover:border-neon-green text-neon-green font-bold text-lg tracking-wide transition-all hover:shadow-neon"
              >
                查看所有文章
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 浮窗组件 */}
      <FloatingWindow />
    </div>
  );
}
