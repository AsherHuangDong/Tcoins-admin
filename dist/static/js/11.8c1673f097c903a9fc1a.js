webpackJsonp([11],{TYMf:function(t,e){},ndHU:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Row",[a("Col",{attrs:{span:"12"}},[a("span",[t._v("邮箱")]),t._v(" "),a("Input",{staticStyle:{width:"200px"},model:{value:t.userEmail,callback:function(e){t.userEmail=e},expression:"userEmail"}})],1),t._v(" "),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"12"}},[a("Button",{attrs:{type:"primary"},on:{click:t.getList}},[t._v("搜索")])],1)],1),t._v(" "),a("br"),t._v(" "),a("Row",[a("Table",{attrs:{border:"",columns:t.columns,data:t.list}})],1),t._v(" "),a("br"),t._v(" "),a("Row",[a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"24"}},[a("Page",{attrs:{total:t.total,"show-total":"","show-sizer":"","show-elevator":"",current:t.page,"page-size":t.pageSize},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}})],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")({name:"userManagement",data:function(){var t=this;return{columns:[{title:"序号",type:"index",align:"center"},{title:"昵称",key:"userName",align:"center"},{title:"注册邮箱",key:"userEmail",align:"center"},{title:"首次使用时间",key:"createTime",align:"center"},{title:"操作",align:"center",render:function(e,a){return e("div",{style:{color:"#00C1DE"},on:{click:function(){t.$router.push({path:"/userdetail",query:{id:a.row.id}})}}},"查看详情")}}],list:[],page:1,pageSize:10,userEmail:"",total:0}},methods:{changePage:function(t){this.page=t},changePageSize:function(t){this.pageSize=t},getList:function(){var t=this,e={page:this.page,pageSize:this.pageSize};this.userEmail&&(e.userEmail=this.userEmail),this.$axios.post("api/user/getUserList",e).then(function(e){t.list=e.data.data.records,t.total=e.data.data.total})}},mounted:function(){this.getList()}},i,!1,function(t){a("TYMf")},null,null);e.default=n.exports}});
//# sourceMappingURL=11.8c1673f097c903a9fc1a.js.map