import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CustomStyle.css'; 
const TextEditor = ({value,setValue}) => {
  // const [value, setValue] = useState('');

  // Define the toolbar options you want to include
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote','codeblock'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  return (
    <div style={{width:"100%",outline:"none", borderRadius:"10px"}}>
    <ReactQuill
      placeholder="Your Content goes here ..."
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
    />
    </div>
  );
};

export default TextEditor;