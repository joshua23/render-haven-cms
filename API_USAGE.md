# API 使用说明

本文档包含图片生成和文字转语音功能的 API 使用说明。

---

# 图片生成页面

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
  'http://localhost:5282/api/oss/upload' \
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
  'http://localhost:5282/api/CompositeImage/generate-and-beautify' \
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
- 地址: http://localhost:5282
- Swagger 文档: http://localhost:5282/swagger/index.html

## 注意事项

1. **确保后端服务运行**: 访问 http://localhost:5282 确认 API 服务正常
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

---

# 文字转语音页面

## 页面地址
```
http://localhost:8080/text-to-speech
```

## API 调用流程

### 1. 获取语音模型列表
**端点**: `GET /api/TextToSpeech/models`

**请求**:
```bash
curl -X 'GET' \
  'http://localhost:5282/api/TextToSpeech/models' \
  -H 'accept: application/json'
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "model-1",
      "name": "标准模型",
      "description": "适合通用场景的高质量语音模型"
    },
    {
      "id": "model-2",
      "name": "情感模型",
      "description": "支持情感表达的语音模型"
    }
  ]
}
```

### 2. 获取音色列表
**端点**: `GET /api/TextToSpeech/voices`

**请求**:
```bash
curl -X 'GET' \
  'http://localhost:5282/api/TextToSpeech/voices' \
  -H 'accept: application/json'
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "voice-1",
      "name": "晓晓",
      "language": "zh-CN",
      "gender": "女"
    },
    {
      "id": "voice-2",
      "name": "云扬",
      "language": "zh-CN",
      "gender": "男"
    }
  ]
}
```

### 3. 文字转语音
**端点**: `POST /api/TextToSpeech/convert`

**请求**:
```bash
curl -X 'POST' \
  'http://localhost:5282/api/TextToSpeech/convert' \
  -H 'accept: audio/mpeg' \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "你好，这是一段测试文字",
    "modelId": "model-1",
    "voiceId": "voice-1",
    "speed": 1,
    "volume": 1,
    "format": "mp3"
  }' \
  --output audio.mp3
```

**响应**: 
- 直接返回 `audio/mpeg` 格式的音频文件（mp3）

**请求参数说明**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| text | string | 是 | 要转换的文字内容 |
| modelId | string | 是 | 语音模型ID |
| voiceId | string | 是 | 音色ID |
| speed | number | 否 | 语速，默认为1 |
| volume | number | 否 | 音量，默认为1 |
| format | string | 否 | 输出格式，默认为mp3 |

## 功能特性

### 文字转语音
- ✅ 支持多种语音模型选择
- ✅ 支持多种音色选择（不同性别、语言）
- ✅ 实时预览生成的语音
- ✅ 在线播放功能
- ✅ 下载音频文件
- ✅ 响应式设计

### 自动化流程
1. 用户输入要转换的文字内容
2. 选择语音模型
3. 选择音色（根据性别、语言等筛选）
4. 点击"转换为语音"按钮
5. 系统调用 API 生成音频文件
6. 用户可以在线播放或下载

### UI 特性
- 响应式设计
- 实时状态反馈
- Toast 通知
- 错误处理
- 加载动画
- 音频播放控制

## 技术实现

### 音频文件处理
前端使用 Blob API 处理后端返回的音频文件：

```javascript
// 接收音频文件
const audioBlob = await response.blob();

// 创建本地 URL
const localAudioUrl = URL.createObjectURL(audioBlob);

// 使用 URL 播放或下载
const audio = new Audio(localAudioUrl);
audio.play();

// 清理 URL（防止内存泄漏）
URL.revokeObjectURL(localAudioUrl);
```

## 注意事项

1. **接口返回格式**: `/api/TextToSpeech/convert` 接口直接返回 mp3 音频文件，不是 JSON 响应
2. **内存管理**: 前端使用 `URL.createObjectURL` 创建的 blob URL 需要及时释放，避免内存泄漏
3. **文字长度**: 单次转换的文字长度限制为 100 字
4. **网络超时**: 较长文本的转换可能需要更多时间
5. **浏览器兼容性**: 确保浏览器支持 Audio API 和 Blob API

## 故障排除

### 无法加载模型或音色
- 检查后端 API 服务是否正常运行
- 查看浏览器控制台是否有 CORS 错误
- 确认 API 地址配置正确

### 转换失败
- 检查输入的文字内容是否有效
- 确认已选择模型和音色
- 查看网络请求详情和错误信息
- 检查后端日志

### 无法播放音频
- 确认浏览器支持 mp3 格式
- 检查音频 URL 是否有效
- 查看浏览器控制台错误信息
- 尝试下载文件后本地播放

