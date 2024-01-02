import { getlist } from '@/apis/article'
import { useState, useEffect } from 'react'
function useClass (){
  const [channelList, setList] = useState([])
  useEffect(() => {
  
    const getclasslist=async()=>{
       let {data}= await getlist()
        setList(data)
    }
    getclasslist()
  }, [])
  // 返回数据
  return {channelList}

}
export default useClass