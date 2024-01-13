import {useEffect,useState} from 'react'
import { upload } from '@/apis/user'
import {getsharelist,addshare,editshare,delshare} from '@/apis/share'
import {Button ,Table,Space,Popconfirm,Select,Modal,Form,Input,Upload,message} from 'antd'
import { EditOutlined, DeleteOutlined,PlusOutlined  ,LoadingOutlined} from '@ant-design/icons'
import useShareCate from '@/hooks/useShareCate'
import './index.scss'
import Catetable from './catetable'
const { TextArea } = Input;
const Share=()=> {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: '网站logo',
      key: 'logo',
      render: (data) => {
        return (
          <img  src={data.logo} alt="" />
        )
      }
    },
    {
      title: '网站地址',
      key: 'url',
      render: (data) => {
        return (
          <a href={data.url} target='about'>{data.url}</a>
        )
      }
    },
    {
      title: '网站介绍',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: '所属分类',
      key: 'text',
      render: (data) => {
        return (
          <span>{ShareCateList.filter(item=>item.id*1 === data.pid*1)[0]?.shareCateName }</span>
        ) 
      }
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
              onClick={() => onEditinfo(data)}
            />
            <Popconfirm
              title="删除网站"
              description="确认要删除当前网站吗?"
              onConfirm={() => onConfirm(data)}
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
  // 弹窗关闭回调
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setImageUrl('')
    setEditData({})
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 编辑网站
  const [editdata,setEditData] = useState({}) // 编辑的数据
  const onEditinfo = (data) => {
    setEditData(data)
    form.setFieldsValue({...data})
    setImageUrl(data.logo)
    setIsModalOpen(true);
  }
   // 添加网站
  const onFinish = async(values) => {
    if (editdata.id) {
      await editshare({...values,logo:imageUrl,id:editdata.id})
    }else {
      await addshare({...values,logo:imageUrl})
    }
    message.success(`${editdata.id?'编辑':'添加'}成功`)
    handleCancel()
    setPageObj({...pageObj})
  };
  // 删除网站
  const onConfirm =async (data) => {
    await delshare(data.id)
    message.success('删除成功')
    setPageObj({...pageObj})
  }
  // 分页切换
  const onChange = (data) =>setPageObj({
    ...pageObj,
    pid:data,
  })
  // 获取文章分类列表
  const {ShareCateList} = useShareCate()
  // 获取文章列表
  const [sharelist,setShareList] = useState([])
  const [pageObj,setPageObj] = useState({
    page:1,
    size:5,
    pid:''
  })
  const [total,setTotal] = useState(0)
  const getshareList = async() => {
    let {data,total} =await getsharelist(pageObj)
    setShareList(data)
    setTotal(total)
  }
  useEffect(() => {
    // 请求获取文章列表
    getshareList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageObj])

  // 表单
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  // 自定义上传图片
  const customRequest= async(options)=>{
    setLoading(true);
    const { file } = options;
    const formData = new FormData();
    formData.append('file', file);
    const {url}= await upload(formData)
    setLoading(false);
    setImageUrl(url)
  }
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  // 校验失败
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  return (
    <>
    <div className='content'>
      {/* 网站分类  */}
      <div className='left'>
        <Catetable></Catetable>
      </div>
      {/* 网站列表  */}
      <div className='right'>
      <h2>网站全部列表</h2> <Button type="primary" onClick={()=>setIsModalOpen(true)}>添加</Button>
      <Select
          placeholder="选择分类"
          optionFilterProp="children"
          onChange={onChange}
          allowClear={true}
          fieldNames={
            {label: 'shareCateName', value: 'id'}
          }
          options={ShareCateList}
        />
        <Table 
          dataSource={sharelist} 
          columns={columns} 
          pagination={{ 
            total:total,
            pageSize:pageObj.size,
            showTitle:true,
            showTotal:total => `共${total}条`,
            onChange:(page, pageSize) => {
              setPageObj({
                ...pageObj,
                page:page,
              })
            }
          }}
          rowKey={record => record.id}
         />
      </div>
      {/* 弹出层 */}
      <Modal title= {editdata.id?"编辑网站":"添加网站" }   okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }} open={isModalOpen} onCancel={handleCancel}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: true }}
          layout="horizontal"
          autoComplete="off"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="名称" name="name" rules={[{ required: true,  message: '请输入名称', }]}>
            <Input />
          </Form.Item>
          <Form.Item label="网站logo"  valuePropName=""  >
            <Upload  
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={customRequest}>
            {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%',
              }}
            />
          ) : (
            uploadButton
          )}
            </Upload>
           <div style={{display:'flex',alignItems:"center"}}>
           <Input value={imageUrl} placeholder='可输入图片地址' onChange={(val)=>setImageUrl(val.target.value)}/>
            <Button type="primary" size='small'  onClick={()=>setImageUrl('http://101.201.58.143:3007/api/logo.png')}>使用默认</Button>
           </div>
          </Form.Item>
          <Form.Item label="网站地址" name="url" rules={[{ required: true,  message: '请输入网站地址' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="所属分类" name="pid" rules={[{ required: true,  message: '请选择所属分类' }]}>
            <Select placeholder="选择分类"   allowClear={true}>
            {
              ShareCateList.map((item) => <Select.Option value={item.id} key={item.id}>{item.shareCateName}</Select.Option>)
            }
          </Select>
          </Form.Item>
          <Form.Item label="网站介绍" name="text" rules={[{ required: true ,  message: '请选择网站介绍'}]}>
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </>
  )
}
export default Share