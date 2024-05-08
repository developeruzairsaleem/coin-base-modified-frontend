import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CustomStyle.css'; 
const TextEditor = ({value,setValue,handleBlur, validateContent}) => {

  console.log("Here is the value in the editor:",value);
  // const [value, setValue] = useState('');
  const [quillRef, setQuillRef] = useState(null);

  // Define the toolbar options you want to include
  const modules = {
    toolbar: [
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
    ],
  };

  useEffect(()=>{
    if(quillRef){
      const editor = quillRef.getEditor();
      editor.root.addEventListener('blur',handleBlur(value));

    return()=>{
      editor.root.removeEventListener('blur', handleBlur(value));
    }
    }


  },[quillRef,value]);


  return (
    <div style={{width:"100%",outline:"none", borderRadius:"10px"}}>
    <ReactQuill
      placeholder="Your Content goes here ..."
      theme="snow"
      value={value}
      ref={setQuillRef}
      onChange={(data)=>{
        setValue(data)
        validateContent(data)
      }}
      modules={modules}
    />
    </div>
  );
};

export default TextEditor;