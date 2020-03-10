<template>
  <div>
    <!-- 查看信息 -->
    <Modal v-model="modal" width="573.5" :closable="false" footer-hide :fullscreen="isBigger">
      <div
        style="display:flex;justify-content:space-between;align-items:center;width:100%;height:40px;background:#F1F1F1;border-radius:4px 4px 0px 0px;padding:0 15.5px 0 15.5px"
      >
        <span style="font-size:13px;font-weight:400;color:#333333;">查看信息</span>
        <div style="display:flex;justify-content:flex-end;align-items:center">
          <img @click="smaller" src="static/img/smaller.png" style="width:11px;height:1px;" />
          <img
            @click="bigger"
            src="static/img/bigger.png"
            style="width:10px;height:10px;margin-left:10px;"
          />
          <img
            @click="close"
            src="static/img/close.png"
            style="width:10px;height:10px;margin-left:10px;"
          />
        </div>
      </div>

      <div style="margin-top:26px;display:flex;justify-content:center;align-items:center">
        <Form ref="formValidate" :model="formValidate" :label-width="100" disabled>
          <FormItem label="申请类型">
            <Input :value="formValidate.type==1?'申请商家':'解除商家'" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="用户UID">
            <Input v-model="formValidate.uid" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="手机号">
            <Input v-model="formValidate.mobile" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="邮箱">
            <Input v-model="formValidate.email" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="实名认证">
            <Input v-model="formValidate.mail" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="姓名">
            <Input v-model="formValidate.name" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="是否交纳保证金">
            <Input style="width:442.5px" :value="formValidate.feeType==1?'是':'否'"></Input>
          </FormItem>
          <FormItem label="已冻结保证金">
            <Input v-model="formValidate.fee" style="width:442.5px"></Input>
          </FormItem>
        </Form>
      </div>
      <div v-if="formValidate.type==1" style="text-align:center;margin-top:32px;">
        <Button
          style="width:90px;height:42px;margin-right:40px;margin-bottom:28px"
          type="primary"
          @click="close"
        >关闭</Button>
      </div>
      <div v-if="formValidate.type==2" style="text-align:center;">
        <button
          style="width:130px;height:40px;margin-right:40px;margin-bottom:28px;background:#5A98DE;border-radius:3px"
          @click="apply"
        >
          <span style="font-size:11px;color:#FEFEFE;text-align:center">审批通过，释放保证金</span>
        </button>
        <button
          style="width:130px;height:40px;margin-right:40px;margin-bottom:28px;background:#5A98DE;border-radius:3px"
          @click="notApply"
        >
          <span style="font-size:11px;color:#FEFEFE">审批驳回</span>
        </button>
      </div>
    </Modal>

    <div class="title">
      <div>
        <span>UID:</span>
        <Input style="width:120px" v-model="getSearch.uid" clearable></Input>
      </div>
      <div>
        <span>手机号</span>
        <Input style="width:120px" v-model="getSearch.mobile" clearable></Input>
      </div>
      <div>
        <span>申请类型</span>
        <Select style="width:120px" v-model="getSearch.type" clearable>
          <Option :value="1">申请商家</Option>
          <Option :value="2">解除商家</Option>
        </Select>
      </div>
      <div>
        <span>申请日期:</span>
        <DatePicker
          v-model="getSearch.beginTime"
          format="yyyy-MM-dd"
          type="date"
          placeholder="Select date"
          @on-change="changeStartDate"
          style="width: 120px"
          clearable
        ></DatePicker>
        <span>-</span>
        <DatePicker
          v-model="getSearch.endTime"
          format="yyyy-MM-dd"
          type="date"
          @on-change="changeEndDate"
          placeholder="Select date"
          style="width: 120px"
          clearable
        ></DatePicker>
      </div>
      <Button type="success" icon="ios-search" @click="getData">搜索</Button>
    </div>
    <div style="margin-top:40px">
      <Button type="primary" @click="setApply">设置申请条件</Button>
    </div>
    <br />
    <Table border :columns="columns1" :data="data1" :loading="loading">
      <template slot-scope="{ row, index }" slot="edit">
        <Button type="primary" @click="gotoDetail(row.id)">查看</Button>
      </template>
    </Table>
    <br />
    <Row>
      <Col span="24" style="text-align:right;">
        <Page
          :total="total"
          :current="getSearch.page"
          :page-size="getSearch.pageSize"
          show-total
          show-sizer
          show-elevator
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        ></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "applyList",
  data() {
    return {
      id: "",
      formValidate: {
        uid: "",
        mobile: "",
        type: 1,
        email: "",
        name: "",
        feeType: 1,
        amount: ""
      },
      getSearch: {
        uid: "",
        mobile: "",
        type: "",
        beginTime: "",
        endTime: "",
        page: 1,
        pageSize: 10
      },
      modal: false,
      loading: false,
      total: 0,
      columns1: [
        {
          title: "UID",
          align: "center",
          ellipsis: true,
          key: "uid"
        },
        {
          title: "手机号码",
          align: "center",
          ellipsis: true,
          key: "mobile"
        },
        {
          title: "申请日期",
          align: "center",
          ellipsis: true,
          key: "c_time"
        },
        {
          title: "申请类型",
          align: "center",
          ellipsis: true,
          key: "shift",
          render(h, param) {
            if (param.row.shift == 1) {
              return h("span", {}, "申请商家");
            }
            if (param.row.shift == 2) {
              return h("span", {}, "解除商家");
            }
          }
        },
        {
          title: "认证状态",
          align: "center",
          ellipsis: true,
          key: "status",
          render(h, param) {
            if (param.row.status == 0) {
              return h("span", {}, "审核中");
            }
            if (param.row.status == 1) {
              return h("span", {}, "已通过");
            }
            if (param.row.status == 2) {
              return h("span", {}, "失败");
            }
            if (param.row.status == 3) {
              return h("span", {}, "成功解除");
            }
            if (param.row.status == 4) {
              return h("span", {}, "驳回");
            }
          }
        },
        {
          title: "缴纳保证金",
          align: "center",
          ellipsis: true,
          key: "amount"
        },
        {
          title: "操作",
          align: "center",
          ellipsis: true,
          slot: "edit"
        }
      ],
      data1: [],
      isBigger: false,
      isshow: false
    };
  },
  methods: {
    getData() {
      this.loading = true;
      let form = new FormData();
      form.append("page", this.getSearch.page);
      form.append("pageSize", this.getSearch.pageSize);
      let obj = {};
      if (this.getSearch.uid) {
        obj.uid = this.getSearch.uid;
      }
      if (this.getSearch.mobile) {
        obj.mobile = this.getSearch.mobile;
      }
      if (this.getSearch.type) {
        obj.type = this.getSearch.type;
      }
      if (this.getSearch.beginTime) {
        obj.beginTime = this.DateTool.format(this.getSearch.beginTime,"yyyy-MM-dd hh:mm:ss");
      }
      if (this.getSearch.endTime) {
        obj.endTime = this.DateTool.format(this.getSearch.endTime,'yyyy-MM-dd hh:mm:ss');
      }
      obj.page = this.getSearch.page;
      obj.pageSize = this.getSearch.pageSize;
      console.log('obj',obj);
      this.$axios.post("/api/orderForm/listOrderForm", obj).then(res => {
        console.log(res);
        this.loading = false;
        if (res.data.code == 100) {
          this.data1 = res.data.data.records;
          this.total = res.data.data.total;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    changeStartDate() {},
    changeEndDate() {},
    changePage(page) {
      this.getSearch.page = page;
      this.getData()
    },
    changePageSize(pageSize) {
      this.getSearch.pageSize = pageSize;
      this.getData();
    },
    close() {
      this.modal = false;
    },
    bigger() {
      this.isBigger = true;
    },
    smaller() {
      this.isBigger = false;
    },
    //查看详情
    getDetail() {
      let id = this.id;
      this.$axios
        .post("/api/orderForm/getOrderFormById", { id: this.id })
        .then(res => {
          this.formValidate = res.data.data;
        }); 
    },
    //显示详情
    gotoDetail(id) {
      this.id = id;
      this.getDetail();
      this.modal = true;
    },
    //审批通过
    apply() {
      this.$axios
        .post("/api/orderForm/passOrReject", { id: this.id, type: 1 })
        .then(res => {
          console.log(res);
          this.getData();
          this.modal = false;
        });
    },
    //审批驳回
    notApply() {
      this.$axios
        .post("/api/orderForm/passOrReject", { id: this.id, type: 2 })
        .then(res => {
          console.log(res);
          this.getData();
          this.modal = false;
        });
    },
    setApply(){
      this.$router.push('/setApply')
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}
.ivu-modal-body {
  padding: 0 !important;
}
</style>