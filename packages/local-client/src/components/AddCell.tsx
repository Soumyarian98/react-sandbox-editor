import { FC } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { insertCellAfter } from "../state";

interface Props {
  prevCellId: string | null;
}

const AddCell: FC<Props> = ({ prevCellId: id }) => {
  const dispatch = useDispatch();
  const cellLength = useTypedSelector(state => state.cell.order.length);

  let opacity: string = "opacity-5 hover:opacity-100";
  if (cellLength === 0) {
    opacity = "opacity-100";
  }
  return (
    <div
      className={`flex items-center relative justify-center animated ${opacity} active-opacity`}>
      <button
        className="button-purple mr-16 animated"
        onClick={() => dispatch(insertCellAfter({ id, type: "code" }))}>
        <FiPlus className="text-lg" /> <span>Code</span>
      </button>
      <button
        className="button-pink animated"
        onClick={() => dispatch(insertCellAfter({ id, type: "text" }))}>
        <FiPlus className="text-lg" /> <span>Text</span>
      </button>
      <div className="absolute top-1/2 bottom-1/2 border-b border-gray-500 w-full -z-10" />
    </div>
  );
};

export default AddCell;
