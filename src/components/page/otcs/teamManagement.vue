<template>
  <div>
    <!-- 删除 -->
    <Modal v-model="modal" width="388" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:rgba(234,243,252,1);border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(19,112,218,1);">是否删除该条记录？</span>
      </div>

      <div style="display:flex;justify-content:center;align-items:center;margin-top:26px">
        <span
          style="font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(51,51,51,1);"
        >删除后将无法被恢复</span>
      </div>
      <div style="text-align:center;margin-top:32px;">
        <Button style="width:90px;height:42px;margin-bottom:28px" @click="cancel">取消</Button>
        <Button
          style="width:90px;height:42px;margin-left:40px;margin-bottom:28px"
          type="primary"
          @click="ok"
        >删除</Button>
      </div>
    </Modal>
    <!-- 编辑 -->
    <Modal v-model="modal1" width="588" :closable="false" footer-hide>
      <div
        style="display:flex;justify-content:center;align-items:center;width:100%;height:67px;background:rgba(234,243,252,1);border-radius:4px 4px 0px 0px;"
      >
        <span style="font-size:20px;font-weight:400;color:rgba(19,112,218,1);">修改代理商信息</span>
      </div>

      <div style="display:flex;justify-content:center;align-items:center;margin-top:26px">
        <Form ref="formValidate" :model="formValidate" :label-width="100" disabled>
          <FormItem label="代理商名称	">
            <Input v-model="formValidate.agentName" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="代理费">
            <Input v-model="formValidate.agentCost" type="number" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="招募下级人数	">
            <Input v-model="formValidate.lowerNumber" type="number" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="总流水大于等于	">
            <Input v-model="formValidate.totalTeamVolume" type="number" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="收益设置	">
            <Input v-model="formValidate.commissionRatio" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="上级代理商id	">
            <Input v-model="formValidate.pId" type="number" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="下级代理商id">
            <Input v-model="formValidate.cId" type="number" style="width:442.5px"></Input>
          </FormItem>
          <FormItem label="团队出售订单总量天数	">
            <Input v-model="formValidate.totalTeamVolumeDays" type="number" style="width:442.5px"></Input>
          </FormItem>
        </Form>
      </div>
      <div style="text-align:center;margin-top:32px;">
        <Button style="width:90px;height:42px;margin-bottom:28px" @click="cancel1">取消</Button>
        <Button
          style="width:90px;height:42px;margin-left:40px;margin-bottom:28px"
          type="primary"
          @click="ok1"
        >确定</Button>
      </div>
    </Modal>

    <div>
      <Button type="success" icon="ios-search" @click="addRole">创建角色</Button>
    </div>
    <br />
    <Table border :columns="columns1" :data="data1" :loading="loading">
      <template slot-scope="{ row, index }" slot="edit">
        <Button type="success" @click="edit(row.agentId)">编辑</Button>
        <Button type="success" @click="Delete(row.agentId)">删除</Button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  name: "applyList",
  data() {
    return {
      formValidate: {
        agentId: "",//代理商Id
        agentName: "",//代理商名称
        agentCost: "",//代理费
        paySymbol: "",//
        lowerNumber: "",//招募下级人数
        totalTeamVolume: "",//总流水大于等于
        commissionRatio: "",//收益设置
        updateTime: "",
        pname: "",
        cname: "",
        pid: "",//上级代理商id
        cId: "",//下级代理商id
        totalTeamVolumeDays:'',//团队出售订单总量天数
      },
      modal: false,
      modal1: false,
      loading: false,
      columns1: [
        {
          title: "登记名称",
          align: "center",
          ellipsis: true,
          key: "agentName"
        },
        {
          title: "团队收益比例",
          align: "center",
          ellipsis: true,
          key: "commissionRatio"
        },
        {
          title: "上级角色名称",
          align: "center",
          ellipsis: true,
          key: "upName"
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
      isshow: false,
      agentId: ""
    };
  },
  methods: {
    getData() {
      this.loading = true;
      this.$axios.post("/api/agent/listAgent").then(res => {
        this.loading = false;
        if (res.data.code == 100) {
          this.data1 = res.data.data;
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    //新增角色
    addRole() {
      this.$router.push("/addRole");
    },
    //删除角色
    Delete(agentId) {
      this.agentId = agentId;
      this.modal = true;
    },
    //确定删除
    ok() {
      this.$axios
        .post("/api/agent/deleteAgent", { id: this.agentId })
        .then(res => {
          if (res.data.code == 100) {
            this.$Message.success("删除成功");
            this.getData();
            this.modal = false;
          } else {
            this.$Message.info(res.data.msg);
          }
        });
    },
    cancel() {
      this.$Message.info("用户点击了取消");
      this.modal = false;
    },
    //编辑回显
    editInfo() {
      console.log(this.agentId);
      this.$axios.get("/api/agent/byId?agentId=" + this.agentId).then(res => {
        console.log(res);
        this.formValidate = res.data.data.info;
      });
    },
    //编辑
    edit(agentId) {
      this.agentId = agentId;
      this.editInfo();
      this.modal1 = true;
    },
    //编辑确定
    ok1() {
      console.log(this.formValidate)
      this.$axios.post('/api/agent/update',this.formValidate).then(res=>{
        if(res.data.code == 100){
          this.$Message.success('修改成功')
          this.getData()
          this.modal1 = false;
        }else{
          this.$Message.info(res.data.msg)
        }
      })
    },
    cancel1() {
      this.$Message.info("用户点击了取消");
      this.modal1 = false;
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