import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

const FloatingWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const toggleWindow = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowWelcome(false);
    }
  };

  return (
    <>
      {/* 浮窗组件容器 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* 欢迎消息气泡 */}
        {showWelcome && !isOpen && (
          <div className="animate-fade-in bg-white rounded-lg shadow-lg p-4 max-w-xs mr-2 relative">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-sm text-gray-700 pr-6">
              欢迎来到渲染AI! 👋
              <br />
              有什么可以帮助您的吗？
            </p>
          </div>
        )}

        {/* 展开的对话框 */}
        {isOpen && (
          <div className="animate-slide-up bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col overflow-hidden">
            {/* 头部 */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white p-1 overflow-hidden">
                  <img
                    src="/猫耳女孩线稿.png"
                    alt="助手"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI 助手</h3>
                  <p className="text-white/80 text-xs">随时为您服务</p>
                </div>
              </div>
              <button
                onClick={toggleWindow}
                className="text-white hover:bg-white/20 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 对话内容区域 */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-1 flex-shrink-0">
                  <img
                    src="/猫耳女孩线稿.png"
                    alt="助手"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
                  <p className="text-sm text-gray-800">
                    您好！我是渲染AI的 AI 助手。
                    <br />
                    <br />
                    我可以帮您：
                    <br />
                    • 了解我们的 AI 工具
                    <br />
                    • 回答技术问题
                    <br />
                    • 提供使用指导
                    <br />
                    <br />
                    请问有什么可以帮到您的吗？
                  </p>
                </div>
              </div>
            </div>

            {/* 输入框 */}
            <div className="p-4 bg-white border-t">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="输入您的问题..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-2 hover:opacity-90 transition-opacity">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 浮窗图标按钮 */}
        <button
          onClick={toggleWindow}
          className="group relative w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white p-2">
            <img
              src="/猫耳女孩线稿.png"
              alt="AI 助手"
              className="w-full h-full object-cover"
            />
          </div>
          {/* 脉动动画圆环 */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-400 animate-ping opacity-20"></div>
        </button>
      </div>

      {/* 添加动画样式 */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default FloatingWindow;
