webpackJsonp([4],{OUU8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"applyList",data:function(){return{id:"",formValidate:{uid:"",mobile:"",type:1,email:"",name:"",feeType:1,amount:""},getSearch:{uid:"",mobile:"",type:"",beginTime:"",endTime:"",page:1,pageSize:10},modal:!1,loading:!1,total:0,columns1:[{title:"UID",align:"center",ellipsis:!0,key:"uid"},{title:"手机号码",align:"center",ellipsis:!0,key:"mobile"},{title:"申请日期",align:"center",ellipsis:!0,key:"c_time"},{title:"申请类型",align:"center",ellipsis:!0,key:"shift",render:function(t,e){return 1==e.row.shift?t("span",{},"申请商家"):2==e.row.shift?t("span",{},"解除商家"):void 0}},{title:"认证状态",align:"center",ellipsis:!0,key:"status",render:function(t,e){return 0==e.row.status?t("span",{},"审核中"):1==e.row.status?t("span",{},"已通过"):2==e.row.status?t("span",{},"失败"):3==e.row.status?t("span",{},"成功解除"):4==e.row.status?t("span",{},"驳回"):void 0}},{title:"缴纳保证金",align:"center",ellipsis:!0,key:"amount"},{title:"操作",align:"center",ellipsis:!0,slot:"edit"}],data1:[],isBigger:!1,isshow:!1}},methods:{getData:function(){var t=this;this.loading=!0;var e=new FormData;e.append("page",this.getSearch.page),e.append("pageSize",this.getSearch.pageSize);var a={};this.getSearch.uid&&(a.uid=this.getSearch.uid),this.getSearch.mobile&&(a.mobile=this.getSearch.mobile),this.getSearch.type&&(a.type=this.getSearch.type),this.getSearch.beginTime&&(a.beginTime=this.DateTool.format(this.getSearch.beginTime,"yyyy-MM-dd hh:mm:ss")),this.getSearch.endTime&&(a.endTime=this.DateTool.format(this.getSearch.endTime,"yyyy-MM-dd hh:mm:ss")),a.page=this.getSearch.page,a.pageSize=this.getSearch.pageSize,console.log("obj",a),this.$axios.post("/api/orderForm/listOrderForm",a).then(function(e){console.log(e),t.loading=!1,100==e.data.code?(t.data1=e.data.data.records,t.total=e.data.data.total):t.$Message.error(e.data.msg)})},changeStartDate:function(){},changeEndDate:function(){},changePage:function(t){this.getSearch.page=t,this.getData()},changePageSize:function(t){this.getSearch.pageSize=t,this.getData()},close:function(){this.modal=!1},bigger:function(){this.isBigger=!0},smaller:function(){this.isBigger=!1},getDetail:function(){var t=this;this.id;this.$axios.post("/api/orderForm/getOrderFormById",{id:this.id}).then(function(e){t.formValidate=e.data.data})},gotoDetail:function(t){this.id=t,this.getDetail(),this.modal=!0},apply:function(){var t=this;this.$axios.post("/api/orderForm/passOrReject",{id:this.id,type:1}).then(function(e){console.log(e),t.getData(),t.modal=!1})},notApply:function(){var t=this;this.$axios.post("/api/orderForm/passOrReject",{id:this.id,type:2}).then(function(e){console.log(e),t.getData(),t.modal=!1})},setApply:function(){this.$router.push("/setApply")}},mounted:function(){this.getData()}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Modal",{attrs:{width:"573.5",closable:!1,"footer-hide":"",fullscreen:t.isBigger},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[a("div",{staticStyle:{display:"flex","justify-content":"space-between","align-items":"center",width:"100%",height:"40px",background:"#F1F1F1","border-radius":"4px 4px 0px 0px",padding:"0 15.5px 0 15.5px"}},[a("span",{staticStyle:{"font-size":"13px","font-weight":"400",color:"#333333"}},[t._v("查看信息")]),t._v(" "),a("div",{staticStyle:{display:"flex","justify-content":"flex-end","align-items":"center"}},[a("img",{staticStyle:{width:"11px",height:"1px"},attrs:{src:"static/img/smaller.png"},on:{click:t.smaller}}),t._v(" "),a("img",{staticStyle:{width:"10px",height:"10px","margin-left":"10px"},attrs:{src:"static/img/bigger.png"},on:{click:t.bigger}}),t._v(" "),a("img",{staticStyle:{width:"10px",height:"10px","margin-left":"10px"},attrs:{src:"static/img/close.png"},on:{click:t.close}})])]),t._v(" "),a("div",{staticStyle:{"margin-top":"26px",display:"flex","justify-content":"center","align-items":"center"}},[a("Form",{ref:"formValidate",attrs:{model:t.formValidate,"label-width":100,disabled:""}},[a("FormItem",{attrs:{label:"申请类型"}},[a("Input",{staticStyle:{width:"442.5px"},attrs:{value:1==t.formValidate.type?"申请商家":"解除商家"}})],1),t._v(" "),a("FormItem",{attrs:{label:"用户UID"}},[a("Input",{staticStyle:{width:"442.5px"},model:{value:t.formValidate.uid,callback:function(e){t.$set(t.formValidate,"uid",e)},expression:"formValidate.uid"}})],1),t._v(" "),a("FormItem",{attrs:{label:"手机号"}},[a("Input",{staticStyle:{width:"442.5px"},model:{value:t.formValidate.mobile,callback:function(e){t.$set(t.formValidate,"mobile",e)},expression:"formValidate.mobile"}})],1),t._v(" "),a("FormItem",{attrs:{label:"邮箱"}},[a("Input",{staticStyle:{width:"442.5px"},model:{value:t.formValidate.email,callback:function(e){t.$set(t.formValidate,"email",e)},expression:"formValidate.email"}})],1),t._v(" "),a("FormItem",{attrs:{label:"实名认证"}},[a("Input",{staticStyle:{width:"442.5px"},model:{value:t.formValidate.mail,callback:function(e){t.$set(t.formValidate,"mail",e)},expression:"formValidate.mail"}})],1),t._v(" "),a("FormItem",{attrs:{label:"姓名"}},[a("Input",{staticStyle:{width:"442.5px"},model:{value:t.formValidate.name,callback:function(e){t.$set(t.formValidate,"name",e)},expression:"formValidate.name"}})],1),t._v(" "),a("FormItem",{attrs:{label:"是否交纳保证金"}},[a("Input",{staticStyle:{width:"442.5px"},attrs:{value:1==t.formValidate.feeType?"是":"否"}})],1),t._v(" "),a("FormItem",{attrs:{label:"已冻结保证金"}},[a("Input",{staticStyle:{width:"442.5px"},model:{value:t.formValidate.fee,callback:function(e){t.$set(t.formValidate,"fee",e)},expression:"formValidate.fee"}})],1)],1)],1),t._v(" "),1==t.formValidate.type?a("div",{staticStyle:{"text-align":"center","margin-top":"32px"}},[a("Button",{staticStyle:{width:"90px",height:"42px","margin-right":"40px","margin-bottom":"28px"},attrs:{type:"primary"},on:{click:t.close}},[t._v("关闭")])],1):t._e(),t._v(" "),2==t.formValidate.type?a("div",{staticStyle:{"text-align":"center"}},[a("button",{staticStyle:{width:"130px",height:"40px","margin-right":"40px","margin-bottom":"28px",background:"#5A98DE","border-radius":"3px"},on:{click:t.apply}},[a("span",{staticStyle:{"font-size":"11px",color:"#FEFEFE","text-align":"center"}},[t._v("审批通过，释放保证金")])]),t._v(" "),a("button",{staticStyle:{width:"130px",height:"40px","margin-right":"40px","margin-bottom":"28px",background:"#5A98DE","border-radius":"3px"},on:{click:t.notApply}},[a("span",{staticStyle:{"font-size":"11px",color:"#FEFEFE"}},[t._v("审批驳回")])])]):t._e()]),t._v(" "),a("div",{staticClass:"title"},[a("div",[a("span",[t._v("UID:")]),t._v(" "),a("Input",{staticStyle:{width:"120px"},attrs:{clearable:""},model:{value:t.getSearch.uid,callback:function(e){t.$set(t.getSearch,"uid",e)},expression:"getSearch.uid"}})],1),t._v(" "),a("div",[a("span",[t._v("手机号")]),t._v(" "),a("Input",{staticStyle:{width:"120px"},attrs:{clearable:""},model:{value:t.getSearch.mobile,callback:function(e){t.$set(t.getSearch,"mobile",e)},expression:"getSearch.mobile"}})],1),t._v(" "),a("div",[a("span",[t._v("申请类型")]),t._v(" "),a("Select",{staticStyle:{width:"120px"},attrs:{clearable:""},model:{value:t.getSearch.type,callback:function(e){t.$set(t.getSearch,"type",e)},expression:"getSearch.type"}},[a("Option",{attrs:{value:1}},[t._v("申请商家")]),t._v(" "),a("Option",{attrs:{value:2}},[t._v("解除商家")])],1)],1),t._v(" "),a("div",[a("span",[t._v("申请日期:")]),t._v(" "),a("DatePicker",{staticStyle:{width:"120px"},attrs:{format:"yyyy-MM-dd",type:"date",placeholder:"Select date",clearable:""},on:{"on-change":t.changeStartDate},model:{value:t.getSearch.beginTime,callback:function(e){t.$set(t.getSearch,"beginTime",e)},expression:"getSearch.beginTime"}}),t._v(" "),a("span",[t._v("-")]),t._v(" "),a("DatePicker",{staticStyle:{width:"120px"},attrs:{format:"yyyy-MM-dd",type:"date",placeholder:"Select date",clearable:""},on:{"on-change":t.changeEndDate},model:{value:t.getSearch.endTime,callback:function(e){t.$set(t.getSearch,"endTime",e)},expression:"getSearch.endTime"}})],1),t._v(" "),a("Button",{attrs:{type:"success",icon:"ios-search"},on:{click:t.getData}},[t._v("搜索")])],1),t._v(" "),a("div",{staticStyle:{"margin-top":"40px"}},[a("Button",{attrs:{type:"primary"},on:{click:t.setApply}},[t._v("设置申请条件")])],1),t._v(" "),a("br"),t._v(" "),a("Table",{attrs:{border:"",columns:t.columns1,data:t.data1,loading:t.loading},scopedSlots:t._u([{key:"edit",fn:function(e){var i=e.row;return e.index,[a("Button",{attrs:{type:"primary"},on:{click:function(e){return t.gotoDetail(i.id)}}},[t._v("查看")])]}}])}),t._v(" "),a("br"),t._v(" "),a("Row",[a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"24"}},[a("Page",{attrs:{total:t.total,current:t.getSearch.page,"page-size":t.getSearch.pageSize,"show-total":"","show-sizer":"","show-elevator":""},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}})],1)],1)],1)},staticRenderFns:[]};var s=a("C7Lr")(i,l,!1,function(t){a("WEO+")},null,null);e.default=s.exports},"WEO+":function(t,e){}});
//# sourceMappingURL=4.cbaf1586cf7e19e76860.js.map