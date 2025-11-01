import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="渲染AI" 
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              渲染AI
            </span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              首页
            </Link>
            <Link 
              to="/articles" 
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              文章
            </Link>
            <Link 
              to="/about" 
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              关于
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
