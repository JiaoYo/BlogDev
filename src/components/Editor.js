import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {upload} from '@/apis/user'
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function MyEditor({ value ,setDetails }) {
    // editor 实例
    const [editor, setEditor] = useState(null)     

    // 工具栏配置
    const toolbarConfig = { }             
    // 编辑器配置
    const editorConfig = {                 
        placeholder: '请输入文章内容...',
        MENU_CONF: {}
    }

    editorConfig.MENU_CONF['uploadImage'] = {
      // server: '127.0.0.1:3007/api/upload',
      // fieldName: 'file',
      // 上传之前触发
       // 自定义上传
      async customUpload(file, insertFn) {     
          // 自己实现上传，并得到图片 url alt href
          let formdata =new FormData();
          formdata.append('file',file);
          let {url} = await upload(formdata)
          // 最后插入图片
          insertFn(url)
      }
  }
  editorConfig.MENU_CONF['uploadVideo'] = {
    // 自定义上传
    async customUpload(file, insertFn) {  
        // file 即选中的文件
        // 自己实现上传，并得到视频 url poster
        // 最后插入视频
        let formdata =new FormData();
          formdata.append('file',file);
          let {url} = await upload(formdata)
        insertFn(url)
    }
}
//   editorConfig.MENU_CONF['codeSelectLang'] = {
//     // 代码语言
//     codeLangs: [
//         { text: 'CSS', value: 'css' },
//         { text: 'HTML', value: 'html' },
//         { text: 'XML', value: 'xml' },
//         // 其他
//     ]
// }
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={value||''}
                    onCreated={setEditor}
                    onChange={editor => setDetails(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export default MyEditor