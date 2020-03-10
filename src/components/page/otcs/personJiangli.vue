<template>
  <div>
    <div style="display:flex;justify-content:flex-start:align-items:center;margin-left:150px">
      <div style="margin-right:10px">
        <span>承兑商:</span>
        <Input style="width:120px" v-model="getSearch.mobile" clearable></Input>
      </div>
      <div style="margin-right:10px">
        <span>订单号:</span>
        <Input style="width:120px" v-model="getSearch.orderNum" clearable></Input>
      </div>
      <div style="margin-right:10px">
        <span>发放状态:</span>
        <Select style="width:120px" v-model="getSearch.status" clearable placeholder="请选择">
          <Option value="0">未发放</Option>
          <Option value="1">已发放</Option>
        </Select>
      </div>
      <div>
        <Button style="margin-right:10px" type="success" icon="ios-search" @click="getData">查询</Button>
        <Button type="success" @click="out">导出</Button>
      </div>
    </div>
    <br />
    <Table border :columns="columns1" :data="data1" :loading="loading">
      <template slot-scope="{ row, index }" slot="edit">
        <Button v-if="row.status!=='成功'" type="success" @click="send(row.id)">发放</Button>
        <span v-if="row.status=='成功'">已发放</span>
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
  name: "personJiangli",
  data() {
    return {
      modal: false,
      loading: false,
      getSearch: {
        mobile: "",
        orderNum: "",
        status: "",
        page: 1,
        pageSize: 10
      },
      columns1: [
        {
          title: "承兑商",
          align: "center",
          ellipsis: true,
          key: "acceptanceName"
        },
        {
          title: "订单号",
          align: "center",
          ellipsis: true,
          key: "orderNum"
        },
        {
          title: "交易金额",
          align: "center",
          ellipsis: true,
          key: "tradeAmount",
          width: 220
        },
        {
          title: "发放币种",
          align: "center",
          ellipsis: true,
          key: "symbol",
          width: 100
        },
        {
          title: "发放数量",
          align: "center",
          ellipsis: true,
          key: "rewardsAmount",
          width: 170
        },
        {
          title: "发放状态",
          align: "center",
          ellipsis: true,
          key: "status",
          width: 100
        },
        {
          title: "发放时间",
          align: "center",
          ellipsis: true,
          key: "grantTime"
        },
        {
          title: "操作",
          align: "center",
          ellipsis: true,
          slot: "edit"
        }
      ],
      data1: [],
      total: 0,
      isBigger: false,
      isshow: false,
      agentId: ""
    };
  },
  methods: {
    getData() {
      this.loading = true;
      this.$axios.post("/api/rewards/list", this.getSearch).then(res => {
        this.loading = false;
        if (res.data.code == 100) {
          this.data1 = res.data.data.records;
          this.total = res.data.data.total;
        } else {
          this.$Message.info(res.data.msg);
        }
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
    out() {
      console.log(this.getSearch);
      window.location.href =
        "/api/rewards/export?mobile=" +
        this.getSearch.mobile +
        "&&orderNum=" +
        this.getSearch.orderNum +
        "&&status=" +
        this.getSearch.status;
      this.$axios
        .get(
          "/api/rewards/export?mobile=" +
            this.getSearch.mobile +
            "&&orderNum=" +
            this.getSearch.orderNum +
            "&&status=" +
            this.getSearch.status
        )
        .then(res => {
          console.log(res.data);
        });
    },
    send(id) {
      this.$axios
        .post("/api/rewards/compensatedQuantity", { id: id })
        .then(res => {
          if (res.data.code == 100) {
            this.$Message.success("发放成功！！！");
          } else {
            this.$Message.error(res.data.msg);
          }
        });
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