import { ArticleCard } from "./ArticleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ArticlesSection = () => {
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
      title: "精通现代布局：CSS Grid",
      description: "深入探讨CSS Grid的强大功能，超越基础，创建复杂、响应式且可维护的网页布局。",
      date: "2025年1月10日",
      category: "设计",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">
            <span className="text-foreground">最新</span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">文章</span>
          </h2>
          
          <Button variant="ghost" className="group">
            查看全部
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};
