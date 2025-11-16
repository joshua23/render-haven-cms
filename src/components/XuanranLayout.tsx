import { Link, Outlet, useLocation } from 'react-router-dom';
import { useNSFW } from '../contexts/NSFWContext';

export default function XuanranLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isNSFW, toggleNSFW } = useNSFW();

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-neutral-900 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/启动页.png" alt="渲染AI" className="w-10 h-10 rounded-lg drop-shadow-neon" />
            <span className="text-white text-2xl font-black tracking-tight">渲染AI</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`${
                location.pathname === '/'
                  ? 'text-neon-green'
                  : 'text-neutral-400 hover:text-neon-green'
              } transition-colors font-medium tracking-wide`}
            >
              首页
            </Link>
            <Link
              to="/create"
              className={`${
                location.pathname === '/create'
                  ? 'text-neon-green'
                  : 'text-neutral-400 hover:text-neon-green'
              } transition-colors font-medium tracking-wide`}
            >
              创建角色
            </Link>
            <Link
              to="/generate"
              className={`${
                location.pathname === '/generate'
                  ? 'text-neon-green'
                  : 'text-neutral-400 hover:text-neon-green'
              } transition-colors font-medium tracking-wide`}
            >
              图像生成
            </Link>
            <Link
              to="/roleplay"
              className={`${
                location.pathname === '/roleplay'
                  ? 'text-neon-green'
                  : 'text-neutral-400 hover:text-neon-green'
              } transition-colors font-medium tracking-wide`}
            >
              角色扮演
            </Link>
            <Link
              to="/chat"
              className={`${
                location.pathname === '/chat'
                  ? 'text-neon-green'
                  : 'text-neutral-400 hover:text-neon-green'
              } transition-colors font-medium tracking-wide`}
            >
              消息
            </Link>
            <Link
              to="/articles"
              className={`${
                location.pathname === '/articles'
                  ? 'text-neon-green'
                  : 'text-neutral-400 hover:text-neon-green'
              } transition-colors font-medium tracking-wide`}
            >
              博客
            </Link>
            <Link
              to="/about"
              className={`${
                location.pathname === '/about'
                  ? 'text-neon-green'
                  : 'text-neutral-400 hover:text-neon-green'
              } transition-colors font-medium tracking-wide`}
            >
              关于
            </Link>
            <Link
              to="/pricing"
              className={`${
                location.pathname === '/pricing'
                  ? 'text-neon-green'
                  : 'text-neutral-400 hover:text-neon-green'
              } transition-colors font-medium tracking-wide`}
            >
              价格
            </Link>

            <button
              onClick={toggleNSFW}
              className={`px-6 py-2 rounded-full font-bold tracking-wide transition-all border-2 ${
                isNSFW
                  ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/50'
                  : 'bg-transparent border-neutral-700 text-neutral-400 hover:border-neutral-600'
              }`}
            >
              {isNSFW ? 'NSFW' : 'SFW'}
            </button>

            <Link to="/create">
              <button className="px-8 py-3 bg-neon-green hover:brightness-110 text-black font-bold tracking-wide transition-all shadow-neon">
                立即创建
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      {isHomePage && (
        <footer className="border-t border-neutral-900 py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-16 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <img src="/启动页.png" alt="渲染AI" className="w-8 h-8 rounded-lg drop-shadow-neon" />
                  <span className="text-white text-xl font-black tracking-tight">渲染AI</span>
                </div>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                  创造你的完美AI伴侣,具备先进的定制和对话能力。
                </p>
              </div>

              <div>
                <h4 className="text-white font-black mb-6 tracking-wide uppercase text-sm">产品</h4>
                <ul className="space-y-3 text-neutral-500 text-sm font-light">
                  <li><Link to="/create" className="hover:text-neon-green transition-colors">功能特性</Link></li>
                  <li><Link to="/pricing" className="hover:text-neon-green transition-colors">价格</Link></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">常见问题</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-black mb-6 tracking-wide uppercase text-sm">公司</h4>
                <ul className="space-y-3 text-neutral-500 text-sm font-light">
                  <li><Link to="/about" className="hover:text-neon-green transition-colors">关于我们</Link></li>
                  <li><Link to="/articles" className="hover:text-neon-green transition-colors">博客</Link></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">联系我们</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-black mb-6 tracking-wide uppercase text-sm">法律</h4>
                <ul className="space-y-3 text-neutral-500 text-sm font-light">
                  <li><a href="#" className="hover:text-neon-green transition-colors">隐私政策</a></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">服务条款</a></li>
                  <li><a href="#" className="hover:text-neon-green transition-colors">使用指南</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-900 text-center text-neutral-600 text-sm font-light">
              <p>&copy; 2024 渲染AI. 版权所有</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
