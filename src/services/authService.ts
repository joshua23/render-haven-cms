// 认证服务 - 处理登录和token管理

const API_BASE_URL = 'https://xr-webapi.xrpic.com';

export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  credits: number;
  role: string;
  adminRole: string;
  subscriptionTier: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
    user: User;
  };
  message?: string;
}

const TOKEN_KEY = 'xr_access_token';
const USER_KEY = 'xr_user';
const TOKEN_EXPIRY_KEY = 'xr_token_expiry';

/**
 * 登录
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
    method: 'POST',
    headers: {
      'accept': '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data: LoginResponse = await response.json();

  if (data.success && data.data) {
    // 保存token和用户信息
    localStorage.setItem(TOKEN_KEY, data.data.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));
    
    // 计算token过期时间并保存
    const expiryTime = Date.now() + data.data.expiresIn * 1000;
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  }

  return data;
}

/**
 * 登出
 */
export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

/**
 * 获取当前token
 */
export function getToken(): string | null {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  
  // 检查token是否过期
  if (token && expiry) {
    const expiryTime = parseInt(expiry, 10);
    if (Date.now() >= expiryTime) {
      // Token已过期，清除
      logout();
      return null;
    }
  }
  
  return token;
}

/**
 * 获取当前用户信息
 */
export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

/**
 * 检查是否已登录
 */
export function isAuthenticated(): boolean {
  return getToken() !== null;
}

