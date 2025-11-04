import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import opusClipImage from "@/assets/opusclip-growth.jpg";

const OpusClipGrowth = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <article className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">增长实战</Badge>
              <Badge variant="secondary">产品策略</Badge>
              <Badge variant="secondary">AI 创业</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              OpusClip 增长实战：每个阶段最重要的那一件事
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time>2025年1月15日</time>
              <span>•</span>
              <span>谢君陶 @ OpusClip</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-video overflow-hidden rounded-lg">
            <img 
              src={opusClipImage} 
              alt="OpusClip 增长实战" 
              className="w-full h-full object-cover"
            />
          </div>

          <Separator />

          {/* Content */}
          <div className="prose prose-lg max-w-none space-y-6 text-foreground/90">
            <p className="text-xl leading-relaxed text-muted-foreground">
              谢君陶在 OpusClip 做了两年增长产品负责人。OpusClip 是近几年最成功的海外华人 AI 产品之一。
            </p>

            <p>
              他最近分享了一个问题：在产品的不同阶段，如果只能选一件最重要的事做，你会选什么？
            </p>

            <p>
              下面是他的答案。没有理论，全是实战经验。
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">冷启动：找 Partners，不找 Affiliates</h2>

            <p>
              很多团队冷启动时会犯一个错：广撒网找 Affiliates（推广分销）。
            </p>

            <p>
              问题在哪？这些人不是你的真实用户。他们只关心佣金，不会给有价值的产品反馈，带来的用户质量也参差不齐。
            </p>

            <p className="font-semibold text-primary">
              更好的做法：找 Partners。
            </p>

            <p>
              Partners 是你的真实用户。他们看到了产品潜力，愿意在早期帮你打磨、共建，甚至以更低价格帮你推广。
            </p>

            <p>
              举个例子。OpusClip 上线后推出了 Brand Partner Program，只和十几位创作者签年框。这十几个人带来了大量自然流量。
            </p>

            <p>
              Jon Youshaei 就是其中之一。他现在几乎所有短视频结尾都会加"Edited with OpusClip"。这种关系的价值，远超一百个 Affiliates。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">视频产品自带破圈能力</h3>

            <p>
              你的产品如果真正找到了 PMF，尤其是视频类产品，其实自带破圈能力。
            </p>

            <p>为什么？</p>

            <p>
              你的用户本身就是推广渠道。内容创作者会围绕 KOL 形成圈层。和几个 KOL 合作，借助他们的影响力打入圈层，就能快速建立用户群。
            </p>

            <p className="font-semibold text-primary">
              但有一点很关键：不要让创作者长期"为爱发电"。
            </p>

            <p>
              尽早建立正式的经济关系。只有这样，合作才能持续。
            </p>

            <p>
              创作者分享好工具，本身就是为受众创造价值。你的产品真的好用，他们自然愿意分享。
            </p>

            <p>
              产品方呢？这种合作带来的用户更精准。真实用户推荐的产品，吸引来的受众往往也是目标用户。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">怎么找到第一批 Partners</h3>

            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li className="font-semibold">锚定圈层</li>
              <p className="ml-6 mt-1">比如播客创作者、AI 视频导演圈。在一个圈子里集中发力。</p>
              
              <li className="font-semibold">筛选真实用户</li>
              <p className="ml-6 mt-1">从圈层中找到正在用你产品的人。</p>
              
              <li className="font-semibold">识别种子 KOL</li>
              <p className="ml-6 mt-1">从真实用户中筛选出有影响力的创作者。</p>
            </ol>

            <p>
              OpusClip 的 Brand Partner Program 做了两年，到现在只和十几位创作者深度合作。但这十几个人的价值，比几百个浅层合作要高得多。
            </p>

            <p>找达人的关键不在数量，在质量。</p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">转化：定价是最快的增长杠杆</h2>

            <p>
              冷启动之后，都想提升营收和增长。
            </p>

            <p>
              提升产品质量当然重要，但那是长期手段。早期更需要短期、确定性高的抓手，先把转化率优化起来，形成增长飞轮。
            </p>

            <p className="font-semibold text-primary">
              一个很有效的切入点：灵活的定价策略。
            </p>

            <p>
              很多创始人容易忽略：定价不是一成不变的，可以随产品阶段和用户需求动态调整。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">视频产品的定价抓手：定制化</h3>

            <p>
              视频产品的用户创作内容，是为了向受众传递价值。内容的核心在于独特性。
            </p>

            <p>
              最简单的方式：建立个人品牌——真人出镜、个人声音、Logo、字体。
            </p>

            <p className="font-semibold">两个案例：</p>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="font-semibold text-primary">RunwayML</p>
              <p>
                Standard 和 Pro 方案最大的差异：Pro 用户可以上传自己的声音，实现 Voice Cover 或 Lip Sync，让内容与个人品牌绑定。
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="font-semibold text-primary">Higgsfield</p>
              <p>
                核心付费功能：用户可以上传照片，创建专属角色。此后生成的所有图片，都保持这一角色的特征。这个功能直接带动了整体增长。
              </p>
            </div>

            <p>"定制化"是非常强的付费点。</p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">调整定价的三个原则</h3>

            <p>
              很多产品上线后不敢动价格，怕用户敏感。
            </p>

            <p>其实只要考虑这几点，就可以放心调整：</p>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-primary">1. 永远保护老用户利益</p>
                <p>
                  无论推出新方案还是增加层级，都要保证老用户体验不受损。甚至可以给额外权益。
                </p>
                <p>
                  老用户是长期增长的基石。他们的留存决定了 ARR 能做多大。他们的口碑决定了新用户怎么看你。
                </p>
              </div>

              <div>
                <p className="font-semibold text-primary">2. 搭建 AB 测试能力</p>
                <p>最好的定价是测出来的。AB 测试比很多人想得简单。</p>
              </div>

              <div>
                <p className="font-semibold text-primary">3. UI 传达也是定价的一部分</p>
                <p>
                  付费弹窗什么时候弹？展示哪些功能？文案怎么写？
                </p>
                <p>
                  简单调整弹窗时机、修改几句文案，可能就会带来 30% 甚至更高的转化提升。
                </p>
                <p>
                  这块被严重低估了。看过上百个产品的定价策略，真正做好的很少。
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">留存：长期最重要的增长指标</h2>

            <p>
              留存决定了付费规模能做多大。
            </p>

            <p>
              忽视留存去做增长，就像拿漏水的桶打水。再卖力，最后也只剩桶底那点水。
            </p>

            <p>举个例子。</p>

            <p>
              一家公司留存率 90%，另一家 80%。从留存角度看都很厉害。但反过来看流失率：前者 10%，后者 20%。半年后，前者的存量用户几乎是后者的两倍。
            </p>

            <p>用户量越大，留存越关键。</p>

            <p>
              付费基数越来越大，每天流失的老用户也越来越多。而新增用户不会无限增长，获客在一定阶段后会趋于平稳。
            </p>

            <p>
              流失率越高，越快进入零增长阶段——每天流失的用户和新增的用户数量相等。
            </p>

            <p>高留存是复利式增长的基石。</p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">提升留存的两条路径</h3>

            <p>Stripe 联创 Patrick Collison 说过一句话：</p>

            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
              大约 70% 的新产品想法来自于倾听那些有良好判断力的用户。而 30% 则是做一些本应大受欢迎，但并没有被明确提出的需求。
            </blockquote>

            <p className="font-semibold text-primary">第一条路径：70% 来自用户反馈</p>

            <p>
              OpusClip 搭建了"以用户为中心"的运营体系。
            </p>

            <p>他们主要有四个反馈渠道：</p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><span className="font-semibold">Discord</span>：社区互动，收集实时反馈</li>
              <li><span className="font-semibold">Intercom</span>：客服支持，处理 Bug 报告</li>
              <li><span className="font-semibold">Canny</span>：结构化收集功能需求，公开展示 roadmap</li>
              <li><span className="font-semibold">社交媒体</span>：监测潜在用户观点与品牌口碑</li>
            </ul>

            <p>即便在早期，也有很多方式运用用户数据：</p>

            <div className="space-y-3">
              <div>
                <p className="font-semibold">邮箱后缀可能很有信息量</p>
                <p>
                  OpusClip 通过分析邮箱后缀，发现了很多来自美国教会和房产中介的用户。这直接拓宽了理想用户画像。
                </p>
              </div>

              <div>
                <p className="font-semibold">用户关联的社交账号也很重要</p>
                <p>
                  通过分析这些账号，可以识别高影响力创作者，主动建立长期合作。联系已经在用你产品的用户，比 cold reach 陌生人容易得多。
                </p>
              </div>
            </div>

            <p className="font-semibold text-primary">第二条路径：30% 是用户没说出口的需求</p>

            <p>
              当你建立起反馈机制后，很容易被反馈淹没。客服团队每天收到大量负面反馈，自然会优先解决这些问题。
            </p>

            <p>
              但产品团队必须保留长期愿景，去抓那 30% 用户没说出口的方向。这 30% 往往决定了产品能否做出差异化。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">让反馈形成闭环</h3>

            <p>OpusClip 的做法：</p>

            <p className="font-semibold">内部机制</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>配备 5-6 位全职客服（团队只有 30 人时）</li>
              <li>客服每周输出报告，汇总 Top Feature Requests 和 Top Complaints</li>
              <li>配备工程和产品同事做自动化，让客服在处理数千张工单的同时，仍能快速提供有效洞察</li>
            </ul>

            <p className="font-semibold">闭环流程</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>产品团队明确并公示路线图，让一线同事清楚哪些需求被采纳、当前进度</li>
              <li>研发团队快速响应和修复 Bug，第一时间通知客服</li>
              <li>客服回传给用户</li>
            </ul>

            <p>
              从收集反馈，到内部响应，再到产品迭代和用户感知，形成完整闭环。
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">洞察：数据驱动但不过度投入</h2>

            <p>
              通过数据洞察用户需求、辅助决策，贯穿产品整个生命周期。
            </p>

            <p>
              但创业早期，到底该在数据上投入多少？要不要招数据科学家？要不要搭数据仓？
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">产品早期的数据策略</h3>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-primary">1. 优先关注高收益、确定性强的动作</p>
                <p>
                  比如定价 AB 测试。它不仅能带来直接收益，还能帮团队建立信心，让大家体会数据真的能驱动增长。
                </p>
              </div>

              <div>
                <p className="font-semibold text-primary">2. 定义好转化漏斗，逐步测试每个环节</p>
                <p>
                  从最简单的前端 AB 测试做起，比如功能渗透率实验。随着数据积累，再做更复杂的留存测试。
                </p>
              </div>
            </div>

            <p className="font-semibold text-primary">
              付费弹窗是最早应该测试的环节。
            </p>

            <p>
              你可以测试不同的触发时机、UI 设计和文案内容。
            </p>

            <p>举个例子。有个产品叫 Arcade Software，付费点抓得非常准。</p>

            <p>
              用户录完视频，系统自动生成 Product Demo。当用户搞定前三个 Demo，录完第四个视频，准备将它发布为公开项目时——付费弹窗出现。
            </p>

            <p>
              这个点非常精准。显然是多轮测试后得出的最佳方案。
            </p>

            <p>
              现在很多 To Prosumer 的产品，用户付费决策周期很短，可能 10 分钟内就完成。在这段时间内，他们频繁操作，有大量测试空间。
            </p>

            <p className="font-semibold text-primary">
              AB 测试的过程，本质上也是学习用户、寻找 PMF 的过程。
            </p>

            <p>
              用户的付费点在哪里，你的 PMF 很可能就在哪里。当你发现用户在某个节点更容易转化，往往意味着你找到了 Aha Moment——产品的核心价值所在。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">不同阶段的数据投入</h3>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-primary">0-50 人阶段</p>
                <p>
                  有一两个懂点数据的产品经理和工程师，稍微自学，再用一些 SaaS 工具，就能把 AB 测试体系搭起来。
                </p>
                <p>
                  北美有很多成熟工具，比如 Statsig 这样的 AB 测试平台，几乎即插即用，跑通一个完整实验可能用不了半小时。
                </p>
                <p>
                  这些工具对创业者很友好。前期通常对小公司免费，等规模变大后再收费。
                </p>
                <p>
                  所以早期阶段，完全可以重度依赖 SaaS 工具，几乎不用花钱。
                </p>
              </div>

              <div>
                <p className="font-semibold text-primary">50 人左右</p>
                <p>
                  数据需求变复杂，需要算 LTV、优化成本时，才考虑招一位全职数据分析师或数据科学家。
                </p>
              </div>

              <div>
                <p className="font-semibold text-primary">非常后期</p>
                <p>
                  才需要考虑招数仓的人，应对 SOC2 合规，降低对第三方 SaaS 的依赖。这些事情完全没必要一早就做。
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">一些反直觉的发现</h2>

            <p>
              做了那么多 AB 测试，有些结论挺有意思。
            </p>

            <p className="font-semibold text-primary">
              最好的 AB 测试，不是验证你原本的想法，而是让你学到意料之外的东西。
            </p>

            <p>
              OpusClip 遇到过一个例子。他们做短视频工具，有很多字幕模板。在一次设计改版中，把字幕模板的样式露出做得明显了些，结果转化率大幅提升。
            </p>

            <p>
              这其实很合理。短视频用户天然关注字幕模板。但他们之前没意识到，这个点的价值会这么大。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">Price Discrimination 值得做</h3>

            <p>
              根本原因在于毛利率。
            </p>

            <p>
              SaaS 产品毛利率通常能做到 70%-80%，但 AI 产品毛利率低很多，因为大量成本在模型厂商那里。
            </p>

            <p>但肯定有调整空间。</p>

            <p>
              比如 Listen Labs 有过一次大涨价，直接从几百美元一个月，提升到 3 万到 5 万美元一年。这应该是他们深入研究用户画像和付费意愿后的调整。
            </p>

            <p>
              所以，怎么探索一种能让用户产生高付费意愿的产品形态、怎么找到最适合的定价，是当下最核心的课题。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">付费周期的选择</h3>

            <p>
              其实不用想太复杂。如果希望留存更高、长期增长更稳，就延长付费周期。
            </p>

            <p>
              OpusClip 采用"月付 + 年付"组合策略。
            </p>

            <p>
              年付的主要目的是提升整体留存率。通常会设置比较大的折扣，引导转化。因为选择年付的用户留存更高，可以把折扣的 ROI 打正。
            </p>

            <p>
              当然，折扣的设置需要测试——在成本允许范围内，怎样让更多人转向年付。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">付费率 vs 留存率的权衡</h3>

            <p>
              比如加了水印，付费率可能立刻翻倍，但用户体验变差，流失也会增加。
            </p>

            <p>
              对初创团队来说，可以直接把测试周期拉长一点，比如跑半个月到一个月。观察付费率提升了多少、流失率增加了多少，再计算整体收益变化，就能得出结论。
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">OpusClip 成功的核心：品牌建设</h2>

            <p>
              想长期获得稳定流量和新增用户，就得有清晰的产品定义，最好能成为 Category Definer，定义一个全新品类。
            </p>

            <p>
              Manus 算是做到了，OpusClip 也算。人们想到"长剪短"的视频工具，第一个想到的大概率就是 Opus。
            </p>

            <p>怎么做到的？</p>

            <p className="font-semibold text-primary">把品牌做好。</p>

            <p>
              做好品牌，核心在于知道你的用户是谁、他们在哪里、怎么和他们建立连接。
            </p>

            <p>
              Opus 找第一批用户时，先定位在播客创作者这个圈层，然后发现这个社区往往会围绕 KOC、KOL 互相学习。于是从这里切入，找到最合适的 KOC、KOL，建立长期合作，把这小群人打透。
            </p>

            <p>
              之后，只要这群人想到"长剪短"，就会先想到 OpusClip，然后帮忙传播。
            </p>

            <p>
              这样，品牌、品类定义和壁垒，就都慢慢建立起来了。
            </p>

            <p>
              品牌能带来用户粘性和忠诚度。OpusClip 从内到外都围绕品牌在做。
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">AI 视频市场还在早期</h2>

            <p>
              市场还处于早期。
            </p>

            <p>
              可以从两个角度看这个问题：一是生成模型的可用性，二是 Agent 的可用性。
            </p>

            <p>
              现在单个模型还很难独立生成完整视频，很多时候需要靠 Agent 把不同片段拼接起来。
            </p>

            <p>
              无论是模型还是 Agent，都是今年 4 月之后才逐渐成熟的。
            </p>

            <p>
              所以整个行业仍处在早期探索阶段。
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">看好的产品形态</h3>

            <p>比如 Pixverse。它能和其他特效类产品拉开差距，靠两点：</p>

            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li className="font-semibold">针对专业运镜场景训练了大量 LoRA 模型</li>
              <p className="ml-6 mt-1">让特效真正能用于内容生产，而不只是娱乐。</p>
              
              <li className="font-semibold">非常注重角色一致性</li>
              <p className="ml-6 mt-1">让创作者可以围绕固定角色打造自己的 IP。创作者能用工具产出稳定的形象和风格，这个工具就能真正帮他们创造商业价值。</p>
            </ol>

            <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">真正 AI-Native 的产品什么时候出现</h3>

            <p>
              真正的卡点不在成本，在于生成式模型的学习成本和使用门槛太高。
            </p>

            <p>
              一方面，目前的视频模型和图片模型，从技术上说都还不是真正的多模态。它们往往需要依靠插件或脚本，把自然语言和视频生成过程串联起来。
            </p>

            <p>
              这个流程对传统创作者来说门槛很高。他们要熟悉模型，要学 Prompt Engineering，而且模型一旦迭代，还得从头再来。
            </p>

            <p>
              另一方面，不同模型各自擅长的场景不同，让很多创作者的工作流非常割裂。
            </p>

            <p className="font-semibold text-primary">
              未来最好有一个 Agent 产品，能把复杂的模型能力全部封装起来。
            </p>

            <p>
              让创作者只需通过自然语言、画布，或其他符合直觉的交互方式，就能完成创作和调用功能。
            </p>

            <p>
              最近出现很多"一键成片"或"画布式创作"的产品。它们本质上，都是在降低生成式技术的使用门槛和学习成本。
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">小结</h2>

            <p>
              OpusClip 的增长经验，听起来没有神奇秘诀。更多是把该做的事，用更科学的方式做得更好。
            </p>

            <p>
              <span className="font-semibold">获客</span>最重要的是理解用户，与他们共同成长。冷启动时，核心是找对的人，不求数量，但求少而精。
            </p>

            <p>
              <span className="font-semibold">转化</span>要以定价作为短期增长抓手。核心是不伤害老用户利益，通过优化 UI、UX 和文案，多做测试。
            </p>

            <p>
              <span className="font-semibold">留存</span>的关键是围绕客服建立反馈闭环，保持高效迭代链路，让用户感受到被倾听。同时别忽略那 30% 没说出口却非常重要的需求。
            </p>

            <p>
              <span className="font-semibold">洞察</span>的关键是 be resourceful，用好一切能收集到的数据。但不要超前规划，数据基建可以长期保持毛坯状态，够用就行。
            </p>

            <p>
              说起来简单，做起来难。每个环节都需要有足够好的人去推动、去落地。
            </p>

            <Separator className="my-8" />

            <p className="text-sm text-muted-foreground italic text-center">
              本文整理自 OpusClip 前增长产品负责人谢君陶的分享
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default OpusClipGrowth;
