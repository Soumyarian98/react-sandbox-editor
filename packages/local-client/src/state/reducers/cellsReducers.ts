import { InsertCellPayload, MoveCellPayload } from "./../types";
import {
  Cell,
  CellTypes,
  DeleteCellPayload,
  UpdateCellPayload,
} from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    updateCell: (
      state: CellsState,
      action: PayloadAction<UpdateCellPayload>
    ) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },

    deleteCell: (
      state: CellsState,
      action: PayloadAction<DeleteCellPayload>
    ) => {
      const { id } = action.payload;
      delete state.data[id];
      state.order = state.order.filter(key => key !== id);
    },

    moveCell: (state: CellsState, action: PayloadAction<MoveCellPayload>) => {
      const { id, direction } = action.payload;
      const index = state.order.findIndex(key => key === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (!(targetIndex < 0 || targetIndex > state.order.length - 1)) {
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = id;
      }
    },

    insertCellAfter: (
      state: CellsState,
      action: PayloadAction<InsertCellPayload>
    ) => {
      const { id, type } = action.payload;
      const cell: Cell = {
        content: "",
        type,
        id: randomId(),
      };
      state.data[cell.id] = cell;
      const index = state.order.findIndex(key => key === id);
      if (index < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    },
  },
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export const { updateCell, deleteCell, moveCell, insertCellAfter } =
  cellSlice.actions;

export const cellReducer = cellSlice.reducer;
