import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { apiUpload, apiPost } from '@/services/apiClient';

interface UploadResponse {
  success: boolean;
  data?: {
    url: string;
    fileName?: string;
    filePath?: string;
  };
  message?: string;
}

interface GenerateResponse {
  success: boolean;
  data?: {
    imageUrl: string;
    taskId?: string;
  };
  message?: string;
}

const ImageGenerator = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  // 处理文件选择
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;

    // 验证所有文件
    const validFiles: File[] = [];
    const newPreviewUrls: string[] = [];

    for (const file of files) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        toast({
          title: '文件类型错误',
          description: `${file.name} 不是图片文件`,
          variant: 'destructive',
        });
        continue;
      }

      // 验证文件大小（限制为10MB）
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: '文件过大',
          description: `${file.name} 大小超过10MB`,
          variant: 'destructive',
        });
        continue;
      }

      validFiles.push(file);
      
      // 创建预览URL
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviewUrls.push(reader.result as string);
        if (newPreviewUrls.length === validFiles.length) {
          setPreviewUrls(newPreviewUrls);
        }
      };
      reader.readAsDataURL(file);
    }

    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      // 清空之前的结果
      setUploadedImageUrls([]);
      setGeneratedImageUrl('');
    }
  };

  // 上传图片到OSS
  const uploadImages = async (): Promise<string[] | null> => {
    if (selectedFiles.length === 0) {
      toast({
        title: '请选择图片',
        description: '请先选择要上传的图片文件',
        variant: 'destructive',
      });
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls: string[] = [];
      const totalFiles = selectedFiles.length;

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append('file', file);

        // 更新进度
        setUploadProgress(Math.round((i / totalFiles) * 90));

        const data: UploadResponse = await apiUpload<UploadResponse>(
          '/api/oss/upload',
          formData
        );

        if (data.success && data.data?.url) {
          uploadedUrls.push(data.data.url);
        } else {
          throw new Error(data.message || `上传 ${file.name} 失败`);
        }
      }

      setUploadProgress(100);
      setUploadedImageUrls(uploadedUrls);
      
      toast({
        title: '上传成功',
        description: `已成功上传 ${uploadedUrls.length} 张图片`,
      });
      
      return uploadedUrls;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: '上传失败',
        description: error instanceof Error ? error.message : '上传图片时发生错误',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // 生成并美化图片
  const generateAndBeautify = async (imageUrls: string[]) => {
    setIsGenerating(true);

    try {
      const data: GenerateResponse = await apiPost<GenerateResponse>(
        '/api/CompositeImage/generate-and-beautify',
        {
          imageUrls: imageUrls,
        }
      );

      if (data.success && data.data?.imageUrl) {
        setGeneratedImageUrl(data.data.imageUrl);
        toast({
          title: '生成成功',
          description: '图片已成功生成并美化',
        });
      } else {
        throw new Error(data.message || '生成失败');
      }
    } catch (error) {
      console.error('Generate error:', error);
      toast({
        title: '生成失败',
        description: error instanceof Error ? error.message : '生成图片时发生错误',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // 处理完整流程
  const handleGenerate = async () => {
    // 第一步：上传图片
    const imageUrls = await uploadImages();
    
    if (imageUrls && imageUrls.length > 0) {
      // 第二步：生成并美化图片
      await generateAndBeautify(imageUrls);
    }
  };

  // 重置所有状态
  const handleReset = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
    setUploadedImageUrls([]);
    setGeneratedImageUrl('');
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI图片合成与美化</h1>
          <p className="text-muted-foreground text-lg">
            上传多张图片，让AI为您合成并美化成一张精美作品
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：上传和控制区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                上传图片
              </CardTitle>
              <CardDescription>
                选择要处理的图片文件（支持JPG、PNG等格式，最大10MB）
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">选择图片（支持多选）</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  disabled={isUploading || isGenerating}
                />
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>已选择 {selectedFiles.length} 张图片</Label>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="truncate flex-1">{file.name}</span>
                        <span className="text-xs ml-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {previewUrls.length > 0 && (
                <div className="space-y-2">
                  <Label>图片预览</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <img
                          src={url}
                          alt={`预览 ${index + 1}`}
                          className="w-full h-32 object-cover bg-muted"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="space-y-2">
                  <Label>上传进度</Label>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    {uploadProgress}%
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleGenerate}
                  disabled={selectedFiles.length === 0 || isUploading || isGenerating}
                  className="flex-1"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      上传中...
                    </>
                  ) : isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      生成图片
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isUploading || isGenerating}
                >
                  重置
                </Button>
              </div>

              {uploadedImageUrls.length > 0 && (
                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                    ✓ 已上传 {uploadedImageUrls.length} 张图片
                  </p>
                  <div className="text-xs text-green-600 dark:text-green-400 space-y-1 max-h-20 overflow-y-auto">
                    {uploadedImageUrls.map((url, index) => (
                      <p key={index} className="break-all">
                        {index + 1}. {url}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 右侧：结果展示区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                生成结果
              </CardTitle>
              <CardDescription>
                AI生成并美化后的图片将显示在这里
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedImageUrl ? (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden bg-muted">
                    <img
                      src={generatedImageUrl}
                      alt="生成的图片"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(generatedImageUrl, '_blank')}
                    >
                      在新窗口打开
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = generatedImageUrl;
                        link.download = `generated-${Date.now()}.png`;
                        link.click();
                      }}
                    >
                      下载图片
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground break-all">
                      图片URL: {generatedImageUrl}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-center">
                    {isGenerating
                      ? 'AI正在处理您的图片...'
                      : '上传图片后，生成的结果将显示在这里'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 使用说明 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>点击"选择图片"按钮，从本地选择一张或多张要处理的图片文件（支持多选）</li>
              <li>预览选中的图片，确认无误后点击"生成图片"按钮</li>
              <li>系统会依次将所有图片上传到OSS存储服务</li>
              <li>上传成功后，自动调用AI接口合成并美化所有图片</li>
              <li>生成完成后，您可以在右侧查看结果、下载或分享合成后的图片</li>
            </ol>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ImageGenerator;

