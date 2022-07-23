import { configureStore } from "@reduxjs/toolkit";
import { bundleReducer } from "./reducers";
import { cellReducer, insertCellAfter } from "./reducers/cellsReducers";

export const store = configureStore({
  reducer: {
    cell: cellReducer,
    bundle: bundleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.dispatch(insertCellAfter({ id: null, type: "code" }));
store.dispatch(insertCellAfter({ id: null, type: "text" }));
