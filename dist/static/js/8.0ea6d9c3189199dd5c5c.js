webpackJsonp([8],{"1G/n":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Row",[n("Col",{attrs:{span:"11"}},[n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[t._v("用户统计")]),t._v(" "),n("div",{staticClass:"personNum"},[n("p",[n("span",[t._v(t._s(t.loginCount.userNumber))]),t._v(" "),n("span",[t._v("用户人数")])]),t._v(" "),n("p",[n("span",[t._v(t._s(t.loginCount.userCount))]),t._v(" "),n("span",[t._v("使用人数")])])])])],1),t._v(" "),n("Col",{attrs:{span:"11",offset:"2"}},[n("Card",{attrs:{"dis-hover":""}},[n("p",{attrs:{slot:"title"},slot:"title"},[t._v("最近登录")]),t._v(" "),t._l(t.loginCount.loginList,function(e,a){return n("p",{key:a,staticClass:"login-list"},[n("span",[t._v(t._s(e.userName))]),t._v(" "),n("span",[t._v(t._s(e.userEmail))]),t._v(" "),n("span",[t._v(t._s(e.loginTime))])])})],2)],1)],1),t._v(" "),n("br"),t._v(" "),n("Row",[n("Col",{attrs:{span:"24"}},[n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[t._v("练习评价")]),t._v(" "),n("Table",{attrs:{border:"",columns:t.columns,data:t.evaluationCount}}),t._v(" "),n("br"),t._v(" "),n("div",{staticStyle:{"text-align":"center"}},[n("Page",{attrs:{total:t.total,"show-total":"",current:t.page,"page-size":t.pageSize},on:{"on-change":t.changePage}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var o=n("VU/8")({name:"dataStatistics",data:function(){return{page:1,pageSize:10,total:0,evaluationCount:[],loginCount:{},columns:[{title:"序号",type:"index",align:"center"},{title:"练习内容",key:"resourceName",align:"center"},{title:"类型",key:"resourceType",align:"center",render:function(t,e){return t("div",{},1==e.row.resourceType?"音频":2==e.row.resourceType?"视频":3==e.row.resourceType?"电子书":4==e.row.resourceType?"问卷":5==e.row.resourceType?"表单":"")}},{title:"完成人数",key:"peopleNumber",align:"center"},{title:"完成人次",key:"peopleCount",align:"center"},{title:"平均评价",key:"averageComment",align:"center"}]}},methods:{changePage:function(t){this.page=t},getLoginCount:function(){var t=this;this.$axios.post("api/user/getLoginCount").then(function(e){t.loginCount=e.data.data})},getEvaluationCount:function(){var t=this;this.$axios.post("api/user/getEvaluationCount",{page:this.page,pageSize:this.pageSize}).then(function(e){t.evaluationCount=e.data.data.recordList})}},mounted:function(){this.getLoginCount(),this.getEvaluationCount()}},a,!1,function(t){n("QI11")},null,null);e.default=o.exports},QI11:function(t,e){}});
//# sourceMappingURL=8.0ea6d9c3189199dd5c5c.js.map