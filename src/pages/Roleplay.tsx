import { useState } from 'react';
import { Drama, Heart, Star, Flame, Moon, Coffee, Plane, BookOpen } from 'lucide-react';
import { useNSFW } from '../contexts/NSFWContext';

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  category: string;
  popular?: boolean;
  nsfw?: boolean;
}

export default function Roleplay() {
  const { isNSFW } = useNSFW();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: '全部', icon: <Star className="w-4 h-4" /> },
    { id: 'romantic', name: '浪漫', icon: <Heart className="w-4 h-4" /> },
    { id: 'adventure', name: '冒险', icon: <Plane className="w-4 h-4" /> },
    { id: 'fantasy', name: '奇幻', icon: <Moon className="w-4 h-4" /> },
    { id: 'daily', name: '日常', icon: <Coffee className="w-4 h-4" /> },
  ];

  const scenarios: Scenario[] = [
    {
      id: '1',
      title: '海滨日落约会',
      description: '在美丽的海滩边,伴着落日余晖,展开一场浪漫的约会之旅',
      icon: <Heart className="w-6 h-6" />,
      category: 'romantic',
      popular: true,
      nsfw: false,
    },
    {
      id: '2',
      title: '咖啡馆偶遇',
      description: '在城市角落的温馨咖啡馆里,来一场命中注定的邂逅',
      icon: <Coffee className="w-6 h-6" />,
      category: 'daily',
      popular: true,
      nsfw: false,
    },
    {
      id: '3',
      title: '月光下的秘密',
      description: '在神秘的月光森林中,探索隐藏的魔法世界',
      icon: <Moon className="w-6 h-6" />,
      category: 'fantasy',
      nsfw: false,
    },
    {
      id: '4',
      title: '环球旅行伴侣',
      description: '携手踏上环游世界的冒险,探索未知的异国风情',
      icon: <Plane className="w-6 h-6" />,
      category: 'adventure',
      popular: true,
      nsfw: false,
    },
    {
      id: '5',
      title: '图书馆的安静时光',
      description: '在古老的图书馆里,沉浸于知识的海洋和轻声细语的交谈',
      icon: <BookOpen className="w-6 h-6" />,
      category: 'daily',
      nsfw: false,
    },
    {
      id: '6',
      title: '星空下的告白',
      description: '在璀璨星空下,说出深藏心底的真挚情感',
      icon: <Star className="w-6 h-6" />,
      category: 'romantic',
      nsfw: false,
    },
    {
      id: '7',
      title: '午夜酒吧相遇',
      description: '在灯光朦胧的酒吧里,展开一段意想不到的故事',
      icon: <Flame className="w-6 h-6" />,
      category: 'romantic',
      nsfw: false,
    },
    {
      id: '8',
      title: '魔法学院新生',
      description: '进入神秘的魔法学院,开启充满魔法与冒险的校园生活',
      icon: <Drama className="w-6 h-6" />,
      category: 'fantasy',
      nsfw: false,
    },
    {
      id: '9',
      title: '私密卧室时光',
      description: '在私密的空间里,享受亲密无间的美好时刻',
      icon: <Flame className="w-6 h-6" />,
      category: 'romantic',
      popular: true,
      nsfw: true,
    },
    {
      id: '10',
      title: '激情旅程',
      description: '开启一段充满激情与感官刺激的奇妙之旅',
      icon: <Heart className="w-6 h-6" />,
      category: 'romantic',
      popular: true,
      nsfw: true,
    },
    {
      id: '11',
      title: '秘密温泉',
      description: '在隐蔽的温泉中,享受肉体与心灵的放松',
      icon: <Moon className="w-6 h-6" />,
      category: 'fantasy',
      nsfw: true,
    },
    {
      id: '12',
      title: '深夜诱惑',
      description: '当夜幕降临,探索那些隐藏在黑暗中的欲望',
      icon: <Flame className="w-6 h-6" />,
      category: 'romantic',
      nsfw: true,
    },
  ];

  const filteredScenarios = scenarios
    .filter(s => s.nsfw === isNSFW)
    .filter(s => selectedCategory === 'all' || s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 pt-32 pb-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            {isNSFW ? '成人角色扮演' : '角色扮演 & 情景探索'}
          </h1>
          <p className="text-xl text-slate-300">
            {isNSFW ? '探索私密的成人互动场景' : '沉浸在各种精心设计的互动场景中'}
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 shadow-2xl">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-neon-green text-slate-900 shadow-lg shadow-neon-green/50'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-neon-green/50 transition-all shadow-xl hover:shadow-2xl hover:shadow-neon-green/20 cursor-pointer group"
            >
              {scenario.popular && (
                <div className="flex justify-end mb-2">
                  <span className="bg-neon-green/20 text-neon-green text-xs font-bold px-3 py-1 rounded-full border border-neon-green/30">
                    热门
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-neon-green/20 to-neon-green/5 rounded-xl flex items-center justify-center text-neon-green group-hover:scale-110 transition-transform">
                  {scenario.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors">
                    {scenario.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-400 mb-4 leading-relaxed">
                {scenario.description}
              </p>

              <button className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg font-semibold hover:bg-neon-green hover:text-slate-900 transition-all group-hover:shadow-lg group-hover:shadow-neon-green/30">
                开始体验
              </button>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
            <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Drama className="w-6 h-6 text-neon-green" />
            </div>
            <h3 className="text-white font-bold text-center mb-2">丰富场景</h3>
            <p className="text-slate-400 text-center text-sm">
              {isNSFW ? '多样化的成人互动场景' : '从日常生活到奇幻冒险,应有尽有'}
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
            <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-neon-green" />
            </div>
            <h3 className="text-white font-bold text-center mb-2">自由发挥</h3>
            <p className="text-slate-400 text-center text-sm">
              按照自己的想法推动故事发展
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
            <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame className="w-6 h-6 text-neon-green" />
            </div>
            <h3 className="text-white font-bold text-center mb-2">沉浸体验</h3>
            <p className="text-slate-400 text-center text-sm">
              智能AI带来真实的互动感受
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">创建自定义场景</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            发挥创意,设计属于你自己的独特角色扮演场景
          </p>
          <button className="bg-neon-green text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-neon-green/90 transition-all shadow-lg shadow-neon-green/50">
            开始创建
          </button>
        </div>
      </div>
    </div>
  );
}
