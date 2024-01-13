import {getsharecatelist} from '@/apis/share'

import { useState, useEffect } from 'react'
function useShareCate (){
  const [ShareCateList, setList] = useState([])
  const getlist=async()=>{
     let {data}= await getsharecatelist()
      setList(data)
  }
  useEffect(() => {
    getlist()
  }, [])
  // 返回数据
  return {ShareCateList,getlist}

}
export default useShareCate