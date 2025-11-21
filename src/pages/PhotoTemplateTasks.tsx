import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiGet, apiPost } from '@/services/apiClient';

interface PhotoTaskItem {
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
  is_show: boolean;
}

interface PhotoTasksResponse {
  tasks: PhotoTaskItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const PhotoTemplateTasks = () => {
  const { templateCode } = useParams<{ templateCode: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PhotoTaskItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchTasks = async (p = page, ps = pageSize) => {
    if (!templateCode) {
      toast({ title: '参数错误', description: '缺少模板编码', variant: 'destructive' });
      return;
    }
    try {
      setLoading(true);
      const resp = await apiGet<PhotoTasksResponse>(
        `/api/Task/photo/tasks?templateCode=${encodeURIComponent(templateCode)}&pageindex=${p}&pagesize=${ps}`,
        { requireAuth: true }
      );
      setItems(resp.tasks || []);
      setTotal(resp.total || 0);
      setTotalPages(resp.totalPages || 1);
      setPage(resp.page || p);
      setPageSize(resp.pageSize || ps);
    } catch (error) {
      toast({ title: '获取任务失败', description: error instanceof Error ? error.message : '请稍后重试', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(1, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateCode]);

  const toggleShow = async (task: PhotoTaskItem) => {
    try {
      setUpdatingId(task.taskId);
      const next = !task.is_show;
      const resp = await apiPost<{ message: string; taskId: string; is_show: boolean }>(
        `/api/Task/${task.taskId}/show?isShow=${next}`,
        undefined,
        { requireAuth: true }
      );
      const updated = resp.is_show ?? next;
      setItems((prev) => prev.map((i) => (i.taskId === task.taskId ? { ...i, is_show: updated } : i)));
      toast({ title: updated ? '已显示在首页' : '已取消首页显示', description: `任务 ${task.taskId}` });
    } catch (error) {
      toast({ title: '更新失败', description: error instanceof Error ? error.message : '请稍后重试', variant: 'destructive' });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">模板任务</h1>
            <p className="text-neutral-400 mt-1">模板编码：{templateCode}</p>
          </div>
          <Button variant="secondary" onClick={() => navigate(-1)}>返回</Button>
        </div>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle>生成结果</CardTitle>
            <CardDescription className="text-neutral-400">展示该模板生成的任务图片</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
                <span className="ml-2 text-neutral-400">加载中...</span>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8 text-neutral-400">暂无任务</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((task) => (
                  <div key={task.taskId} className="rounded-lg overflow-hidden border border-neutral-800">
                    <div className="aspect-[3/4] bg-neutral-800">
                      {task.outputFileUrl ? (
                        <img src={task.outputFileUrl} alt={task.taskId} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-400">无输出图片</div>
                      )}
                    </div>
                    <div className="p-3 bg-neutral-800 space-y-2">
                      <div className="text-xs text-neutral-400">任务ID：{task.taskId}</div>
                      <div className="text-xs text-neutral-400">状态：{task.status}</div>
                      <div className="flex gap-2 pt-1">
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={updatingId === task.taskId}
                          onClick={() => toggleShow(task)}
                          className="flex-1 bg-neutral-700 text-neutral-100 hover:bg-neutral-600 disabled:opacity-50"
                        >
                          {updatingId === task.taskId ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : task.is_show ? (
                            '取消首页显示'
                          ) : (
                            '在首页显示'
                          )}
                        </Button>
                        {task.outputFileUrl && (
                          <a
                            href={task.outputFileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 text-center text-xs px-2 py-1 border border-neutral-600 rounded hover:bg-neutral-700"
                          >
                            查看原图
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-neutral-400">共 {total} 条，页码 {page}/{totalPages}</div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page <= 1 || loading}
                  onClick={() => fetchTasks(page - 1, pageSize)}
                >上一页</Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page >= totalPages || loading}
                  onClick={() => fetchTasks(page + 1, pageSize)}
                >下一页</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PhotoTemplateTasks;