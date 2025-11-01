import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  image: string;
  category?: string;
  link?: string;
}

export const ArticleCard = ({ title, description, date, image, category, link }: ArticleCardProps) => {
  const content = (
    <Card className="group overflow-hidden bg-card border-border/40 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] cursor-pointer h-full">
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time>{date}</time>
            {category && (
              <>
                <span>•</span>
                <span className="text-primary">{category}</span>
              </>
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all duration-300">
            <span>阅读更多</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Card>
  );

  if (link) {
    return (
      <Link to={link} className="block">
        {content}
      </Link>
    );
  }

  return content;
};
