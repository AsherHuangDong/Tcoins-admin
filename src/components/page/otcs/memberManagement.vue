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

    <div style="display:flex;justify-content:flex-start:align-items:center;margin-left:150px">
      <div style="margin-right:10px">
        <span>承兑商:</span>
        <Input style="width:120px" v-model="getSearch.mobile" clearable></Input>
      </div>
      <div style="margin-right:10px">
        <span>承兑商角色:</span>
        <Select style="width:120px" v-model="getSearch.agentId" clearable placeholder="请选择">
          <Option
            v-for="item in list"
            :value="item.agentId"
            :key="item.agentId"
          >天启计划-{{item.agentName}}</Option>
        </Select>
      </div>
      <div>
        <Button style="margin-right:10px" type="success" icon="ios-search" @click="getData">查询</Button>
        <Button type="success" @click="out">导出</Button>
      </div>
    </div>
    <br />
    <Button type="primary" @click="memberAdd">添加承兑商</Button>
    <br />
    <br />
    <Table border :columns="columns1" :data="data1" :loading="loading">
      <template slot-scope="{ row, index }" slot="edit">
        <Button type="success" @click="edit(row.id,row.agentId,row.userMobile)">编辑</Button>
        <Button type="success" @click="Delete(row.id)">删除</Button>
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
  name: "memberManagement",
  data() {
    return {
      modal: false,
      loading: false,
      getSearch: {
        mobile: "",
        agentId: "",
        page: 1,
        pageSize: 10
      },
      id: "",
      columns1: [
        {
          title: "UID",
          align: "center",
          ellipsis: true,
          key: "userId"
        },
        {
          title: "手机号码",
          align: "center",
          ellipsis: true,
          key: "userMobile"
        },
        {
          title: "承兑商角色",
          align: "center",
          ellipsis: true,
          key: "agentName"
        },
        {
          title: "操作",
          align: "center",
          ellipsis: true,
          slot: "edit"
        }
      ],
      list: [],
      total: 0,
      data1: [],
      isBigger: false,
      isshow: false,
      agentId: ""
    };
  },
  methods: {
    getData() {
      this.loading = true;
      this.$axios.post("/api/userAgent/list", this.getSearch).then(res => {
        this.loading = false;
        if (res.data.code == 100) {
          this.data1 = res.data.data.records;
          this.total = res.data.data.total;
        } else {
          this.$Message.info(res.data.msg);
        }
      });
    },
    getAgent() {
      this.$axios.post("/api/agent/listAgent").then(res => {
        this.list = res.data.data;
      });
    },
    //新增角色
    addRole() {
      this.$router.push("/addRole");
    },
    //删除角色
    Delete(id) {
      this.id = id;
      this.modal = true;
    },
    //确定删除
    ok() {
      this.$axios.post("/api/userAgent/delete", { id: this.id }).then(res => {
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
    //编辑
    edit(id, agentId, userMobile) {
      console.log(userMobile);
      this.$router.push({
        path: "/memberEdit",
        query: {
          id: id,
          agentId: agentId,
          mobile: userMobile
        }
      });
    },
    out() {
      console.log(this.getSearch);
      window.location.href =
        "/api/userAgent/export?mobile=" +
        this.getSearch.mobile +
        "&&agentId=" +
        this.getSearch.agentId;
      this.$axios
        .get(
          "/api/userAgent/export?mobile=" +
            this.getSearch.mobile +
            "&&agentId=" +
            this.getSearch.agentId
        )
        .then(res => {
          console.log(res.data);
        });
    },
    changePage(page) {
      this.getSearch.page = page;
      this.getData();
    },
    changePageSize(pageSize) {
      this.getSearch.pageSize = pageSize;
      this.getData();
    },
    memberAdd(){
      this.$router.push('/memberAdd');
    }
  },
  mounted() {
    this.getData();
    this.getAgent();
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