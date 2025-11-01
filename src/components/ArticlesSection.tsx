import { ArticleCard } from "./ArticleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ArticlesSection = () => {
  const articles = [
    {
      id: 1,
      title: "使用原生JavaScript构建单页应用",
      description: "探索仅使用原生JavaScript和History API，在无框架的情况下创建单页应用的基础知识。",
      date: "October 28, 2025",
      category: "开发",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop"
    },
    {
      id: 2,
      title: "精通现代布局：CSS Grid",
      description: "深入探讨CSS Grid的强大功能，超越基础，创建复杂、响应式且可维护的网页布局。",
      date: "October 22, 2025",
      category: "设计",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop"
    },
    {
      id: 3,
      title: "深度学习直观入门",
      description: "揭开神经网络的神秘面纱。本指南提供了对深度学习是什么以及它如何工作的高层次、直观的理解。",
      date: "October 15, 2025",
      category: "AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop"
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
