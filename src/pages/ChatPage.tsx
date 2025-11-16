import { useState, useEffect } from 'react';
import { Send, Image, Smile, MoreVertical, Phone, Video, Heart } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface Character {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastMessage: string;
}

export default function ChatPage() {
  useEffect(() => {
    document.title = '聊天消息 - 渲染AI';
  }, []);

  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: '嗨!很高兴见到你 😊 今天过得怎么样?',
      timestamp: '14:32',
    },
    {
      id: '2',
      sender: 'user',
      content: '还不错,刚刚工作结束',
      timestamp: '14:35',
    },
    {
      id: '3',
      sender: 'ai',
      content: '辛苦了!要不要聊聊天放松一下?我一直在想你 💕',
      timestamp: '14:36',
    },
  ]);

  const characters: Character[] = [
    {
      id: '1',
      name: '小美',
      avatar: '👩',
      status: 'online',
      lastMessage: '我一直在想你',
    },
    {
      id: '2',
      name: '艾米',
      avatar: '👱‍♀️',
      status: 'online',
      lastMessage: '晚安,做个好梦',
    },
    {
      id: '3',
      name: '莉莉',
      avatar: '👩‍🦰',
      status: 'offline',
      lastMessage: '明天见!',
    },
  ];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: '这是一个很好的话题!让我们继续聊聊吧 😊',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const selectedCharacter = characters.find(c => c.id === selectedChat);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex pt-20">
      <div className="w-80 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50 flex flex-col">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold text-white mb-2">消息</h2>
          <p className="text-slate-400 text-sm">与你的AI伴侣对话</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => setSelectedChat(char.id)}
              className={`w-full p-4 border-b border-slate-700/30 hover:bg-slate-700/30 transition-all text-left ${
                selectedChat === char.id ? 'bg-slate-700/50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon-green/20 to-neon-green/5 rounded-full flex items-center justify-center text-2xl">
                    {char.avatar}
                  </div>
                  {char.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-slate-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white">{char.name}</h3>
                    <span className="text-xs text-slate-500">刚刚</span>
                  </div>
                  <p className="text-sm text-slate-400 truncate">{char.lastMessage}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedCharacter && (
          <>
            <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-neon-green/20 to-neon-green/5 rounded-full flex items-center justify-center text-xl">
                    {selectedCharacter.avatar}
                  </div>
                  {selectedCharacter.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-slate-800"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-white">{selectedCharacter.name}</h3>
                  <p className="text-xs text-neon-green">在线</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                  <Video className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-neon-green/20 to-neon-green/5 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                        {selectedCharacter.avatar}
                      </div>
                    )}
                    <div>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-neon-green text-slate-900'
                            : 'bg-slate-700/50 text-white'
                        }`}
                      >
                        <p className="leading-relaxed">{message.content}</p>
                      </div>
                      <p className={`text-xs text-slate-500 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50 p-4">
              <div className="flex items-end gap-3">
                <button className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-neon-green transition-all flex-shrink-0">
                  <Image className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-neon-green transition-all flex-shrink-0">
                  <Smile className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="输入消息..."
                    rows={1}
                    className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-slate-600 focus:border-neon-green focus:ring-2 focus:ring-neon-green/50 transition-all outline-none resize-none"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 bg-neon-green rounded-lg flex items-center justify-center text-slate-900 hover:bg-neon-green/90 transition-all flex-shrink-0 shadow-lg shadow-neon-green/50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-80 bg-slate-800/50 backdrop-blur-sm border-l border-slate-700/50 p-6">
        {selectedCharacter && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-neon-green/20 to-neon-green/5 rounded-full flex items-center justify-center text-5xl mx-auto mb-4">
                {selectedCharacter.avatar}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{selectedCharacter.name}</h3>
              <p className="text-sm text-neon-green">在线</p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                查看资料
              </button>
              <button className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                <Image className="w-4 h-4" />
                生成图片
              </button>
            </div>

            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
              <h4 className="text-white font-semibold mb-3">关系统计</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300">
                  <span>亲密度</span>
                  <span className="text-neon-green font-bold">85%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>对话次数</span>
                  <span className="text-white font-semibold">1,234</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>认识天数</span>
                  <span className="text-white font-semibold">45天</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-neon-green/20 to-neon-green/5 rounded-xl p-4 border border-neon-green/30">
              <h4 className="text-white font-semibold mb-2">快速体验</h4>
              <p className="text-slate-300 text-sm mb-3">解锁语音通话和视频功能</p>
              <button className="w-full bg-neon-green text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-neon-green/90 transition-all">
                立即升级
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
