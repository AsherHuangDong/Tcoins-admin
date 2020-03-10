<template>
  <div>
    <Form ref="formValidate" :rules="ruleCustom" :model="formValidate" :label-width="100">
      <FormItem label="承兑商:" prop="mobile">
        <Input v-model="formValidate.mobile" style="width:270px" disabled></Input>
      </FormItem>
      <FormItem label="承兑商角色:" prop="type">
        <Select v-model="formValidate.agentId" placeholder="请选择" style="width:270px">
          <Option v-for="item in list" :key="item.agentId" :value="item.agentId">天启计划-{{item.agentName}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="info" @click="handleSubmit('formValidate')" style="width:180px">保存</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px;width:180px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "memberEdit",
  data() {
    return {
      list: [],
      formValidate: {
        id:'',
        mobile: "",
        agentId: "",
        agentName:''
      },
      ruleCustom: {
        mobile: [{required: true, validator: "承兑商不能为空", trigger: "blur" }],
        agentId: [{required: true, validator: "承兑商角色不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
            let obj = {}
            obj.id = this.formValidate.id;
            obj.agentId = this.formValidate.agentId;
            this.list.forEach(item=>{
                if(item.agentId == this.formValidate.agentId){
                    obj.agentName = item.agentName;
                }
            })
          console.log(obj)
          this.$axios.post('/api/userAgent/update',obj).then(res=>{
              if(res.data.code == 100){
                  this.$Message.success('修改成功！')
                  this.$router.go(-1)
              }else{
                  this.$Message.error(res.data.msg)
              }
          })
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.$router.go(-1)
    },
     getAgent() {
      this.$axios.post("/api/agent/listAgent").then(res => {
        this.list = res.data.data;
        this.list.unshift({
            agentId:'0',
            agentName:'普通承兑商'
        })
      });
    },
  },
  mounted() {
      this.getAgent();
      this.formValidate.id = this.$route.query.id;
      this.formValidate.agentId = this.$route.query.agentId;
      this.formValidate.mobile = this.$route.query.mobile;
      console.log(this.formValidate)
  }
};
</script>
<style>
</style>