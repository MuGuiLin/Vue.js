import{h as t,n as y,j as h,p as b}from"./index-a89cdc83.js";const z=(i,d)=>{const v=t(),o=t(!0),s=t(1),c=t(1),f=t(""),r=t(10),l=t([]),n=(e={})=>new Promise((u,g)=>{o.value=!0,b(async()=>{try{const{data:a}=await i({...e,...d,page:s.value,pageSize:r.value});l.value=a.list||[],c.value=a.total||1,u(a)}catch(a){throw g(a),new Error(`API请求出错：${a}`)}finally{o.value=!1}})}),p=e=>{e&&e.resetFields()},w=e=>{e&&e.validate(async u=>{u&&(s.value=1,n())})};return y([s,r],()=>{n()}),h(()=>{n()}),{data:l,page:s,total:c,loading:o,keyword:f,pageSize:r,formRef:v,reset:p,submit:w,request:n}};export{z as u};
