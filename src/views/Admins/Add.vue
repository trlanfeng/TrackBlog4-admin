<template>
  <div class="add-dialog">
    <el-form :model="form" :rules="rules" label-width="80px" ref="form">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item prop="passwordConfirm" label="确认密码">
        <el-input v-model="form.passwordConfirm"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      moduleName: 'admins',
      moduleTitle: '管理员',
      isEditMode: false,
      id: 0,
      form: {
        username: 0,
        password: 0,
        passwordConfirm: 0,
      },
      rules: {
        username: {
          required: true,
          type: 'string',
          message: '请输入用户名',
          trigger: 'change',
        },
        password: {
          required: true,
          type: 'string',
          message: '请输入密码',
          trigger: 'change',
        },
        passwordConfirm: {
          required: true,
          type: 'string',
          message: '请输入确认密码',
          trigger: 'change',
        },
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const result = await this.$refs.form.validate();
        if (!result || this.form.password !== this.form.passwordConfirm) return;
        if (this.isEditMode) {
          await this.$http.put(
            `/api/${this.moduleName}/${this.id}`,
            this.form,
          );
          this.$message.success('更新成功');
        } else {
          window.console.log('TCL: submitForm -> this.form', this.form);
          await this.$http.post(`/api/${this.moduleName}/`, this.form);
          this.$message.success('新增成功');
        }
        this.$router.push({ name: this.moduleName });
      } catch (e) {
        this.$httpErrorHandle(this, e);
      }
    },
    async GetData(id) {
      try {
        const res = await this.$http.get(
          `/api/${this.moduleName}/${id}`,
        );
        this.form = res.data;
      } catch (e) {
        this.$httpErrorHandle(this, e);
      }
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.isEditMode = !!this.id;
    if (this.isEditMode) {
      this.GetData(this.id);
    }
  },
};
</script>
<style lang="scss" scoped>
.mr10 {
  margin-right: 10px;
}
.mb10 {
  margin-bottom: 10px;
}
.area_price {
  line-height: normal;
}
</style>
