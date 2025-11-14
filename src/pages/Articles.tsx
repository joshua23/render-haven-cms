import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "On the Loop：Claude Code 与 Web Skills 的统一设计哲学",
      description: "探索 AI 开发的新范式，从 In the Loop 到 On the Loop 的转变，以及如何通过 Sub-agents 架构实现真正的自动化开发。",
      date: "2025年1月1日",
      category: "技术哲学",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
      link: "/article/claude-code-web-skills"
    },
    {
      id: 2,
      title: "塑造AI语音助手的视觉形象",
      description: "深入探讨语音助手UI设计的三种基础类型，从传统型到抽象型、拟人型的演化路径，以及移动端与车机端的设计差异。",
      date: "2025年1月5日",
      category: "UI设计",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=450&fit=crop",
      link: "/article/voice-assistant-ui"
    },
    {
      id: 3,
      title: "OpusClip 增长实战：每个阶段最重要的那一件事",
      description: "OpusClip 增长产品负责人的实战经验分享，涵盖冷启动、转化、留存、数据洞察等关键环节的增长策略。",
      date: "2025年1月15日",
      category: "增长实战",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
      link: "/article/opusclip-growth"
    },
    {
      id: 4,
      title: "信息降维的艺术：从三体到一页纸",
      description: "探讨信息降维的技术与艺术，从照片到数据可视化，从传统艺术到AI时代，如何在有限空间传递丰富信息。",
      date: "2025年1月20日",
      category: "技术哲学",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
      link: "/article/info-dimension-reduction"
    },
    {
      id: 5,
      title: "国产大模型接入 Claude Code 实战指南",
      description: "详细讲解如何将豆包等国产大模型接入 Claude Code，实现多模型切换使用，性价比高且操作简单。",
      date: "2025年1月25日",
      category: "技术实战",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
      link: "/article/claude-code-doubao"
    },
    {
      id: 6,
      title: "如何在小红书涨粉的底层逻辑和套路？",
      description: "从平台底层逻辑到内容策略，深度解析小红书涨粉的7大核心认知和实战技巧。",
      date: "2025年1月30日",
      category: "增长实战",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
      link: "/article/xiaohongshu-growth"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">所有</span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">文章</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            探索设计、开发和技术未来的精选见解
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
