# 图片生成页面 - API 使用说明

## 页面地址
```
http://localhost:8080/image-generator
```

## API 调用流程

### 1. 上传图片到 OSS
**端点**: `POST /api/oss/upload`

**请求**:
```bash
curl -X 'POST' \
  'http://8.130.180.72:18080/api/oss/upload' \
  -H 'accept: */*' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@image.jpg'
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "url": "https://example.com/images/uploaded-image.jpg",
    "fileName": "image.jpg",
    "filePath": "/uploads/image.jpg"
  }
}
```

### 2. 生成并美化图片
**端点**: `POST /api/CompositeImage/generate-and-beautify`

**请求**:
```bash
curl -X 'POST' \
  'http://8.130.180.72:18080/api/CompositeImage/generate-and-beautify' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
    "imageUrls": [
      "https://example.com/images/image1.jpg",
      "https://example.com/images/image2.jpg",
      "https://example.com/images/image3.jpg"
    ]
  }'
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://example.com/images/generated-result.jpg",
    "taskId": "task-12345"
  }
}
```

## 功能特性

### 多图片上传
- ✅ 支持同时选择多张图片
- ✅ 每张图片最大 10MB
- ✅ 支持 JPG、PNG 等常见格式
- ✅ 显示上传进度
- ✅ 图片预览网格显示

### 自动化流程
1. 用户选择多张图片
2. 点击"生成图片"按钮
3. 系统依次上传所有图片到 OSS
4. 收集所有上传后的 URL
5. 调用合成接口，传入 URL 数组
6. 显示生成的合成图片

### UI 特性
- 响应式设计
- 实时进度反馈
- Toast 通知
- 错误处理
- 加载动画

## 开发环境

### 前端
- 地址: http://localhost:8080
- 框架: React + TypeScript + Vite
- UI: shadcn/ui + Tailwind CSS

### 后端 API
- 地址: http://8.130.180.72:18080
- Swagger 文档: http://8.130.180.72:18080/swagger/index.html

## 注意事项

1. **确保后端服务运行**: 访问 http://8.130.180.72:18080 确认 API 服务正常
2. **CORS 配置**: 如果遇到跨域问题，需要在后端配置允许 localhost:8080
3. **文件大小限制**: 单个文件不超过 10MB
4. **多图片数量**: 建议 2-5 张图片以获得最佳合成效果
5. **网络超时**: 大文件上传或复杂合成可能需要较长时间

## 故障排除

### 页面空白
- 按 Ctrl + Shift + R 强制刷新
- 检查浏览器控制台（F12）是否有错误
- 确认开发服务器正在运行

### 上传失败
- 检查文件大小和格式
- 确认后端 API 服务运行正常
- 查看网络请求详情

### 生成失败
- 检查上传的图片 URL 是否有效
- 确认 API 参数格式正确
- 查看后端日志

