"use strict";(self.webpackChunkreact_jike=self.webpackChunkreact_jike||[]).push([[413],{7413:(e,s,a)=>{a.r(s),a.d(s,{default:()=>j});var t=a(7363),i=a(1773),r=a(2641),n=a(5820),l=a(5722),c=a(8526),d=a(2091),o=a(9649),m=a(8656),u=a(1752),x=a(2622),p=a(3030),h=a(184);const j=()=>{const e=[{title:"\u8d26\u53f7",dataIndex:"username",width:220},{title:"\u6635\u79f0",width:160,render:e=>(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("div",{className:"passwordC",children:(0,h.jsx)("div",{children:e.nickname})})})},{title:"\u90ae\u7bb1",dataIndex:"email",width:220},{title:"\u5934\u50cf",width:220,render:e=>(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("div",{className:"imgbox",children:(0,h.jsx)("img",{onError:e=>{e.target.src=a(2473)},alt:"\u5934\u50cf",src:e.user_pic})})})},{title:"\u64cd\u4f5c",render:e=>(0,h.jsxs)(i.Z,{size:"middle",children:[(0,h.jsx)(r.ZP,{type:"primary",shape:"circle",icon:(0,h.jsx)(u.Z,{}),onClick:()=>y(e)}),(0,h.jsx)(n.Z,{title:"\u5220\u9664\u6587\u7ae0",description:"\u786e\u8ba4\u8981\u5220\u9664\u5f53\u524d\u6587\u7ae0\u5417?",onConfirm:()=>Z(e),okText:"Yes",cancelText:"No",children:(0,h.jsx)(r.ZP,{type:"primary",danger:!0,shape:"circle",icon:(0,h.jsx)(x.Z,{})})})]})}],[s,j]=(0,t.useState)([]),Z=async e=>{await(0,p.Ff)({id:e.id}),l.ZP.success("\u5220\u9664\u6210\u529f"),j(s.filter((s=>s.id!==e.id)))},[g,f]=(0,t.useState)(!1),y=e=>{b(e),f(!0)},[w,b]=(0,t.useState)({}),[k]=c.Z.useForm(),[C,P]=(0,t.useState)(0),[F,S]=(0,t.useState)(1),[I,v]=(0,t.useState)(5),[_,q]=(0,t.useState)(null);return(0,t.useEffect)((()=>{g?k.setFieldsValue({...w}):async function(){let e=await(0,p.op)({message:_,pageSize:I,currentPage:F});e.data&&e.data.forEach((e=>{e.user_pic=e.user_pic||a(2473)})),P(e.total),j(e.data)}()}),[w,_,F]),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:"btnbox",children:[(0,h.jsx)(r.ZP,{onClick:()=>{f(!0)},type:"primary",children:"\u6dfb\u52a0"}),(0,h.jsx)(d.Z,{onInput:e=>q(e.target.value),value:_})]}),(0,h.jsx)(o.Z,{rowKey:"id",columns:e,dataSource:s,pagination:{total:C,pageSize:I,onChange:(e,s)=>{console.log(e),S(e)}}}),(0,h.jsx)(m.Z,{title:w.id?"\u7f16\u8f91":"\u6dfb\u52a0",okButtonProps:{style:{display:"none"}},cancelButtonProps:{style:{display:"none"}},open:g,onCancel:()=>{f(!1),b({}),k.resetFields()},children:(0,h.jsxs)(c.Z,{name:"xxx",form:k,labelCol:{span:4},wrapperCol:{span:18},style:{maxWidth:600},initialValues:{remember:!0},onFinish:async e=>{if(console.log(e),w.id){let s=await(0,p.AK)({...e,id:w.id});if(1===s.status)return l.ZP.error("\u4fee\u6539\u5931\u8d25:".concat(s.message));l.ZP.success("\u4fee\u6539\u6210\u529f")}else await(0,p.z2)(e),l.ZP.success("\u6dfb\u52a0\u6210\u529f");f(!1),b(e)},onFinishFailed:e=>{console.log("Failed:",e)},autoComplete:"off",children:[(0,h.jsx)(c.Z.Item,{label:"\u8d26\u53f7",name:"username",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u8d26\u53f7"},{min:6,max:12,message:"\u8bf7\u8f93\u51656-12\u4f4d\u8d26\u53f7"}],children:(0,h.jsx)(d.Z,{})}),!w.id&&(0,h.jsx)(c.Z.Item,{label:"\u5bc6\u7801",name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801!"},{min:6,max:12,message:"\u8bf7\u8f93\u51656-12\u4f4d\u5bc6\u7801"}],children:(0,h.jsx)(d.Z.Password,{})}),(0,h.jsx)(c.Z.Item,{label:"\u6635\u79f0",name:"nickname",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6635\u79f0!"}],children:(0,h.jsx)(d.Z,{})}),(0,h.jsx)(c.Z.Item,{label:"\u90ae\u7bb1",name:"email",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u90ae\u7bb1!"}],children:(0,h.jsx)(d.Z,{})}),(0,h.jsx)(c.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,h.jsx)(r.ZP,{type:"primary",htmlType:"submit",children:"Submit"})})]})})]})}},2473:(e,s,a)=>{e.exports=a.p+"static/media/def.3c25872b3ec924b72a6a.jpg"}}]);
//# sourceMappingURL=413.86e521f8.chunk.js.map