import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const FloatingWindow = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  const toggleWindow = () => {
    navigate("/about");
  };

  return (
    <>
      {/* 浮窗组件容器 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* 欢迎消息气泡 */}
        {showWelcome && (
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

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default FloatingWindow;
