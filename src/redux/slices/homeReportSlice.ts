import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/apiClient";

interface HomeReportState {
  data: any | null; // Adjust type as necessary
  loading: boolean;
  error: string | null;
}

const initialState: HomeReportState = {
  data: null,
  loading: false,
  error: null,
};
