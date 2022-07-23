import { Fragment } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";

const CellList = () => {
  const cells = useTypedSelector(state =>
    state.cell.order.map(id => state.cell.data[id])
  );
  const renderCell = cells.map(c => (
    <Fragment key={c.id}>
      <CellListItem cell={c} />
      <AddCell prevCellId={c.id} />
    </Fragment>
  ));
  return (
    <div className="space-y-2 p-2 mb-96">
      <AddCell prevCellId={null} />
      {renderCell}
    </div>
  );
};

export default CellList;
