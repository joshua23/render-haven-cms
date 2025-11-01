import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ArticleDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <article className="max-w-4xl mx-auto">
          {/* 文章头部 */}
          <header className="mb-12">
            <Badge className="mb-4" variant="secondary">
              技术哲学
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              On the Loop：Claude Code 与 Web Skills 的统一设计哲学
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <time dateTime="2025-01-01">2025年1月1日</time>
              <span>•</span>
              <span>15分钟阅读</span>
            </div>
          </header>

          <Separator className="mb-12" />

          {/* 文章内容 */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">一、从一张手绘图说起</h2>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                周六早上8点半，我和张南开会，讨论一个问题：能不能让 AI 24小时不停地写代码？
              </p>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                我拿出之前画的草图，这张图的核心思想：所有设计都应该基于价值。真问题才有真机会，技术的本质是提升人的能力。
              </p>
              
              <div className="my-8 p-6 bg-card/50 rounded-lg border border-border/40">
                <h3 className="text-xl font-semibold mb-4 text-foreground">AI agent 的角色转变：</h3>
                <ul className="space-y-2 text-foreground/80">
                  <li><strong>AI for Human：</strong>AI 辅助人类完成任务</li>
                  <li><strong>AI for AI：</strong>AI 之间相互协作</li>
                </ul>
                <p className="mt-4 text-foreground/80">连接两者的桥梁，就是 <strong className="text-primary">On the Loop</strong>。</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">二、In the Loop vs On the Loop：范式的转变</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-foreground">2.1 黑箱的智慧</h3>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                "传统编程：Input → 确定性算法 → Output。AI 编程：Input → [LM 黑箱：理解+推理+生成] → Output。大模型对我们就是个黑箱，不用理解内部机制，只关注输入质量和输出验证。"
              </p>
              <p className="mb-6 text-foreground/80 leading-relaxed">
                这个"黑箱理念"简单，但很关键。
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="text-xl font-semibold mb-4 text-foreground">传统开发（In the Loop）</h4>
                  <p className="text-sm text-foreground/70 mb-3">人类 → IDE → 手写代码 → 编译 → 调试 → 测试</p>
                  <p className="text-foreground/80">每一个环节都要人类参与。写代码、调试、测试，一个都少不了。</p>
                </div>

                <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="text-xl font-semibold mb-4 text-foreground">AI 开发（On the Loop）</h4>
                  <p className="text-sm text-foreground/70 mb-3">人类提供意图 → AI 黑箱自主执行 → 人类验证</p>
                  <p className="text-foreground/80">人类跳出循环，专注架构决策和结果验证。AI 在循环内自主完成具体实现。</p>
                </div>
              </div>

              <p className="text-lg font-medium text-primary">这就是效率的本质提升。</p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">三、设计哲学：从问题到架构</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-foreground">3.1 Value-Based：从价值出发</h3>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                答案是从价值出发：
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground/80">
                <li>识别真问题：重复性任务、容易出错的流程、人工低效的环节</li>
                <li>找到真机会：可以通过 AI 自动化解决的部分</li>
                <li>技术赋能：用工具提升人的能力，而不是替代人</li>
              </ol>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="text-xl font-semibold mb-3 text-foreground">Claude Code 的价值</h4>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li><strong>真问题：</strong>后端大量重复的 CRUD、测试、部署</li>
                    <li><strong>真机会：</strong>Sub-agents 自动化这些流程</li>
                    <li><strong>技术赋能：</strong>开发者从"写代码的人"变成"指挥 AI 团队的架构师"</li>
                  </ul>
                </div>

                <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="text-xl font-semibold mb-3 text-foreground">Web Skills 的价值</h4>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li><strong>真问题：</strong>每次创建 PPT、Word 文档都要重写相同的代码</li>
                    <li><strong>真机会：</strong>Skills 预置脚本，一次配置，永久复用</li>
                    <li><strong>技术赋能：</strong>用户从"手工制作者"变为"意图表达者"</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-foreground">3.2 Service as Software：从工具到服务</h3>
              <p className="mb-4 text-foreground/80 leading-relaxed">
                传统软件的交互模式：工具 → 人类操作 → 结果
              </p>
              <p className="mb-6 text-foreground/80 leading-relaxed">
                Claude Code 和 Web Skills 的交互模式：意图 → AI 服务 → 交付成果
              </p>
              <p className="text-lg font-medium text-primary mb-8">
                这就是 Service as Software 的理念。软件不再是"被使用的工具"，而是"提供服务的 Agent"。
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">四、Claude Code 的实现：Sub-agents 架构</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-foreground">4.1 核心设计：独立上下文窗口</h3>
              <p className="mb-6 text-foreground/80 leading-relaxed">
                "你要知道为什么西方厨师的刀具那么多，大的小的，不同的刀具解决不同的问题。你不能一把菜刀走天下。我们要用系统思维来解决问题。"
              </p>
              <p className="mb-6 text-foreground/80 leading-relaxed">
                这就是 Sub-agents 架构的精髓：<strong className="text-primary">专业化分工 + 独立隔离</strong>。
              </p>

              <div className="p-6 bg-card/50 rounded-lg border border-border/40 mb-8">
                <h4 className="text-xl font-semibold mb-4 text-foreground">架构示意</h4>
                <pre className="text-sm text-foreground/80 overflow-x-auto">
{`Main Agent (主控)
 ↓
 ├─→ laravel-planner (规划者)
 │     └─ 工具: Read, Grep
 │     └─ Context: 独立
 │
 ├─→ code-implementer (实现者)
 │     └─ 工具: Write, Edit
 │     └─ Context: 独立
 │
 ├─→ test-runner (测试者)
 │     └─ 工具: Bash, Read
 │     └─ Context: 独立
 │
 └─→ debugger (调试者)
      └─ 工具: Read, Grep, Edit
      └─ Context: 独立`}
                </pre>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-foreground">4.2 On the Loop 的四大体现</h3>
              
              <div className="space-y-6">
                <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="text-lg font-semibold mb-3 text-foreground">1. 自动委派（Automatic Delegation）</h4>
                  <p className="text-foreground/80 mb-3">用户不需要手动选择哪个 Sub-agent，主 Agent 根据任务描述自动委派。</p>
                  <p className="text-sm text-primary font-medium">关键点：用户只需表达意图，AI 自主决策执行路径。</p>
                </div>

                <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="text-lg font-semibold mb-3 text-foreground">2. 独立上下文窗口（Separate Context）</h4>
                  <p className="text-foreground/80 mb-3">每个 Sub-agent 有独立的 context window，避免不同任务之间的污染。</p>
                  <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1">
                    <li>避免不同任务之间的 context 污染</li>
                    <li>每个 agent 专注自己的领域</li>
                    <li>更高的 token 效率</li>
                  </ul>
                </div>

                <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="text-lg font-semibold mb-3 text-foreground">3. 专业化系统提示词（Specialized Prompts）</h4>
                  <p className="text-foreground/80">不同的 Sub-agent 有不同的"人格"和工作方式，确保每个 agent 都能在自己擅长的领域发挥最大价值。</p>
                </div>

                <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                  <h4 className="text-lg font-semibold mb-3 text-foreground">4. 工具权限隔离（Tool Permissions）</h4>
                  <p className="text-foreground/80 mb-3">每个 agent 只拥有完成其职责所需的最小工具集。</p>
                  <div className="text-sm text-foreground/80 space-y-2 mt-3">
                    <p><strong>为什么要隔离？</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>安全性：防止某个 agent 误操作破坏系统</li>
                      <li>可靠性：每个 agent 只做自己擅长的事</li>
                      <li>可追溯性：明确责任边界，便于调试</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">五、Web Skills 的实现：渐进式披露</h2>
              
              <h3 className="text-2xl font-semibold mb-4 text-foreground">5.1 核心设计：Progressive Disclosure</h3>
              <p className="mb-6 text-foreground/80 leading-relaxed">
                Skills 的架构设计体现了 Progressive Disclosure（渐进式披露）的理念：
              </p>

              <div className="p-6 bg-card/50 rounded-lg border border-border/40">
                <h4 className="text-xl font-semibold mb-4 text-foreground">三层加载机制</h4>
                <div className="space-y-4 text-foreground/80">
                  <div>
                    <p className="font-semibold mb-2">Layer 1: Metadata (始终在 context)</p>
                    <p className="text-sm">name + description（触发条件），约 100 words</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Layer 2: Instructions (触发后加载)</p>
                    <p className="text-sm">执行指令详细说明，约 1000 words</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Layer 3: Resources (按需调用)</p>
                    <p className="text-sm">scripts/ + references/，仅在需要时加载到 context</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">总结</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                On the Loop 是一种全新的人机协作范式，它不是简单的自动化，而是让 AI 真正成为可以独立完成任务的"服务"。
              </p>
              <p className="text-foreground/80 leading-relaxed">
                无论是 Claude Code 的 Sub-agents 架构，还是 Web Skills 的渐进式披露，核心都是同一个理念：<strong className="text-primary">人类专注于意图表达和价值判断，AI 负责具体执行和优化细节</strong>。
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
