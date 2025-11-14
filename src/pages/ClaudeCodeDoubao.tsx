import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ClaudeCodeDoubao = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <article className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              国产大模型接入 Claude Code 实战指南
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <time>2025年1月25日</time>
              <span>·</span>
              <span>技术实战</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <p className="text-lg leading-relaxed mb-4">
                国产大模型如火如荼，新模型层出不穷，大家有没有在用？
              </p>
              <p className="text-lg leading-relaxed mb-4">
                很多同学用惯了现有模型，懒得尝试新模型，真的很可惜。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                我的做法是，只要是新模型，就尽量试用，体验最新训练成果。而且，推广期往往有优惠，不用白不用。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                今天就来分享，我怎么把国产大模型接入 Claude Code。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-foreground">一、为什么要接入国产大模型</h2>
              <p className="text-lg leading-relaxed mb-4">
                大家知道，Claude Code 是眼下最流行、公认功能最强的 AI 终端，但是限制国人使用。所以，我们要换掉它的底层模型。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                大家用我的方法，只需要几分钟，就可以简易快速地接入各种国产大模型，丝滑使用。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                这几天，字节旗下的豆包，正好发布了最新的编程模型 Doubao-Seed-Code。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                我就拿它来演示，顺便测一下这个模型。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-foreground">二、实现原理</h2>
              <p className="text-lg leading-relaxed mb-4">
                我要分享的方法，完全不影响 Claude Code 本身，它还能正常使用。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                也就是说，执行 <code className="px-2 py-1 bg-muted rounded">claude</code> 命令，调用的还是原来的 Claude Sonnet 4.5 模型。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <code className="text-sm">$ claude</code>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                我会新增一个 <code className="px-2 py-1 bg-muted rounded">claude-doubao</code> 命令，执行后底层模型就切换了。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <code className="text-sm">$ claude-doubao</code>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                这时，Claude Code 的功能一样都不少，但是使用的模型已经变成了 Doubao-Seed-Code。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                上面两个命令，可以同时使用，互不影响。你还能继续添加其他模型，每一个模型都有自己的调用命令，最大程度方便测试新模型。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-foreground">三、关于 Doubao-Seed-Code</h2>
              <p className="text-lg leading-relaxed mb-4">
                开始之前，我先简单介绍一下 Doubao-Seed-Code，优秀的国产模型值得好好宣传。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                它属于豆包大模型系列，是该系列第一个专门用于编程推理的模型。也就是说，这是字节跳动首次发布编程模型。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                根据 SWE-bench 的评测，它和同是字节旗下的智能 IDE 产品 Trae 的组合，在 SWE-Bench-Verified 的排行榜位列第一。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                我对这个模型非常感兴趣，主要有三个原因：
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li className="text-lg leading-relaxed">它是大厂的主推模型，模型质量、性能表现、响应速度都有保证。</li>
                <li className="text-lg leading-relaxed">它原生兼容 Anthropic API，可以丝滑接入 Claude Code，不用任何调整，是国外模型很好的平替。</li>
                <li className="text-lg leading-relaxed">它价格便宜，现在有一个 Coding Plan 活动，可以 API 包月。一般强度使用的情况下，首月只要9.9元（续费40元/月），官方的宣传是"属于国内最低价格"。</li>
              </ul>
              <p className="text-lg leading-relaxed mb-4">
                大家可以在火山方舟，开通这个模型的 API Key，后面要用到。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-foreground">四、具体操作步骤</h2>
              <p className="text-lg leading-relaxed mb-4">
                下面就来演示，Doubao-Seed-Code 如何快捷接入 Claude Code。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                如果你已经安装了 Claude Code，下面的方法完全不影响，还是正常使用。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                如果还没有安装 Claude Code，但想体验它的 Claude Sonnet 4.5 模型，可以根据官方文档进行安装，跟下面的方法也不冲突。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                更改底层模型，只需要三个步骤，几分钟即可。
              </p>

              <h3 className="text-2xl font-bold mb-4 text-foreground">第一步：创建独立安装环境</h3>
              <p className="text-lg leading-relaxed mb-4">
                新建一个项目目录 <code className="px-2 py-1 bg-muted rounded">claude-model</code>，在里面安装一个单独的 Claude Code。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
                <pre className="text-sm">
{`$ mkdir ~/claude-model
$ cd ~/claude-model
$ npm init -y
$ npm install @anthropic-ai/claude-code`}
                </pre>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                然后，新建一个子目录 <code className="px-2 py-1 bg-muted rounded">.claude-doubao</code>，用来存放豆包的配置文件和缓存。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <code className="text-sm">$ mkdir .claude-doubao</code>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-foreground mt-8">第二步：配置环境变量</h3>
              <p className="text-lg leading-relaxed mb-4">
                新建一个子目录 <code className="px-2 py-1 bg-muted rounded">bin</code>，用来存放可执行脚本。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <code className="text-sm">$ mkdir ~/claude-model/bin</code>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                然后，要把这个 bin 目录放入 PATH 变量，让系统可以找到里面的命令。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                PATH 变量的设置，macOS 可以修改 <code className="px-2 py-1 bg-muted rounded">~/.bash_profile</code> 文件，Linux 可以修改 <code className="px-2 py-1 bg-muted rounded">~/.bashrc</code> 文件，大概改成下面这样。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <code className="text-sm">export PATH="$HOME/claude-model/bin:$PATH"</code>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                改完后，别忘了重启终端。
              </p>

              <h3 className="text-2xl font-bold mb-4 text-foreground mt-8">第三步：创建启动脚本</h3>
              <p className="text-lg leading-relaxed mb-4">
                在上一步创建的 bin 目录里面，新建一个名为 <code className="px-2 py-1 bg-muted rounded">claude-doubao</code> 的脚本，用来调用豆包模型。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <code className="text-sm">$ touch ~/claude-model/bin/claude-doubao</code>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                在这个 <code className="px-2 py-1 bg-muted rounded">claude-doubao</code> 脚本里面，输入下面的内容。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
                <pre className="text-sm">
{`#!/usr/bin/env bash
# Wrapper for Claude Code CLI using Doubao API

CLAUDE_BIN="$HOME/claude-model/node_modules/.bin/claude"

# Inject API credentials
export ANTHROPIC_AUTH_TOKEN="YOUR_DOUBAO_API_KEY"
export ANTHROPIC_BASE_URL="https://ark.cn-beijing.volces.com/api/compatible"
export ANTHROPIC_MODEL="doubao-seed-code-preview-latest"
export API_TIMEOUT_MS=3000000

# Keep a separate config dir (optional)
export CLAUDE_CONFIG_DIR="$HOME/claude-model/.claude-doubao"

exec "$CLAUDE_BIN" "$@"`}
                </pre>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                注意，上面脚本里面的 API Key，要填入你自己申请的 Key。另外，模型的名称和 URL 可能会发生变化，最好核对一下最新的官方文档。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                然后，将它变成可执行脚本。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <code className="text-sm">$ chmod +x ~/claude-model/bin/claude-doubao</code>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                这样就完成了所有步骤，可以开始使用了。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                先测一下，Claude Code 是否正常运行。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <code className="text-sm">$ claude-doubao --version</code>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                以后，调用 Doubao-Seed-Code 模型，就用 <code className="px-2 py-1 bg-muted rounded">claude-doubao</code> 命令；调用原始的 Claude Code，就用 <code className="px-2 py-1 bg-muted rounded">claude</code> 命令。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
                <pre className="text-sm">
{`# 调用 Doubao-Seed-Code
$ claude-doubao

# 调用原始模型
$ claude`}
                </pre>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                上面的方法是通用的，其他模型也可以这样添加。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-foreground">五、实战测试</h2>
              <p className="text-lg leading-relaxed mb-4">
                下面，我们就用 Claude Code 来调用 Doubao-Seed-Code 模型，测试它的表现。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                以前，有一个著名的游戏《太空侵略者》（Space Invaders），大家都玩过吧，就是战斗机发射子弹，击落外星人舰队。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                我让 Doubao-Seed-Code 来生成这个游戏。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                首先，新建一个项目目录 <code className="px-2 py-1 bg-muted rounded">space-invaders</code>，在该目录中启动 Claude Code（使用 <code className="px-2 py-1 bg-muted rounded">claude-doubao</code> 命令）。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
                <pre className="text-sm">
{`$ mkdir space-invaders
$ cd space-invaders
$ claude-doubao`}
                </pre>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                然后，填入提示词，"使用 HTML 和 JavaScript 在网页上实现《太空侵略者》"。
              </p>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <code className="text-sm">Write an HTML and JavaScript page implementing space invaders</code>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                屏幕上就会不停滚动模型的思考步骤，大概两三分钟，所有文件就在 <code className="px-2 py-1 bg-muted rounded">space-invaders</code> 目录里面生成完毕。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                我没有做任何的修改，第一次生成就是可玩的，没有报错，所有操作都正常，令人满意。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                接着，我还测试让它生成"鹈鹕骑自行车"的 SVG 图片，效果也非常不错。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-foreground">六、使用体验总结</h2>
              <p className="text-lg leading-relaxed mb-4">
                总结一下，我用下来，Claude Code 接入 Doubao-Seed-Code 以后，用起来非常流畅，响应速度快，体验上跟原生模型没有差异。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                至于 Doubao-Seed-Code 这个编程模型本身，总体上令人满意：一步步的推理非常清晰，思考时间短，生成的代码完成度高，且容易读懂，往往一次就能运行成功。
              </p>
              <p className="text-lg leading-relaxed mb-4">
                考虑到它现在有 Coding Plan 活动，9.9元就可以 API 包月，性价比很高，大家如果需要编程模型，建议开通。
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ClaudeCodeDoubao;
