import React,{useState,useCallback} from "react";
import axios from 'axios'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { CommonHeader, PreUri, Method,getRspMsg } from "../../CommonCode";

export default function Editor({setDesc,desc,no,setContent}){
    const [flag,setFlag] = useState(false);
    const [image,setImage] = useState([]);
    const API_URL= process.env.REACT_APP_API_URL;
    const UPLOAD_ENDPOINT = "/notice/"+(no+1)+"/images"
    const api = {
        apikey: process.env.REACT_APP_API_URL,
        baseURL :`/notice/${(no+1)}/images`,
      }
    const uploadImage = (loader) => {
        return {
          upload: () => {
            return new Promise((resolve, reject) => {
              const body = new FormData();
              loader.file.then((file) => {
                body.append("files", file);
                fetch(`${api.apikey}${api.baseURL}`, {
                  method: "post",
                  body: body
                })
                  .then((res) => res.json())
                  .then((res) => {
                    resolve({
                      default: `${API_URL}/${res.filename}`
                    });
                  })
                  .catch((err) => {
                    reject(err);
                  });
              });
            });
          }
        };
      }
    
      function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return uploadImage(loader);
        };
      }
    return(
        <>
              <CKEditor
             className="text_editor"
             editor={ClassicEditor}
             config={{extraPlugins: [uploadPlugin],
                placeholder: "내용을 입력하세요.",
                allowedContent:true,}}
             style={{"margin":"0px"}}
             onReady={editor=>{
              /* console.log('Editor is ready to use',editor); */
               }}
             onChange={(event,editor)=>{
                const data = editor.getData();
                setImage(data);
                setContent(data.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, ""));
                }}
        onBlur={ ( event, editor ) => {
         /*  console.log( 'Blur.', editor ); */
      } }
        onFocus={ ( event, editor ) => {
        /*   console.log( 'Focus.', editor ); */
      } }/>
      </>
    )
}