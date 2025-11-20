import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Volume2, Download, Play, Pause } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { apiGet, apiRequest } from '@/services/apiClient';

interface Voice {
  id: string;
  name: string;
  language?: string;
  gender?: string;
}

interface Model {
  id: string;
  name: string;
  description?: string;
}

interface ConvertResponse {
  success: boolean;
  data?: {
    audioUrl: string;
    fileName?: string;
  };
  message?: string;
}

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isLoadingVoices, setIsLoadingVoices] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // 加载模型列表
  useEffect(() => {
    fetchModels();
  }, []);

  // 加载音色列表
  useEffect(() => {
    if (selectedModel) {
      fetchVoices();
    }
  }, [selectedModel]);

  // 清理 blob URL，防止内存泄漏（仅在组件卸载时执行）
  useEffect(() => {
    return () => {
      // 组件卸载时清理
      if (audioUrl && audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(audioUrl);
      }
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 空依赖数组，只在组件卸载时清理

  const fetchModels = async () => {
    setIsLoadingModels(true);
    try {
      const result = await apiGet<{ success: boolean; data?: Model[]; message?: string }>(
        '/api/TextToSpeech/models'
      );
      
      if (result.success && result.data) {
        setModels(result.data);
        // 自动选择第一个模型
        if (result.data.length > 0) {
          setSelectedModel(result.data[0].id);
        }
      } else {
        toast({
          title: '加载失败',
          description: result.message || '无法加载模型列表',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '请求失败',
        description: error instanceof Error ? error.message : '无法连接到服务器，请检查网络连接',
        variant: 'destructive',
      });
      console.error('Failed to fetch models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const fetchVoices = async () => {
    setIsLoadingVoices(true);
    try {
      const result = await apiGet<{ success: boolean; data?: Voice[]; message?: string }>(
        '/api/TextToSpeech/voices'
      );
      
      if (result.success && result.data) {
        setVoices(result.data);
        // 自动选择第一个音色
        if (result.data.length > 0) {
          setSelectedVoice(result.data[0].id);
        }
      } else {
        toast({
          title: '加载失败',
          description: result.message || '无法加载音色列表',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '请求失败',
        description: error instanceof Error ? error.message : '无法连接到服务器，请检查网络连接',
        variant: 'destructive',
      });
      console.error('Failed to fetch voices:', error);
    } finally {
      setIsLoadingVoices(false);
    }
  };

  const handleConvert = async () => {
    if (!text.trim()) {
      toast({
        title: '请输入文本',
        description: '请输入要转换的文字内容',
        variant: 'destructive',
      });
      return;
    }

    if (text.length > 100) {
      toast({
        title: '文字过长',
        description: `当前 ${text.length} 字，单次转换最多支持 100 字`,
        variant: 'destructive',
      });
      return;
    }

    if (!selectedModel) {
      toast({
        title: '请选择模型',
        description: '请选择一个语音模型',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedVoice) {
      toast({
        title: '请选择音色',
        description: '请选择一个音色',
        variant: 'destructive',
      });
      return;
    }

    setIsConverting(true);
    
    // 停止并清理旧的音频
    if (audioElement) {
      audioElement.pause();
      audioElement.src = '';
      setAudioElement(null);
    }
    setIsPlaying(false);
    
    // 释放旧的 blob URL
    if (audioUrl && audioUrl.startsWith('blob:')) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl('');

    try {
      // 对于返回blob的请求，使用apiRequest并指定responseType
      const API_BASE_URL = 'https://xr-webapi.xrpic.com';
      
      const token = localStorage.getItem('xr_access_token');
      const response = await fetch(`${API_BASE_URL}/api/TextToSpeech/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          text: text,
          modelId: selectedModel,
          voiceId: selectedVoice,
          speed: 1,
          volume: 1,
          format: 'mp3',
        }),
      });

      if (!response.ok) {
        throw new Error(`转换失败: ${response.statusText}`);
      }

      // 接口直接返回 mp3 音频文件
      const audioBlob = await response.blob();
      
      // 创建本地 URL
      const localAudioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(localAudioUrl);
      
      toast({
        title: '转换成功',
        description: '语音已生成，可以播放或下载',
      });
    } catch (error) {
      console.error('Failed to convert text to speech:', error);
      toast({
        title: '转换失败',
        description: error instanceof Error ? error.message : '无法连接到服务器，请检查网络连接',
        variant: 'destructive',
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handlePlayPause = async () => {
    if (!audioUrl) {
      console.warn('No audio URL available');
      return;
    }

    try {
      if (!audioElement) {
        console.log('Creating new audio element with URL:', audioUrl);
        const audio = new Audio();
        
        audio.onended = () => {
          console.log('Audio playback ended');
          setIsPlaying(false);
        };
        
        audio.onerror = (e) => {
          console.error('Audio element error:', e);
          setIsPlaying(false);
          toast({
            title: '播放失败',
            description: '音频文件无法播放，请重试',
            variant: 'destructive',
          });
        };
        
        // 先设置 src，再设置到 state
        audio.src = audioUrl;
        setAudioElement(audio);
        
        // 尝试播放
        await audio.play();
        setIsPlaying(true);
        console.log('Audio playback started');
      } else {
        if (isPlaying) {
          console.log('Pausing audio');
          audioElement.pause();
          setIsPlaying(false);
        } else {
          console.log('Resuming audio playback');
          await audioElement.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Failed to play audio:', error);
      setIsPlaying(false);
      
      // 提供更详细的错误信息
      let errorMessage = '无法播放音频';
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // 针对常见错误提供具体建议
        if (error.name === 'NotAllowedError') {
          errorMessage = '浏览器阻止了自动播放，请点击播放按钮';
        } else if (error.name === 'NotSupportedError') {
          errorMessage = '浏览器不支持该音频格式';
        }
      }
      
      toast({
        title: '播放失败',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;

    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `tts_${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">文字转语音</h1>
            <p className="text-muted-foreground">
              输入文字，选择模型和音色，一键生成高质量语音
            </p>
          </div>

          <div className="grid gap-6">
            {/* 文本输入 */}
            <Card>
              <CardHeader>
                <CardTitle>输入文本</CardTitle>
                <CardDescription>请输入要转换成语音的文字内容（最多100字）</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="请输入要转换的文字..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <div className={`mt-2 text-sm text-right ${text.length > 100 ? 'text-red-500 font-medium' : 'text-muted-foreground'}`}>
                  {text.length} / 100 字
                </div>
              </CardContent>
            </Card>

            {/* 模型和音色选择 */}
            <Card>
              <CardHeader>
                <CardTitle>语音设置</CardTitle>
                <CardDescription>选择语音模型和音色</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 模型选择 */}
                <div className="space-y-2">
                  <Label htmlFor="model">语音模型</Label>
                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                    disabled={isLoadingModels}
                  >
                    <SelectTrigger id="model">
                      <SelectValue placeholder="选择模型" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                          {model.description && ` - ${model.description}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 音色选择 */}
                <div className="space-y-2">
                  <Label htmlFor="voice">音色</Label>
                  <Select
                    value={selectedVoice}
                    onValueChange={setSelectedVoice}
                    disabled={isLoadingVoices || !selectedModel}
                  >
                    <SelectTrigger id="voice">
                      <SelectValue placeholder="选择音色" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((voice) => (
                        <SelectItem key={voice.id} value={voice.id}>
                          {voice.name}
                          {voice.language && ` (${voice.language})`}
                          {voice.gender && ` - ${voice.gender}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 固定参数显示 */}
                <div className="p-4 bg-muted rounded-lg space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">语速：</span>
                    <span className="font-medium">1.0x（标准）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">音量：</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">格式：</span>
                    <span className="font-medium">MP3</span>
                  </div>
                </div>

                {/* 转换按钮 */}
                <Button
                  onClick={handleConvert}
                  disabled={isConverting || !text.trim() || !selectedModel || !selectedVoice}
                  className="w-full"
                  size="lg"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      转换中...
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-5 w-5" />
                      转换为语音
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* 音频播放和下载 */}
            {audioUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>生成结果</CardTitle>
                  <CardDescription>语音已生成，可以播放或下载</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button
                      onClick={handlePlayPause}
                      variant="outline"
                      className="flex-1"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          暂停
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          播放
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      下载
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 使用说明 */}
            <Card>
              <CardHeader>
                <CardTitle>使用说明</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>在文本框中输入要转换成语音的文字内容（最多100字）</li>
                  <li>选择合适的语音模型（不同模型有不同的语音特点）</li>
                  <li>选择喜欢的音色（男声、女声等不同风格）</li>
                  <li>点击"转换为语音"按钮开始生成</li>
                  <li>生成完成后可以在线播放或下载音频文件</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TextToSpeech;

