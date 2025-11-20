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

  // 构建请求头
  const requestHeaders: HeadersInit = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };

  // 如果需要认证，添加token
  if (requireAuth) {
    const token = getToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  // 如果Content-Type在headers中被显式设置为null或undefined，则不设置默认值
  // 这通常用于文件上传等场景
  if (headers['Content-Type'] === null || headers['Content-Type'] === undefined) {
    delete requestHeaders['Content-Type'];
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...restOptions,
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

  // 构建请求头（不设置Content-Type，让浏览器自动设置）
  const requestHeaders: HeadersInit = {
    'accept': '*/*',
    ...headers,
  };

  // 如果需要认证，添加token
  if (options.requireAuth !== false) {
    const token = getToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...restOptions,
    method: 'POST',
    headers: requestHeaders,
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
}

