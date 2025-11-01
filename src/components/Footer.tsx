import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="渲染AI" className="h-8 w-8" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              渲染AI
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm">
            © 2025 渲染AI. 保留所有权利。
          </p>
          
          <div className="flex gap-6">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              隐私政策
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              使用条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
