import { FC } from "react";
import { Cell } from "../state/types";
import { ActionBar } from "./ActionBar";
import { CodeCell } from "./CodeCell";
import MdEditor from "./MdEditor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = <CodeCell cell={cell} />;
  } else {
    child = <MdEditor cell={cell} />;
  }
  return (
    <div className="flex flex-col card pb-2">
      <ActionBar id={cell.id} type={cell.type} />
      {child}
    </div>
  );
};

export default CellListItem;
