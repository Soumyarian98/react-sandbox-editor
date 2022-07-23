import React, { FC, useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Cell, updateCell } from "../state";
import { useDispatch } from "react-redux";

const MdEditor: FC<{ cell: Cell }> = ({ cell }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listner = (e: MouseEvent) => {
      if (
        e.target &&
        editorRef.current &&
        editorRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listner, { capture: true });
    return () => {
      document.removeEventListener("click", listner, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={editorRef}>
        <MDEditor
          className="text-editor"
          value={cell.content}
          onChange={v =>
            dispatch(updateCell({ id: cell.id, content: v || "" }))
          }
        />
      </div>
    );
  }

  return (
    <div className="shadow-inner mt-2" onClick={() => setEditing(true)}>
      <MDEditor.Markdown
        className="text-editor"
        source={cell.content || "**Hello world!!!**"}
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
};

export default MdEditor;
