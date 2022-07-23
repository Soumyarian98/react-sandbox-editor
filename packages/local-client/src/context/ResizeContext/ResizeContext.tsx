import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const Context = createContext({ width: 0, height: 0 });

export const ResizeContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const resizeHandler = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWindowDimension({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 500);
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <Context.Provider value={windowDimension}>{children}</Context.Provider>
  );
};

export const useResizeContext = () => {
  const dimensions = useContext(Context);
  return dimensions;
};
