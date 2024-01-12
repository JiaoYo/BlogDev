import {getsharecatelist} from '@/apis/share'

import { useState, useEffect } from 'react'
function useShareCate (){
  const [ShareCateList, setList] = useState([])
  useEffect(() => {
  
    const getlist=async()=>{
       let {data}= await getsharecatelist()
        setList(data)
    }
    getlist()
  }, [])
  // 返回数据
  return {ShareCateList}

}
export default useShareCate