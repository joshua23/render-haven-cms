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
      title: "OpusClip 增长实战：每个阶段最重要的那一件事",
      description: "OpusClip 增长产品负责人的实战经验分享，涵盖冷启动、转化、留存、数据洞察等关键环节的增长策略。",
      date: "2025年1月15日",
      category: "增长实战",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
      link: "/article/opusclip-growth"
    },
    {
      id: 4,
      title: "如何在小红书涨粉的底层逻辑和套路？",
      description: "从平台底层逻辑到内容策略，深度解析小红书涨粉的7大核心认知和实战技巧。",
      date: "2025年1月30日",
      category: "增长实战",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
      link: "/article/xiaohongshu-growth"
    },
    {
      id: 5,
      title: "AI伴侣的7大必备功能特性",
      description: "深度解析AI伴侣产品的核心功能，从个性化定制到情感支持，从对话能力到生产力工具，帮助你选择最适合的AI伴侣。",
      date: "2025年2月16日",
      category: "AI应用",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=450&fit=crop",
      link: "/article/ai-companion-features"
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
