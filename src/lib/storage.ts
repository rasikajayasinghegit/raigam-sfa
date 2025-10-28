// lib/storage.ts
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const REFRESH_TOKEN_EXPIRY_KEY = "refreshTokenExpiry";
const USER_KEY = "authUser";

/** Save access token */
export const saveToken = (token: string): void => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/** Get access token */
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

/** Save refresh token */
export const saveRefreshToken = (
  token: string,
  expiresInMs = 24 * 60 * 60 * 1000
): void => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  sessionStorage.setItem(
    REFRESH_TOKEN_EXPIRY_KEY,
    (Date.now() + expiresInMs).toString()
  );
};

/** Get refresh token */
export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

/** Check access token expired */
export const isAccessTokenExpired = (): boolean => {
  // For frontend-only, treat as always valid
  return false;
};

/** Check refresh token expired */
export const isRefreshTokenExpired = (): boolean => {
  const expiry = Number(sessionStorage.getItem(REFRESH_TOKEN_EXPIRY_KEY) || 0);
  return Date.now() > expiry;
};

/** Clear tokens */
export const clearTokens = (): void => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_EXPIRY_KEY);
};

/** Save user */
export const saveUser = (user: any): void => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

/** Get user */
export const getUser = (): any | null => {
  if (typeof window === "undefined") return null;
  const user = sessionStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

/** Clear user */
export const clearUser = (): void => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(USER_KEY);
};

/** Auth header for API requests */
export const getAuthHeader = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** Check if authenticated */
export const isAuthenticated = (): boolean => !!getToken();
