<template>
  <div class="add-dialog">
    <el-form :model="form" :rules="rules" label-width="80px" ref="form">
      <el-row>
        <el-col :span="6">
          <el-form-item prop="publishedAt" label="发布日期">
            <el-date-picker
              v-model="form.publishedAt"
              type="date"
              placeholder="请选择"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="title" label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="描述">
        <el-input rows="3" type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item prop="cover" label="封面图片">
        <el-upload
          :action="$qiniuConfig.action"
          :show-file-list="false"
          :data="{token:uploadToken}"
          :before-upload="beforeUpload"
          :on-success="coverUploaded"
        >
          <img v-if="form.cover" :src="form.cover.url" class="avatar" />
          <el-button v-else size="small" type="primary">点击上传</el-button>
        </el-upload>
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
      moduleName: 'tags',
      moduleTitle: '标签',
      isEditMode: false,
      id: 0,
      form: {
        title: '',
        description: '',
        cover: '',
        publishedAt: '',
      },
      uploadToken: '',
      rules: {
        title: {
          required: true,
          type: 'string',
          message: '请输入标题',
          trigger: 'change',
        },
      },
    };
  },
  methods: {
    coverUploaded(res) {
      this.form.cover = res;
    },
    async beforeUpload() {
      this.uploadToken = await this.$qiniuToken();
    },
    async submitForm() {
      try {
        const result = await this.$refs.form.validate();
        if (!result) return;
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
        this.$router.push({ name: 'products' });
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

</style>
