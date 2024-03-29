import "./App.scss";
import React, { useState, useEffect } from "react";
import TextContext from "./component/TextContext";
import Editor from "./component/Editor";
import Preview from "./component/Preview";
import ToolBar from "./component/ToolBar";

function App() {
    const initEditorClass = ["editor-wrapper min-height", "fa fa-arrows-alt"];
    const initPreviewClass = ["preview-wrapper", "fa fa-compress"];
    const [inputText, setInputText] = useState(initText);
    const [previewText, setPreviewText] = useState("");
    const [editorClass, setEditorClass] = useState(initEditorClass);
    const [previewClass, setPreviewClass] = useState(initPreviewClass);
    const [editMax, setEditMax] = useState(false);
    const [previewMax, setPreviewMax] = useState(false);

    useEffect(() => {
        setPreviewText(inputText);
    }, [inputText, previewText]);

    useEffect(() => {
        let newEditorClass;
        let newPreviewClass;
        if (editMax) {
            newEditorClass = ["editor-wrapper max-height", "fa fa-compress"];
            newPreviewClass = ["hide", "fa fa-compress"];
        } else if (previewMax) {
            newEditorClass = ["hide", "fa fa-compress"];
            newPreviewClass = ["preview-wrapper", "fa fa-compress"];
        } else {
            newEditorClass = ["editor-wrapper min-height", "fa fa-arrows-alt"];
            newPreviewClass = ["preview-wrapper", "fa fa-arrows-alt"];
        }
        setEditorClass(newEditorClass);
        setPreviewClass(newPreviewClass);
    }, [editMax, previewMax]);

    return (
        <TextContext.Provider
            value={{
                inputText: inputText,
                setInputText: setInputText,
                previewText: previewText,
                setPreviewText: setPreviewText,
            }}
        >
            <div className="App">
                <div className="title-wrapper ">
                    <h1 className="title">Markdown Previewer</h1>
                </div>
                <div className="items-wrapper">
                    <div className={editorClass[0]}>
                        <ToolBar
                            icon={editorClass[1]}
                            onClick={() => setEditMax(!editMax)}
                            text="Editor"
                        />
                        <Editor />
                    </div>
                    <div className={previewClass[0]}>
                        <ToolBar
                            icon={previewClass[1]}
                            onClick={() => setPreviewMax(!previewMax)}
                            text="Previewer"
                        />
                        <Preview />
                    </div>
                </div>
            </div>
        </TextContext.Provider>
    );
}

export default App;

const initText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;
