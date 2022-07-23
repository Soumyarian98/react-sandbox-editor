import { FC, useEffect, useRef } from "react";

interface Props {
  code: string;
  err: string;
}

const html = `
    <head></head>
    <body>
      <div id="root"></div>
      <script>
      const handleError = (err) => {
        const root = document.querySelector("#root");
        root.innerHTML = '<div className="text-red-100">' + err + '</div>'
        console.log(err)
      }
      window.addEventListener("error", (event) => {
        event.prventDefault()
        handleError(event.error)
      })
      window.addEventListener("message", (event) => {
        try {
          eval(event.data);
        }catch(err) {
          handleError(err)
        }
      }, false)
      </script>
    </body>
  `;

const Preview: FC<Props> = ({ code, err }) => {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 100);
  }, [code]);

  return (
    <div className="relative preview-wrapper w-full h-full bg-white text-black">
      <iframe
        className="w-full h-full absolute z-10 top-0 left-0 right-0 bottom-0"
        title="preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err && <div className="absolute top-2 left-2 text-red-500">{err}</div>}
    </div>
  );
};

export default Preview;
