// API客户端 - 自动添加token到请求头

import { getToken } from './authService';

const API_BASE_URL = 'https://xr-webapi.xrpic.com';

export interface ApiRequestOptions extends RequestInit {
  requireAuth?: boolean; // 是否需要认证，默认为true
}

/**
 * 统一的API请求方法
 * 自动添加token到请求头（如果需要认证）
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { requireAuth = true, headers = {}, ...restOptions } = options;

  // 获取 token
  const token = getToken();

  // 构建请求头 - 使用 Headers 对象确保格式正确
  const requestHeaders: HeadersInit = new Headers();
  
  // 设置默认头
  requestHeaders.set('accept', 'application/json');
  requestHeaders.set('Content-Type', 'application/json');
  
  // 如果需要认证，添加 Authorization 头
  if (requireAuth) {
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    } else {
      console.warn('No authentication token found. Request may fail if authentication is required.', {
        endpoint,
        requireAuth,
        localStorageToken: localStorage.getItem('xr_access_token'),
      });
    }
  }
  
  // 合并用户自定义的 headers（允许覆盖默认值）
  if (headers) {
    Object.entries(headers as Record<string, string>).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        requestHeaders.set(key, value);
      } else {
        // 如果值为 null 或 undefined，删除该头
        requestHeaders.delete(key);
      }
    });
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  // 调试：打印请求信息
  console.log('API Request Details:', {
    url,
    method: restOptions.method || 'GET',
    hasToken: !!token,
    tokenPreview: token ? token.substring(0, 30) + '...' : null,
    headers: Object.fromEntries(requestHeaders.entries()),
  });

  // 确保 restOptions 中不包含 headers，避免覆盖
  const { headers: _, ...cleanRestOptions } = restOptions as any;

  const response = await fetch(url, {
    ...cleanRestOptions,
    headers: requestHeaders,
  });

  // 如果响应不是JSON，直接返回
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response as unknown as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
}

/**
 * GET请求
 */
export async function apiGet<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * POST请求
 */
export async function apiPost<T = any>(
  endpoint: string,
  body?: any,
  options: ApiRequestOptions = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PUT请求
 */
export async function apiPut<T = any>(
  endpoint: string,
  body?: any,
  options: ApiRequestOptions = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * DELETE请求
 */
export async function apiDelete<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

/**
 * 文件上传请求（multipart/form-data）
 */
export async function apiUpload<T = any>(
  endpoint: string,
  formData: FormData,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { headers = {}, ...restOptions } = options;

  // 获取 token
  const token = getToken();
  
  // 构建请求头 - 按照成功请求的格式
  // 注意：对于 FormData，不要设置 Content-Type，让浏览器自动设置（包括 boundary）
  const requestHeaders: HeadersInit = new Headers();
  
  // 设置 accept 头
  requestHeaders.set('accept', '*/*');
  
  // 如果需要认证，添加 Authorization 头（注意：fetch API 会自动转换为小写）
  if (options.requireAuth !== false) {
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    } else {
      console.warn('No authentication token found. Request may fail if authentication is required.');
    }
  }
  
  // 合并用户自定义的 headers（但排除 Content-Type，让浏览器自动设置）
  if (headers) {
    Object.entries(headers as Record<string, string>).forEach(([key, value]) => {
      // 跳过 Content-Type，让浏览器为 FormData 自动设置
      if (key.toLowerCase() !== 'content-type' && value) {
        requestHeaders.set(key, value);
      }
    });
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  // 调试：打印请求信息（在实际发送前）
  const headersObj = Object.fromEntries(requestHeaders.entries());
  console.log('=== Upload Request (Before Send) ===', {
    url,
    method: 'POST',
    hasToken: !!token,
    tokenPreview: token ? token.substring(0, 50) + '...' : null,
    authorizationHeader: headersObj['Authorization'] || headersObj['authorization'] || 'NOT FOUND',
    allHeaders: headersObj,
    headersKeys: Object.keys(headersObj),
  });

  // 确保 restOptions 中不包含 headers，避免覆盖
  const { headers: _, ...cleanRestOptions } = restOptions as any;

  try {
    const response = await fetch(url, {
      ...cleanRestOptions,
      method: 'POST',
      headers: requestHeaders,
      body: formData,
    });

    // 调试：打印响应信息
    console.log('=== Upload Response ===', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
    });

    // 检查响应状态
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      console.error('=== Upload Error ===', {
        status: response.status,
        errorMessage,
        errorText,
      });
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('=== Upload Success ===', {
      data,
    });
    return data;
  } catch (error) {
    console.error('=== Upload Exception ===', {
      error,
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

