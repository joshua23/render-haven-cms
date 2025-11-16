import { useState, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, User, Heart, Zap } from 'lucide-react';
import { useNSFW } from '../contexts/NSFWContext';

export default function CreateCharacter() {
  const { isNSFW } = useNSFW();

  useEffect(() => {
    document.title = '创建角色 - 渲染AI';
  }, []);
  const [characterType, setCharacterType] = useState<'female' | 'male' | 'anime'>('female');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    ethnicity: '',
    personality: '',
    occupation: '',
    hobbies: '',
    relationship: '',
    backstory: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Character created:', { characterType, ...formData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 pt-32 pb-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            打造你的完美AI伴侣
          </h1>
          <p className="text-xl text-slate-300">
            个性化定制外观、性格和背景故事
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-neon-green" />
              选择角色类型
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {(isNSFW ? [
                { type: 'female' as const, label: '女性', img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop' },
                { type: 'male' as const, label: '男性', img: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop' },
                { type: 'anime' as const, label: '动漫风格', img: '/Grok Ani.webp' }
              ] : [
                { type: 'female' as const, label: '女性', img: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { type: 'male' as const, label: '男性', img: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { type: 'anime' as const, label: '动漫风格', img: 'https://images.pexels.com/photos/5012006/pexels-photo-5012006.jpeg?auto=compress&cs=tinysrgb&w=400' }
              ]).map((item) => (
                <button
                  key={item.type}
                  onClick={() => setCharacterType(item.type)}
                  className={`relative overflow-hidden rounded-xl font-semibold transition-all aspect-[3/4] group ${
                    characterType === item.type
                      ? 'ring-4 ring-neon-green shadow-lg shadow-neon-green/50'
                      : 'ring-2 ring-slate-700 hover:ring-slate-600'
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 flex items-center justify-center ${
                    characterType === item.type
                      ? 'bg-neon-green/90'
                      : 'bg-slate-900/60 group-hover:bg-slate-900/40'
                  } transition-all`}>
                    <span className={`text-lg font-bold ${
                      characterType === item.type ? 'text-slate-900' : 'text-white'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  <Heart className="w-4 h-4 inline mr-2 text-neon-green" />
                  姓名
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="给你的AI伴侣起个名字"
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-neon-green focus:ring-2 focus:ring-neon-green/50 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  年龄
                </label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="例如: 25岁"
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-neon-green focus:ring-2 focus:ring-neon-green/50 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  种族/外貌
                </label>
                <input
                  type="text"
                  name="ethnicity"
                  value={formData.ethnicity}
                  onChange={handleInputChange}
                  placeholder="例如: 亚洲、欧美、混血"
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-neon-green focus:ring-2 focus:ring-neon-green/50 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  职业
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  placeholder="例如: 医生、艺术家、学生"
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-neon-green focus:ring-2 focus:ring-neon-green/50 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                <Sparkles className="w-4 h-4 inline mr-2 text-neon-green" />
                性格特点
              </label>
              <textarea
                name="personality"
                value={formData.personality}
                onChange={handleInputChange}
                placeholder="描述性格特征,例如: 开朗、幽默、善解人意、充满活力..."
                rows={3}
                className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-neon-green focus:ring-2 focus:ring-neon-green/50 transition-all outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                爱好兴趣
              </label>
              <textarea
                name="hobbies"
                value={formData.hobbies}
                onChange={handleInputChange}
                placeholder="例如: 阅读、旅行、烹饪、音乐、运动..."
                rows={2}
                className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-neon-green focus:ring-2 focus:ring-neon-green/50 transition-all outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                关系设定
              </label>
              <select
                name="relationship"
                value={formData.relationship}
                onChange={handleInputChange}
                className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-neon-green focus:ring-2 focus:ring-neon-green/50 transition-all outline-none"
              >
                <option value="">选择关系类型</option>
                <option value="girlfriend">女朋友/男朋友</option>
                <option value="friend">朋友</option>
                <option value="mentor">导师</option>
                <option value="romantic">浪漫伴侣</option>
                <option value="companion">陪伴者</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">
                <ImageIcon className="w-4 h-4 inline mr-2 text-neon-green" />
                背景故事
              </label>
              <textarea
                name="backstory"
                value={formData.backstory}
                onChange={handleInputChange}
                placeholder="创造一个引人入胜的背景故事..."
                rows={4}
                className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-neon-green focus:ring-2 focus:ring-neon-green/50 transition-all outline-none resize-none"
              />
            </div>

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-neon-green text-slate-900 px-12 py-4 rounded-xl font-bold text-lg hover:bg-neon-green/90 transition-all shadow-lg shadow-neon-green/50 hover:shadow-xl hover:shadow-neon-green/60 flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                创建AI伴侣
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-neon-green" />
            </div>
            <h3 className="text-white font-bold mb-2">完全定制化</h3>
            <p className="text-slate-400">打造独一无二的AI伴侣</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-neon-green" />
            </div>
            <h3 className="text-white font-bold mb-2">智能交互</h3>
            <p className="text-slate-400">基于先进AI语言模型</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-neon-green" />
            </div>
            <h3 className="text-white font-bold mb-2">隐私保护</h3>
            <p className="text-slate-400">你的对话绝对私密安全</p>
          </div>
        </div>
      </div>
    </div>
  );
}
