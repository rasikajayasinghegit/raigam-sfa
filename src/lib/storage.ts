import type { UserPayload } from "@/types/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const REFRESH_EXPIRY_KEY = "refreshTokenExpiry";
const USER_KEY = "authUser";

/** ============================
 * ACCESS TOKEN HELPERS
 * ============================ */
export const saveToken = (token: string): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

export const getToken = (): string | null =>
  typeof window !== "undefined"
    ? sessionStorage.getItem(ACCESS_TOKEN_KEY)
    : null;

/** Placeholder: always returns false unless you add real JWT expiry check */
export const isAccessTokenExpired = (): boolean => {
  // Optional improvement: decode JWT and check `exp` field
  return false;
};

/** ============================
 * REFRESH TOKEN HELPERS
 * ============================ */
export const saveRefreshToken = (
  token: string,
  expiresInMs = 24 * 60 * 60 * 1000
): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
    sessionStorage.setItem(
      REFRESH_EXPIRY_KEY,
      (Date.now() + expiresInMs).toString()
    );
  }
};

export const getRefreshToken = (): string | null =>
  typeof window !== "undefined"
    ? sessionStorage.getItem(REFRESH_TOKEN_KEY)
    : null;

export const isRefreshTokenExpired = (): boolean => {
  if (typeof window === "undefined") return true;
  const expiry = Number(sessionStorage.getItem(REFRESH_EXPIRY_KEY) || 0);
  return Date.now() > expiry;
};

/** ============================
 * CLEAR TOKENS
 * ============================ */
export const clearTokens = (): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_EXPIRY_KEY);
  }
};

/** ============================
 * USER HELPERS
 * ============================ */
export const saveUser = (user: UserPayload): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = (): UserPayload | null => {
  if (typeof window === "undefined") return null;
  const user = sessionStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user) as UserPayload;
  } catch {
    return null;
  }
};

export const clearUser = (): void => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(USER_KEY);
  }
};

/** ============================
 * AUTH HELPERS
 * ============================ */
export const getAuthHeader = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const isAuthenticated = (): boolean => !!getToken();
