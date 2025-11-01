import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Lightbulb, Rocket, Building2 } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* 页面标题 */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">关于</span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">渲染AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            通过先进的AI技术，让每个人都能轻松拥有完美的影像记忆
          </p>
        </div>

        {/* 产品愿景与使命 */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">产品愿景</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">
                  成为中国用户首选的AI图像处理应用，让每个人都能轻松拥有完美的影像记忆
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">产品使命</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">
                  通过先进的AI技术，为用户提供专业、便捷、高质量的图像处理服务，帮助用户修复珍贵回忆、创造美好瞬间
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 产品定位 */}
        <section className="mb-16">
          <Card className="border-border/40 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">产品定位</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 leading-relaxed text-lg">
                渲染app（Render）是一款智能图像处理应用，对标国际领先产品Remini，结合中国市场特点，提供图像增强、老照片修复、AI写真生成、证件照制作等核心功能，并通过语音助手提供更自然的交互体验。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 核心功能 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              核心功能
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <Badge className="mb-3">AI增强</Badge>
                <h3 className="text-lg font-semibold mb-2 text-foreground">图像增强</h3>
                <p className="text-sm text-muted-foreground">
                  一键提升照片清晰度和质量
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <Badge className="mb-3">智能修复</Badge>
                <h3 className="text-lg font-semibold mb-2 text-foreground">老照片修复</h3>
                <p className="text-sm text-muted-foreground">
                  让珍贵回忆焕发新生
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <Badge className="mb-3">AI写真</Badge>
                <h3 className="text-lg font-semibold mb-2 text-foreground">AI写真生成</h3>
                <p className="text-sm text-muted-foreground">
                  创造独特的艺术肖像
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <Badge className="mb-3">专业服务</Badge>
                <h3 className="text-lg font-semibold mb-2 text-foreground">证件照制作</h3>
                <p className="text-sm text-muted-foreground">
                  快速生成标准证件照
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 公司简介 */}
        <section className="mb-16">
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">公司简介</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">公司信息</h3>
                <p className="text-foreground/80 leading-relaxed">
                  上海智绘引擎科技有限公司成立于2025年10月21日，注册地址位于中国（上海）自由贸易试验区。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">经营范围</h3>
                <p className="text-foreground/80 leading-relaxed">
                  技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广；互联网数据服务。
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">特色项目</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">人工智能应用软件开发</Badge>
                  <Badge variant="secondary">数字内容制作服务</Badge>
                  <Badge variant="secondary">数据处理服务</Badge>
                  <Badge variant="secondary">数字技术服务</Badge>
                  <Badge variant="secondary">大数据服务</Badge>
                  <Badge variant="secondary">软件外包服务</Badge>
                  <Badge variant="secondary">智能机器人研发</Badge>
                  <Badge variant="secondary">人工智能硬件销售</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 技术优势 */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              技术优势
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm text-center p-6">
              <div className="text-4xl font-bold text-primary mb-2">AI驱动</div>
              <p className="text-muted-foreground">
                采用最先进的深度学习算法
              </p>
            </Card>

            <Card className="border-border/40 bg-card/50 backdrop-blur-sm text-center p-6">
              <div className="text-4xl font-bold text-primary mb-2">高效处理</div>
              <p className="text-muted-foreground">
                秒级完成图像处理任务
              </p>
            </Card>

            <Card className="border-border/40 bg-card/50 backdrop-blur-sm text-center p-6">
              <div className="text-4xl font-bold text-primary mb-2">本地优化</div>
              <p className="text-muted-foreground">
                针对中国用户需求深度定制
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
