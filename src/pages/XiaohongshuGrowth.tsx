import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import growthLogicImage from "@/assets/xiaohongshu-growth-logic.jpeg";

const XiaohongshuGrowth = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <article className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">增长实战</Badge>
              <Badge variant="secondary">小红书</Badge>
              <Badge variant="secondary">内容运营</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              如何在小红书涨粉的底层逻辑和套路？
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time>2025年1月30日</time>
              <span>•</span>
              <span>10分钟阅读</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop"
              alt="小红书涨粉"
              className="w-full h-full object-cover"
            />
          </div>

          <Separator />

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-6 text-foreground/90">
            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">1: 做小红书想破局？先搞懂平台底层逻辑！</h2>

            <p className="text-xl leading-relaxed text-muted-foreground">
              它本质是'社区'，不是单纯的内容分发平台
            </p>

            <img 
              src={growthLogicImage} 
              alt="小红书涨粉的6大核心策略" 
              className="w-full rounded-lg my-8 shadow-lg"
            />

            <div className="space-y-4">
              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <p className="font-semibold text-primary mb-3">❶ 算法偏爱"小而美"</p>
                <p>宁可推100个垂直领域小博主，也不捧少数头部大V</p>
              </div>

              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <p className="font-semibold text-primary mb-3">❷ 内容＞博主</p>
                <p>弱化个人IP，只强推"内容与用户精准匹配"的帖子</p>
                <p className="mt-2 text-sm">搞反这点，再努力都是白费！</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">2: 小红书用户吃哪套？3个"看起来"就赢了！</h2>

            <p className="font-semibold text-primary">核心需求就3个，抓准一个就能爆：</p>

            <div className="space-y-4 mt-6">
              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❶ 看起来"真"</h3>
                <p>滤镜别太重！用户要的是真实体验、真实测评，不是照骗</p>
              </div>

              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❷ 看起来"有用"</h3>
                <p>别写废话！必须给即时价值——要么学技巧，要么避坑，要么省时间</p>
              </div>

              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❸ 看起来"我也行"</h3>
                <p>别搞高不可攀的人设！要让用户觉得"她能做到，我也能"，给足希望感</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">3: 0粉起号的3步标准流程，亲测能激活账号！</h2>

            <div className="space-y-4">
              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❶ 前3天用"大字报"测试</h3>
                <p>直接用小红书App自带的图文模板发，快速测赛道适配度</p>
              </div>

              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❷ 借鉴≠照搬</h3>
                <p className="mb-2">找细分领域的低粉爆文（比如100粉赞藏500+）</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>70%参考框架</li>
                  <li>30%改细节（换案例、加个人观点）</li>
                </ul>
              </div>

              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❸ 用薯条助推激活算法</h3>
                <p>花最少的钱（比如50块）投"增加曝光"，让系统快速给账号打标签</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">4: 这2个战略决策，90%人做错就掉坑！</h2>

            <div className="space-y-4">
              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❶ 新手别轻易开蓝V、开店</h3>
                <p className="mb-2">一旦操作，账号会被划入"商业流量池"，自然流量直接砍半</p>
                <p className="text-sm text-muted-foreground">先把内容做好，有了稳定流量再考虑商业化</p>
              </div>

              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❷ 先明确一个核心目标</h3>
                <p className="mb-2 font-semibold text-primary">曝光、涨粉、变现，这三者大多时候是矛盾的！</p>
                <p>想三者兼顾，最后只会啥都得不到</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">5: 更扎心的真相：高流量≠高收入！</h2>

            <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="font-semibold text-lg mb-3">别被"10w+阅读"迷了眼——99%的情况是：</p>
              <p className="text-xl font-bold text-primary mb-3">流量越大、粉丝越多，反而越难赚钱！</p>
              <p>因为泛流量没精准需求，不如1000个垂直领域精准粉值钱</p>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">6: 内容能持续爆的4个策略，比"努力日更"更重要！</h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❶ 以量取胜</h3>
                <p className="text-sm">固定日更，把创作流程化</p>
                <p className="text-xs text-muted-foreground mt-2">（比如固定每天晚上8点发，内容框架提前列好）</p>
              </div>

              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❷ 以质取胜</h3>
                <p className="text-sm">这里的"质"不是文笔</p>
                <ul className="text-xs space-y-1 mt-2">
                  <li>• 创意角度（别人没说过的点）</li>
                  <li>• 专业视觉（清晰图片/剪辑）</li>
                </ul>
              </div>

              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❸ 以巧取胜</h3>
                <ul className="text-sm space-y-2">
                  <li><span className="font-semibold">标题：</span>加共鸣词（"谁懂啊""踩坑了""亲测有效"）</li>
                  <li><span className="font-semibold">标签：</span>加长尾词（"北京10平出租屋改造"）</li>
                </ul>
              </div>

              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❹ 制造议题</h3>
                <p className="text-sm">别只发"单向输出"的内容！</p>
                <p className="text-xs text-muted-foreground mt-2">要留互动钩子："你们觉得XX好用吗？评论区聊聊"</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">7: 最后3个核心认知，想长期做一定要记牢！</h2>

            <div className="space-y-6">
              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❶ 先给价值，再要流量</h3>
                <p>平台不会平白给你曝光，你得先输出对用户有用的内容，才会有流量反馈</p>
              </div>

              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❷ 保持一致性</h3>
                <p className="mb-2">不是内容一致，是<span className="font-bold text-primary">更新频率一致</span>！</p>
                <p className="text-sm">比如每天更、每周更3次，让系统知道你是活跃创作者</p>
              </div>

              <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-3 text-foreground">❸ 别追着粉丝跑</h3>
                <p className="mb-2 font-semibold">粉丝是"结果"，不是"目的"！</p>
                <p>你把价值做透了，粉丝自然来；反之，光靠套路涨粉，留不住也赚不到钱</p>
              </div>
            </div>

            <Separator className="my-12" />

            <div className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <h3 className="text-2xl font-bold mb-4 text-foreground">总结</h3>
              <p className="leading-relaxed">
                小红书涨粉的核心，不是套路和技巧，而是对平台逻辑的深刻理解。记住三个关键词：<span className="font-bold text-primary">真实、有用、可复制</span>。
                先给价值，再要流量；先做内容，再谈变现。只有这样，才能在小红书长期发展。
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default XiaohongshuGrowth;
