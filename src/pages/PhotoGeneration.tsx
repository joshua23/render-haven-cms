import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Image as ImageIcon, Download, RefreshCw, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiUpload, apiGet } from '@/services/apiClient';
import { getToken } from '@/services/authService';

interface Template {
  templateCode: string;
  templateName: string;
  description: string;
  previewUrl: string;
  category: string;
}

interface TemplatesResponse {
  success: boolean;
  data: Template[];
}

interface TaskCreateResponse {
  taskId: string;
  message: string;
  createdAt: string;
}

interface TaskStatusResponse {
  taskId: string;
  taskType: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  progress: number;
  userId: string;
  inputFileUrl: string | null;
  outputFileUrl: string | null;
  errorMessage: string | null;
  retryCount: number;
  maxRetryCount: number;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  lastRetryAt: string | null;
}

const PhotoGeneration = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskStatus, setTaskStatus] = useState<TaskStatusResponse | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [outputImageUrl, setOutputImageUrl] = useState<string>('');

  // 获取模板列表
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoadingTemplates(true);
        const response = await apiGet<TemplatesResponse>('/api/Task/photo/templates', {
          requireAuth: true,
        });
        
        if (response.success && response.data) {
          setTemplates(response.data);
          // 默认选择第一个模板
          if (response.data.length > 0) {
            setSelectedTemplate(response.data[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch templates:', error);
        toast({
          title: '获取模板失败',
          description: error instanceof Error ? error.message : '无法加载模板列表，请稍后重试',
          variant: 'destructive',
        });
      } finally {
        setLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, [toast]);

  // 清理轮询
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // 清理预览 URL
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      toast({
        title: '文件类型错误',
        description: '请选择图片文件',
        variant: 'destructive',
      });
      return;
    }

    // 验证文件大小（10MB）
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: '文件过大',
        description: '图片大小不能超过 10MB',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);

    // 创建预览
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // 重置任务状态
    setTaskId(null);
    setTaskStatus(null);
    setOutputImageUrl('');
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast({
        title: '请选择图片',
        description: '请先选择要处理的图片文件',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedTemplate) {
      toast({
        title: '请选择模板',
        description: '请先选择一个写真模板',
        variant: 'destructive',
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: '未登录',
        description: '请先登录后再使用此功能',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 检查 token 是否存在
      const token = getToken();
      if (!token) {
        toast({
          title: '认证失败',
          description: '未找到认证 token，请先登录',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      // 创建 FormData
      const formData = new FormData();
      formData.append('TemplateCode', selectedTemplate.templateCode);
      formData.append('UserId', user.id);
      formData.append('InputFile', selectedFile);

      // 调试信息
      console.log('Submitting photo generation task:', {
        userId: user.id,
        templateCode: selectedTemplate.templateCode,
        hasToken: !!token,
        tokenPreview: token.substring(0, 20) + '...',
      });

      // 调用 API 创建任务
      const response = await apiUpload<TaskCreateResponse>(
        '/api/Task/photo',
        formData,
        {
          requireAuth: true,
        }
      );

      setTaskId(response.taskId);
      setTaskStatus(null);
      setOutputImageUrl('');

      toast({
        title: '任务已创建',
        description: response.message || '正在后台处理，请稍候...',
      });

      // 开始轮询任务状态
      startPolling(response.taskId);
    } catch (error) {
      console.error('Failed to create task:', error);
      toast({
        title: '创建任务失败',
        description: error instanceof Error ? error.message : '无法连接到服务器，请检查网络连接',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const startPolling = (taskId: string) => {
    setIsPolling(true);

    // 立即查询一次
    checkTaskStatus(taskId);

    // 每3秒轮询一次
    pollingIntervalRef.current = setInterval(() => {
      checkTaskStatus(taskId);
    }, 3000);
  };

  const checkTaskStatus = async (taskId: string) => {
    try {
      const status = await apiGet<TaskStatusResponse>(`/api/Task/${taskId}`);

      setTaskStatus(status);

      // 如果任务完成且有输出文件，停止轮询并显示结果
      if (status.status === 'Completed' && status.outputFileUrl) {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        setIsPolling(false);
        setOutputImageUrl(status.outputFileUrl);

        toast({
          title: '处理完成',
          description: '写真已生成成功',
        });
      } else if (status.status === 'Failed') {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }
        setIsPolling(false);

        toast({
          title: '处理失败',
          description: status.errorMessage || '任务处理失败，请重试',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Failed to check task status:', error);
      // 轮询失败时不显示错误，继续尝试
    }
  };

  const handleDownload = () => {
    if (!outputImageUrl) return;

    const link = document.createElement('a');
    link.href = outputImageUrl;
    link.download = `photo-${Date.now()}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setTaskId(null);
    setTaskStatus(null);
    setOutputImageUrl('');
    setIsPolling(false);
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI 写真生成</h1>
          <p className="text-neutral-400">
            选择模板，上传照片，一键生成专业写真
          </p>
        </div>

        <div className="grid gap-6">
          {/* 模板选择 */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle>选择模板</CardTitle>
              <CardDescription className="text-neutral-400">
                选择一个写真模板风格
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingTemplates ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                  <span className="ml-2 text-neutral-400">加载模板中...</span>
                </div>
              ) : templates.length === 0 ? (
                <div className="text-center py-8 text-neutral-400">
                  暂无可用模板
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.templateCode}
                      onClick={() => setSelectedTemplate(template)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedTemplate?.templateCode === template.templateCode
                          ? 'border-neon-green shadow-lg shadow-neon-green/20'
                          : 'border-neutral-700 hover:border-neutral-600'
                      }`}
                    >
                      <div className="aspect-[3/4] relative">
                        <img
                          src={template.previewUrl}
                          alt={template.templateName}
                          className="w-full h-full object-cover"
                        />
                        {selectedTemplate?.templateCode === template.templateCode && (
                          <div className="absolute inset-0 bg-neon-green/10 flex items-center justify-center">
                            <div className="bg-neon-green text-black px-3 py-1 rounded-full text-sm font-semibold">
                              已选择
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-neutral-800">
                        <h3 className="font-semibold text-sm mb-1">{template.templateName}</h3>
                        <p className="text-xs text-neutral-400 line-clamp-2">
                          {template.description}
                        </p>
                        <div className="mt-2">
                          <span className="text-xs px-2 py-1 bg-neutral-700 rounded text-neutral-300">
                            {template.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 文件上传 */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle>上传照片</CardTitle>
              <CardDescription className="text-neutral-400">
                支持 JPG、PNG 等格式，文件大小不超过 10MB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-neutral-700 rounded-lg cursor-pointer hover:border-neutral-600 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-48 max-w-full rounded-lg"
                        />
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mb-3 text-neutral-400" />
                          <p className="mb-2 text-sm text-neutral-400">
                            <span className="font-semibold">点击上传</span> 或拖拽文件到此处
                          </p>
                          <p className="text-xs text-neutral-500">PNG, JPG, JPEG (最大 10MB)</p>
                        </>
                      )}
                    </div>
                    <input
                      id="file-upload"
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                      disabled={isSubmitting || isPolling}
                    />
                  </label>
                </div>

                {selectedFile && (
                  <div className="text-sm text-neutral-400">
                    已选择: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 任务状态 */}
          {(taskId || isPolling) && (
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle>处理状态</CardTitle>
                <CardDescription className="text-neutral-400">
                  {taskStatus?.status === 'Completed'
                    ? '处理完成'
                    : taskStatus?.status === 'Failed'
                    ? '处理失败'
                    : '正在处理中，请稍候...'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {taskStatus && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">进度</span>
                        <span className="text-neutral-300">{taskStatus.progress}%</span>
                      </div>
                      <Progress value={taskStatus.progress} className="h-2" />
                    </div>

                    <div className="text-sm space-y-1 text-neutral-400">
                      <div>任务ID: {taskStatus.taskId}</div>
                      <div>状态: {taskStatus.status}</div>
                      {taskStatus.errorMessage && (
                        <div className="text-red-400">错误: {taskStatus.errorMessage}</div>
                      )}
                    </div>

                    {isPolling && (
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>正在查询任务状态...</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* 生成结果 */}
          {outputImageUrl && (
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle>生成结果</CardTitle>
                <CardDescription className="text-neutral-400">
                  写真已生成成功，可以预览或下载
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-4">
                    <img
                      src={outputImageUrl}
                      alt="Generated Photo"
                      className="max-w-full max-h-96 rounded-lg"
                    />
                  </div>
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-neon-green hover:bg-neon-green/90 text-black"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    下载写真
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-4">
            <Button
              onClick={handleSubmit}
              disabled={!selectedFile || !selectedTemplate || isSubmitting || isPolling}
              className="flex-1 bg-neon-green hover:bg-neon-green/90 text-black"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  创建任务中...
                </>
              ) : isPolling ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  生成写真
                </>
              )}
            </Button>
            {(selectedFile || taskId) && (
              <Button
                onClick={handleReset}
                disabled={isSubmitting || isPolling}
                variant="outline"
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800"
                size="lg"
              >
                重置
              </Button>
            )}
          </div>

          {/* 使用说明 */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle>使用说明</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-400">
                <li>选择一个喜欢的写真模板风格</li>
                <li>上传一张清晰的正面照片（建议使用证件照或半身照）</li>
                <li>点击"生成写真"按钮开始处理</li>
                <li>等待处理完成（通常需要几秒到几十秒）</li>
                <li>处理完成后可以预览和下载生成的写真</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PhotoGeneration;

