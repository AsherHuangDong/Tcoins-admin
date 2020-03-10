<template>
  <div>
    <div style="margin-left:166px">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <FormItem label="上级代理商名称：" prop="pId">
          <Select v-model="formValidate.pId" style="width:400px" placeholder="请选择">
            <Option :value="1">黄金VIP</Option>
            <Option :value="2">铂金VIP</Option>
            <Option :value="3">钻石VIP</Option>
          </Select>
        </FormItem>
        <FormItem label="下级代理商名称：" prop="cid">
          <Select v-model="formValidate.cid" style="width:400px" placeholder="请选择">
            <Option :value="1">黄金VIP</Option>
            <Option :value="2">铂金VIP</Option>
            <Option :value="3">钻石VIP</Option>
          </Select>
        </FormItem>
        <FormItem label="本级代理商等级名称：" prop="agentName">
          <Input v-model="formValidate.agentName" style="width:400px"></Input>
        </FormItem>
        <FormItem label="升级到该级别的条件:">
          <span>下辖团队在</span>
          <Input v-model="formValidate.totalTeamVolumeDays" type="number" style="width:100px"></Input>
          <span>天内的出售订单总流水大于等于</span>
          <Input v-model="formValidate.totalTeamVolume" type="number" style="width:190px"></Input>
          <span>EUSDT</span>
        </FormItem>
        <FormItem prop="agentCost">
          <template slot="label">
            <span style="color:#FF4C4C">或：</span>
          </template>
          <span>缴纳代理费</span>
          <Input v-model="formValidate.agentCost" type="number" style="width:190px"></Input>
          <span>个EUSDT</span>
        </FormItem>
        <FormItem prop="lowerNumber">
          <template slot="label">
            <span style="color:#FF4C4C">或：</span>
          </template>
          <span>推荐下一层级的低级别代理商人数大于等于</span>
          <Input v-model="formValidate.lowerNumber" type="number" style="width:190px"></Input>
          <span>人</span>
        </FormItem>
        <FormItem label="收益设置:" prop="commissionRatio">
          <div style="display:flex;justify-content:flex-start:align-items:center">
            <span>按下辖团队出售订单总流水的</span>
            <Input v-model="formValidate.commissionRatio" type="number" style="width:100px">
              <span slot="append">%</span>
            </Input>
            <span>进行奖励</span>
          </div>
        </FormItem>
        <FormItem label="个人收益设置:" prop="rewardRate">
          <div style="display:flex;justify-content:flex-start:align-items:center">
            <Input v-model="formValidate.rewardRate" type="number" style="width:100px"></Input>
          </div>
        </FormItem>
        <FormItem>
          <div style="display:flex;justify-content:flex-start;align-items:center">
            <Button
              type="info"
              style="width:150px;margin-right:12px"
              @click="save('formValidate')"
            >保存</Button>
            <Button type="info" style="width:150px" @click="cancel">取消</Button>
          </div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
export default {
  name: "addRole",
  data() {
    return {
      formValidate: {
        agentName: "", //代理商名称
        agentCost: "", //代理费用
        lowerNumber: "", //招募下级人数
        totalTeamVolume: "", //总流水大于等于
        commissionRatio: "", //收益设置
        pId: -1, //上级代理商Id
        cid: -1, //下级代理商id
        totalTeamVolumeDays: "", //团队出售订单总量天数
        rewardRate: "" //个人收益设置
      },
      ruleValidate: {
        agentName: [
          {
            required: true,
            message: "本级代理商等级名称不能为空",
            trigger: "blur"
          }
        ],
        agentCost: [
          {
            required: true,
            message: "代理费用不能为空",
            trigger: "blur"
          }
        ],
        lowerNumber: [
          {
            required: true,
            message: "招募下级人数不能为空",
            trigger: "blur"
          }
        ],
        commissionRatio: [
          {
            required: true,
            message: "收益设置不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios.post("/api/agent/add", this.formValidate).then(res => {
            console.log(res);
            if (res.data.code == 100) {
              this.$Message.success("添加成功");
              this.$router.go(-1);
            } else {
              this.$Message.info(res.data.msg);
            }
          });
        } else {
          //this.$Message.error("Fail!");
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  mounted() {}
};
</script>
<style lang="">
</style>