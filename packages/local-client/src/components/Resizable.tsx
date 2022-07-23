import React, { FC, ReactNode } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useResizeContext } from "../context/ResizeContext/ResizeContext";

interface Props {
  direction: "horizontal" | "vertical";
  children: ReactNode;
}

export const Resizable: FC<Props> = ({ direction, children }) => {
  const { width, height } = useResizeContext();

  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      width: width * 0.65,
      height: Infinity,
      className: "flex",
      minConstraints: [width * 0.2, Infinity],
      maxConstraints: [width * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  } else {
    resizableProps = {
      width: Infinity,
      className: "p-1",
      height: 300,
      minConstraints: [Infinity, 50],
      maxConstraints: [Infinity, height * 0.9],
      resizeHandles: ["s"],
    };
  }
  return (
    <ResizableBox {...resizableProps}>
      <div className="flex-1 w-full h-full">{children}</div>
    </ResizableBox>
  );
};
