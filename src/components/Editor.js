import React, { useState,useEffect } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
const EditorDemo = ({ value, setDetails }) => {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(value ?? null));
  useEffect(()=>{
    setEditorState(BraftEditor.createEditorState(value ?? null))
  },[value])
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    if (!editorState.isEmpty()) {
      const content = editorState.toHTML();
      setDetails(content);
    } else {
      setDetails('');
    }
  };
  return (
    <div className="my-component" style={{border: '1px solid #ccc'}}>
      <BraftEditor value={editorState} onChange={handleEditorChange} />
    </div>
  );
};

export default EditorDemo;