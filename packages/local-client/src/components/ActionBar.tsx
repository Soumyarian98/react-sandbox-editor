import { FC } from "react";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteCell, moveCell } from "../state";

interface Props {
  id: string;
  type: "code" | "text";
}

export const ActionBar: FC<Props> = ({ id, type }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-gray-900 flex p-2">
      <div className="flex-1">
        <h3 className="text-white text-lg capitalize">{type}</h3>
      </div>
      <div className="flex flex-row space-x-2">
        <button
          className="icon-button"
          onClick={() => dispatch(moveCell({ id, direction: "up" }))}>
          <FiArrowUp />
        </button>
        <button
          className="icon-button"
          onClick={() => dispatch(moveCell({ id, direction: "down" }))}>
          <FiArrowDown />
        </button>
        <button
          className="icon-button"
          onClick={() => dispatch(deleteCell({ id }))}>
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};
