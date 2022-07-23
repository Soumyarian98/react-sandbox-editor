import { FC, useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import { Resizable } from "./Resizable";
import { ResizeContextProvider } from "../context/ResizeContext/ResizeContext";
import { bundleCode, Cell, updateCell } from "../state";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import LoadingIndicator from "./LoadingIndicator";

let timer: ReturnType<typeof setTimeout>;
export const CodeCell: FC<{ cell: Cell }> = ({ cell }) => {
  const dispatch = useTypedDispatch();
  const bundle = useTypedSelector(state => state.bundle[cell.id]);
  const cumulativeCode = useTypedSelector(state => {
    const { order, data } = state.cell;
    const orderedCells = order.map(o => data[o]);

    const showFunc = `
        import _React from "react";
        import _ReactDOM from "react-dom";
        var show = (value) => {
          const root = document.getElementById("root");
          if(typeof value === "object") {
            if(value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            }else {
              root.innerHTML = JSON.stringify(value);
            }
          }else {
            root.innerHTML = value;
          }
        }
      `;
    const showFuncNoOperation = `var show = () => {}`;

    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cell.id) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoOperation);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id == cell.id) break;
    }
    return cumulativeCode;
  });

  useEffect(() => {
    if (!bundle) {
      dispatch(
        bundleCode({ cellid: cell.id, input: cumulativeCode.join("\n") })
      );
      return;
    }
    timer = setTimeout(async () => {
      dispatch(
        bundleCode({ cellid: cell.id, input: cumulativeCode.join("\n") })
      );
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    //233 video number es lint disable
  }, [cumulativeCode.join("\n"), cell.id]);

  return (
    <ResizeContextProvider>
      <Resizable direction="vertical">
        <div className="flex w-full h-full">
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue="const a = 1"
              value={cell.content}
              onChange={value =>
                dispatch(updateCell({ id: cell.id, content: value }))
              }
            />
          </Resizable>
          <div className="flex-1">
            {!bundle || bundle.loading ? (
              <div className="h-full bg-white flex items-center justify-center transition-opacity duration-500">
                <LoadingIndicator />
              </div>
            ) : (
              <Preview code={bundle.code} err={bundle.err} />
            )}
          </div>
        </div>
      </Resizable>
    </ResizeContextProvider>
  );
};
