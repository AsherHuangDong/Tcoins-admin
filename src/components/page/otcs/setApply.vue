<template>
  <div>
    <div class="head">
      <span>缴纳保证金:</span>
      <Input style="width:160px" type="number" v-model="apply.payCost"></Input>
      <span style="margin:0 45px 0 5px">{{apply.paySymbol}}</span>
      <i-Switch v-model="switch1" @on-change="change" />
      <span style="margin-left:5px">{{msg}}</span>
    </div>
    <div style="margin-top:60px;padding-left:60px">
      <Button type="primary" style="width:150px" @click="save">保存</Button>
      <Button type="primary" style="width:150px" @click="cancel">取消</Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "setApply",
  data() {
    return {
      switch1: false,
      msg: "关闭",
      apply: {
        isOpen: 0,
        payCost: 0,
        paySymbol:'EUSDT'
      }
    };
  },
  methods: {
    change(e) {
      console.log(e);
      if (e) {
        this.msg = "开启";
        this.apply.isOpen = 1;
      } else {
        this.msg = "关闭";
        this.apply.isOpen = 0;
      }
    },
    getData(){
      this.$axios.get('/api/configFunction/info').then(res=>{
        console.log(res);
        this.apply.isOpen = res.data.data.info.isOpen;
        this.apply.payCost = res.data.data.info.payCost;
        this.apply.paySymbol = res.data.data.info.paySymbol;
        if(res.data.data.info.isOpen == 0){
          this.switch1 = false;
          this.msg = '关闭'
        }
        if(res.data.data.info.isOpen == 1){
          this.switch1 = true;
          this.msg = '开启'
        }
      })
    },
    save() {
      console.log(this.apply);
      if (!this.apply.payCost) {
        this.$Message.info("请输入保证金");
        return false;
      }
      if (this.apply.payCost <= 0) {
          this.$Message.info("保证金只能是正整数");
          return false;
        }
      this.$axios.post("/api/configFunction", this.apply).then(res=>{
        if(res.data.code == 100){
          this.$Message.success('设置成功');
          this.$router.go(-1)
        }else{
          this.$Message.info(res.data.msg);
        }
      })
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  mounted(){
    this.getData()
  }
};
</script>
<style>
.head {
  padding-left: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>