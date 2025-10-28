import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/apiClient";
import {
  saveToken,
  saveRefreshToken,
  getToken,
  getRefreshToken,
  saveUser,
  getUser,
  clearTokens,
  clearUser,
} from "@/lib/storage";

interface UserPayload {
  token: string;
  userId: number;
  roleId: number;
  role: string;
  subRoleId: number;
  subRole: string;
  userTypeId: number;
  userType: string;
  rangeId: number;
  range: string;
  areaIds: number[];
  territoryId: number;
  territoryName: string;
  distributorId: number;
  distributorName: string;
  userAgencyId: number;
  agencyName: string;
  userName: string;
  personalName: string;
  gpsStatus: boolean;
  serverTime: string;
}

export interface AuthState {
  user: UserPayload | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

/** ===========================================================
 * Initial state loaded from localStorage for persistence
 * =========================================================== */
const initialState: AuthState = {
  user: getUser(),
  token: getToken(),
  refreshToken: getRefreshToken(),
  loading: false,
  error: null,
};

/** ===========================================================
 * Async Thunks
 * =========================================================== */
/** Login */
export const signIn = createAsyncThunk<
  { user: UserPayload; token: string; refreshToken?: string },
  { userName: string; password: string },
  { rejectValue: string }
>("auth/signIn", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/v1/auth/login", payload);

    if (response.data.code !== 200 || !response.data.payload?.token)
      throw new Error("Invalid credentials");

    const userData: UserPayload = response.data.payload;
    const token = userData.token;

    // Save token and user
    saveToken(token);
    saveUser(userData);

    // Simulate refreshToken until backend supports it
    const refreshToken = token; // for now use same token
    saveRefreshToken(refreshToken);

    return { user: userData, token, refreshToken };
  } catch (error: any) {
    return rejectWithValue(error.message || "Login failed");
  }
});

/** Refresh access token */
export const refreshAccessToken = createAsyncThunk<
  { token: string },
  void,
  { rejectValue: string }
>("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token found");

    // Call backend refresh endpoint
    const response = await api.post("/api/v1/auth/refresh", { refreshToken });

    if (!response.data.payload?.token)
      throw new Error("Failed to refresh token");

    const token = response.data.payload.token;
    saveToken(token);
    return { token };
  } catch (error: any) {
    clearTokens();
    clearUser();
    return rejectWithValue(error.message || "Token refresh failed");
  }
});

/** Logout */
export const signOut = createAsyncThunk("auth/signOut", async () => {
  clearTokens();
  clearUser();
});

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
        state.refreshToken = action.payload.refreshToken || null;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.user = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
