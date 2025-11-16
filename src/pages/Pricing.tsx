import { Check, Zap, Crown, Sparkles, Star } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  monthlyPrice?: string;
  icon: JSX.Element;
  popular?: boolean;
  features: string[];
  credits: string;
  highlight?: boolean;
}

export default function Pricing() {
  const tiers: PricingTier[] = [
    {
      name: '免费版',
      price: '¥0',
      icon: <Sparkles className="w-8 h-8" />,
      credits: '每月100积分',
      features: [
        '基础对话功能',
        '创建1个AI角色',
        '每日10条消息',
        '标准响应速度',
        '基础图像生成',
      ],
    },
    {
      name: '高级版',
      price: '¥99',
      monthlyPrice: '每月',
      icon: <Zap className="w-8 h-8" />,
      popular: true,
      credits: '每月1000积分',
      features: [
        '无限对话',
        '创建5个AI角色',
        '高级个性化定制',
        '优先响应速度',
        '高清图像生成',
        '角色扮演场景',
        '语音消息',
        '优先客服支持',
      ],
    },
    {
      name: '尊享版',
      price: '¥299',
      monthlyPrice: '每月',
      icon: <Crown className="w-8 h-8" />,
      highlight: true,
      credits: '每月5000积分',
      features: [
        '所有高级版功能',
        '无限创建AI角色',
        '专属定制功能',
        '最快响应速度',
        '超高清图像生成',
        '视频生成(即将推出)',
        '专属角色扮演场景',
        '语音和视频通话',
        '专属客服经理',
        '优先体验新功能',
      ],
    },
  ];

  const yearlyDiscount = '年付享8折优惠';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">
            选择适合你的方案
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            解锁更多功能,享受完整的AI伴侣体验
          </p>
          <div className="inline-flex items-center gap-2 bg-neon-green/20 text-neon-green px-6 py-3 rounded-full border border-neon-green/30">
            <Star className="w-5 h-5" />
            <span className="font-semibold">{yearlyDiscount}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all ${
                tier.highlight
                  ? 'border-neon-green shadow-2xl shadow-neon-green/20 scale-105'
                  : 'border-slate-700/50 hover:border-slate-600'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-neon-green text-slate-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    最受欢迎
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    tier.highlight
                      ? 'bg-neon-green text-slate-900'
                      : 'bg-gradient-to-br from-neon-green/20 to-neon-green/5 text-neon-green'
                  }`}
                >
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-black text-white">{tier.price}</span>
                  {tier.monthlyPrice && (
                    <span className="text-slate-400 ml-2">/{tier.monthlyPrice}</span>
                  )}
                </div>
                <div className="inline-block bg-slate-700/50 text-neon-green px-4 py-2 rounded-lg text-sm font-semibold">
                  {tier.credits}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  tier.highlight
                    ? 'bg-neon-green text-slate-900 hover:bg-neon-green/90 shadow-lg shadow-neon-green/50'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                {tier.price === '¥0' ? '立即开始' : '立即订阅'}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">常见问题</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-bold mb-2">如何使用积分系统?</h3>
                <p className="text-slate-400 text-sm">
                  积分可用于生成图像、解锁特殊功能和升级对话体验。不同功能消耗的积分数量不同。
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">可以随时取消订阅吗?</h3>
                <p className="text-slate-400 text-sm">
                  可以,您可以随时在账户设置中取消订阅。取消后,订阅将在当前计费周期结束时停止。
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">数据安全如何保障?</h3>
                <p className="text-slate-400 text-sm">
                  我们采用银行级加密技术保护您的数据,所有对话内容都经过加密存储,绝不会分享给第三方。
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-bold mb-2">支持哪些支付方式?</h3>
                <p className="text-slate-400 text-sm">
                  支持支付宝、微信支付、信用卡等多种支付方式,确保便捷安全的支付体验。
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">免费版有使用限制吗?</h3>
                <p className="text-slate-400 text-sm">
                  免费版提供基础功能体验,每日有消息数量限制。升级到付费版本可解锁无限对话和更多高级功能。
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">如何获取发票?</h3>
                <p className="text-slate-400 text-sm">
                  在账户设置中可以申请电子发票,我们会在3个工作日内发送到您的邮箱。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-600/50 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            还有疑问?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            我们的客服团队随时为您解答,让您的体验更加顺畅
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-neon-green text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-neon-green/90 transition-all shadow-lg shadow-neon-green/50">
              联系客服
            </button>
            <button className="bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-600 transition-all">
              查看帮助文档
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            所有价格均为人民币。价格可能会根据汇率和税费有所调整。
          </p>
        </div>
      </div>
    </div>
  );
}
