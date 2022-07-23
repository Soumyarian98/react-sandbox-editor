export type CellTypes = "code" | "text";

export interface Cell {
  id: string;
  type: "code" | "text";
  content: string;
}

export interface UpdateCellPayload {
  id: string;
  content: string;
}
export interface DeleteCellPayload {
  id: string;
}
export interface MoveCellPayload {
  id: string;
  direction: "up" | "down";
}
export interface InsertCellPayload {
  id: string | null;
  type: CellTypes;
}

export interface BundlingStartPayload {
  cellId: string;
}

export interface BundlingEndPayload {
  cellId: string;
  bundle: {
    code: string;
    err: string;
  };
}
