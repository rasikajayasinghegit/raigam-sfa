import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/apiClient";
import {
  getToken,
  getRefreshToken,
  getUser,
  saveToken,
  saveRefreshToken,
  saveUser,
  clearTokens,
  clearUser,
  isRefreshTokenExpired,
} from "@/lib/storage";
import type { UserPayload } from "@/types/auth";

interface AuthState {
  user: UserPayload | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: getUser(),
  token: getToken(),
  refreshToken: getRefreshToken(),
  loading: false,
  error: null,
};

/* ============================================================
 * LOGIN
 * ============================================================ */
export const signIn = createAsyncThunk<
  { user: UserPayload; token: string; refreshToken: string },
  { userName: string; password: string },
  { rejectValue: string }
>("auth/signIn", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/v1/auth/login", credentials);

    if (!response.data?.payload?.token) throw new Error("Invalid login");

    const user = response.data.payload as UserPayload;
    const token = user.token;
    const refreshToken = token; // or from backend if provided

    saveToken(token);
    saveRefreshToken(refreshToken);
    saveUser(user);

    return { user, token, refreshToken };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Login failed");
  }
});

/* ============================================================
 * REFRESH ACCESS TOKEN
 * ============================================================ */
export const refreshAccessToken = createAsyncThunk<
  { token: string },
  void,
  { rejectValue: string }
>("auth/refreshAccessToken", async (_, { rejectWithValue }) => {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken || isRefreshTokenExpired()) {
      throw new Error("Session expired. Please login again.");
    }

    const response = await api.post("/api/v1/auth/refresh", { refreshToken });
    const token = response.data.payload?.token;

    if (!token) throw new Error("Failed to refresh token");

    saveToken(token);
    return { token };
  } catch (err: unknown) {
    clearTokens();
    clearUser();
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Token refresh failed");
  }
});

/* ============================================================
 * LOGOUT
 * ============================================================ */
export const signOut = createAsyncThunk("auth/signOut", async () => {
  clearTokens();
  clearUser();
});

/* ============================================================
 * SLICE
 * ============================================================ */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
