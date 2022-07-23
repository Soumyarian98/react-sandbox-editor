import { BundlingEndPayload, BundlingStartPayload } from "./../types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { bundler } from "../../bundler";

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

export const bundleCode = createAsyncThunk<
  BundlingEndPayload,
  { cellid: string; input: string }
>("bundle/bundleCode", async ({ cellid, input }) => {
  const result = await bundler(input);
  return {
    cellId: cellid,
    bundle: {
      code: result.code,
      err: result.err,
    },
  };
});

const initialState: BundleState = {};

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(bundleCode.pending, (state, action) => {
      state[action.meta.arg.cellid] = {
        loading: true,
        code: "",
        err: "",
      };
    });
    builder.addCase(bundleCode.fulfilled, (state, action) => {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
    });
  },
});

export const bundleReducer = bundleSlice.reducer;
