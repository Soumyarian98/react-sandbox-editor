import { FC, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import monaco, { editor } from "monaco-editor";
import { Button } from "@mui/material";
import { format } from "prettier";
import parser from "prettier/parser-babel";

interface CodeEditorProps {
  initialValue: string;
  value: string;
  onChange(value: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange, value }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const monacoJSXHighlighterRef = useRef<any>(null);
  const onEditorDidMount = (
    monacoEditor: editor.IStandaloneCodeEditor,
    monacoType: typeof monaco
  ) => {
    editorRef.current = monacoEditor;
  };

  const handleChange = (value: string | undefined) => {
    if (value) {
      onChange(value);
    }
  };

  const onFormatClick = () => {
    if (editorRef.current) {
      const unformattedValue = editorRef.current.getModel()?.getValue();
      if (unformattedValue) {
        const formatted = format(unformattedValue, {
          parser: "babel",
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        }).replace(/\n$/, "");
        editorRef.current.setValue(formatted);
      }
    }
  };

  return (
    <div className="h-full relative">
      {/* <Button className="absolute right-0" onClick={onFormatClick}>Format</Button> */}
      <MonacoEditor
        onChange={handleChange}
        value={initialValue}
        onMount={onEditorDidMount}
        width="100%"
        height="100%"
        className="h-full"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;

// const activateMonacoJSXHighlighter = async (monacoEditor, monaco) => {
//   // monaco-jsx-highlighter depends on these in addition to Monaco and an instance of a Monaco Editor.
//   const { parse } = await import("@babel/parser");
//   // >>> The star of the show =P >>>
//   const { default: MonacoJSXHighlighter, JSXTypes } = await import(
//     "monaco-jsx-highlighter" // Note: there is a polyfilled version alongside the regular version.
//   ); // For example, starting with 2.0.2, 2.0.2-polyfilled is also available.
//   console.log("imported");
//   const { default: traverse } = await import("@babel/traverse");

//   // Instantiate the highlighter
//   const monacoJSXHighlighter = new MonacoJSXHighlighter(
//     monaco, // references Range and other APIs
//     parse, // obtains an AST, internally passes to parse options: {...options, sourceType: "module",plugins: ["jsx"],errorRecovery: true}
//     traverse, // helps collecting the JSX expressions within the AST
//     monacoEditor // highlights the content of that editor via decorations
//   );
//   // Start the JSX highlighting and get the dispose function
//   let disposeJSXHighlighting =
//     monacoJSXHighlighter.highlightOnDidChangeModelContent();
//   // Enhance monaco's editor.action.commentLine with JSX commenting and get its disposer
//   let disposeJSXCommenting = monacoJSXHighlighter.addJSXCommentCommand();
//   // <<< You are all set. >>>

//   // Optional: customize the color font in JSX texts (style class JSXElement.JSXText.tastyPizza from ./index.css)
//   JSXTypes.JSXText.options.inlineClassName = "JSXElement.JSXText.tastyPizza";
//   // more details here: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IModelDecorationOptions.html
//   console.log(
//     "Customize each JSX expression type's options, they must match monaco.editor.IModelDecorationOptions:",
//     JSXTypes
//   );

//   // This example's shorthands for toggling actions
//   const toggleJSXHighlighting = () => {
//     if (disposeJSXHighlighting) {
//       disposeJSXHighlighting();
//       disposeJSXHighlighting = null;
//       return false;
//     }

//     disposeJSXHighlighting =
//       monacoJSXHighlighter.highlightOnDidChangeModelContent();
//     return true;
//   };

//   const toggleJSXCommenting = () => {
//     if (disposeJSXCommenting) {
//       disposeJSXCommenting();
//       disposeJSXCommenting = null;
//       return false;
//     }

//     disposeJSXCommenting = monacoJSXHighlighter.addJSXCommentCommand();
//     return true;
//   };

//   const isToggleJSXHighlightingOn = () => !!disposeJSXHighlighting;
//   const isToggleJSXCommentingOn = () => !!disposeJSXCommenting;

//   return {
//     monacoJSXHighlighter,
//     toggleJSXHighlighting,
//     toggleJSXCommenting,
//     isToggleJSXHighlightingOn,
//     isToggleJSXCommentingOn,
//   };
// };
