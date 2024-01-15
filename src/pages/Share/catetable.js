import {useState} from 'react'
import {addsharecate,editsharecate,delsharecate} from '@/apis/share'
import {Button ,Table,Space,Popconfirm,Modal,Input,message} from 'antd'
import { EditOutlined, DeleteOutlined,} from '@ant-design/icons'
import  useShareCate from '@/hooks/useShareCate'
const Catetable=() =>{
  const columns = [
    {
      title: '名称',
      dataIndex: 'shareCateName',
      key: 'shareCateName',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
             <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEditcate(data)}
            />
            <Popconfirm
              title="网站分类"
              description="确认要删除当前网站分类吗?"
              onConfirm={() => onConfirmcate(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm> 
          </Space>
        )
      },
    },
  ];
  // 获取网站分类列表
  const  {ShareCateList,getlist}= useShareCate()
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  // 当前编辑的网站分类对象
  const [editcatedata,setcateEditData] = useState({})
  const onEditcate=(data)=>{
    setcateEditData(data)
    setSharecatename(data.shareCateName)
    setIsModalOpen(true)
  }
  // 网站分类名称
  const [sharecatename,setSharecatename]=useState('')
  // 添加or编辑网站分类
  const  handleonOk=async()=>{
    if (editcatedata.id) {
      await editsharecate({id:editcatedata.id,shareCateName:sharecatename})
    }else {
      await addsharecate({shareCateName:sharecatename})
    }
    message.success(`${editcatedata.id?'编辑':'添加'}成功`)
    setIsModalOpen(false)
    setSharecatename('')
    getlist()
  }
  // 删除网站分类
  const onConfirmcate =async (data) => {
    await delsharecate(data.id)
    message.success('删除成功')
    getlist()
  }
  const cnacelopen=()=>{
    setIsModalOpen(false)
    setSharecatename('')
  }
  return (
    <>
    <div>
      <div className="header">
      <h2>网站列表分类</h2> 
        <Button type="primary" onClick={()=>setIsModalOpen(true)} >添加</Button>
      </div>
      <Table  dataSource={ShareCateList} columns={columns} rowKey={record => record.id} />
    </div>
    <Modal title={`${editcatedata.id?'编辑':'添加'}`}  open={isModalOpen}   onOk={handleonOk} onCancel={cnacelopen}>
      名称 <Input value={sharecatename} onChange={(val)=>setSharecatename(val.target.value)}></Input>
    </Modal>
  </>
  )
}
export default Catetable
