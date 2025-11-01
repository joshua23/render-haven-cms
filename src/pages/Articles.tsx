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
      title: "精通现代布局：CSS Grid",
      description: "深入探讨CSS Grid的强大功能，超越基础，创建复杂、响应式且可维护的网页布局。",
      date: "2025年1月10日",
      category: "设计",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop"
    },
    {
      id: 3,
      title: "深度学习直观入门",
      description: "揭开神经网络的神秘面纱。本指南提供了对深度学习是什么以及它如何工作的高层次、直观的理解。",
      date: "2025年1月15日",
      category: "AI",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop"
    },
    {
      id: 4,
      title: "使用原生JavaScript构建单页应用",
      description: "探索仅使用原生JavaScript和History API，在无框架的情况下创建单页应用的基础知识。",
      date: "2025年1月20日",
      category: "开发",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop"
    },
    {
      id: 5,
      title: "Web性能优化最佳实践",
      description: "掌握提升网站加载速度和运行效率的关键技术，为用户提供更流畅的体验。",
      date: "2025年1月25日",
      category: "性能",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
    },
    {
      id: 6,
      title: "React Hooks深度解析",
      description: "全面了解React Hooks的工作原理，学习如何编写更简洁、可维护的函数组件。",
      date: "2025年1月30日",
      category: "React",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=450&fit=crop"
    }
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
