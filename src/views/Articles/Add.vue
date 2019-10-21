<template>
  <div class="add-dialog">
    <el-form :model="form" :rules="rules" label-width="80px" ref="form">
      <el-row>
        <el-col :span="6">
          <el-form-item prop="category" label="分类">
            <el-select v-model="form.category">
              <el-option
                v-for="item in categoriesList"
                :key="item.id"
                :value="item.id"
                :label="item.title"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="series" label="系列">
            <el-select v-model="form.series" multiple>
              <el-option
                v-for="item in seriesList"
                :key="item.id"
                :value="item.id"
                :label="item.title"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
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
      <el-form-item prop="content" label="内容">
        <el-input :autosize="{minRows:10}" type="textarea" v-model="form.content"></el-input>
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
      <el-form-item prop="tags" label="标签">
        <el-select
          v-model="form.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in tagsList"
            :key="item.id"
            :value="item.id"
            :label="item.title"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(true)">提交</el-button>
        <el-button type="success" plain @click="submitForm(false)">存草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      moduleName: 'articles',
      moduleTitle: '文章',
      isEditMode: false,
      id: 0,
      categoriesList: [],
      tagsList: [],
      seriesList: [],
      form: {
        category: '',
        title: '',
        content: '',
        cover: '',
        publishedAt: '',
        isDraft: false,
        tags: [],
        series: [],
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
    async getAdditionalData() {
      try {
        const series = await this.$http.get('/api/series');
        this.seriesList = series.data.list;
        const categories = await this.$http.get('/api/categories');
        this.categoriesList = categories.data.list;
        const tags = await this.$http.get('/api/tags');
        this.tagsList = tags.data.list;
      } catch (e) {
        this.$httpErrorHandle(this, e);
      }
    },
    coverUploaded(res) {
      this.form.cover = res;
    },
    async beforeUpload() {
      this.uploadToken = await this.$qiniuToken();
    },
    async submitForm(isDraft = false) {
      this.form.isDraft = isDraft;
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
        this.form.category = this.form.category.id;
        this.form.series = this.form.series.map(item => item.id);
        this.form.tags = this.form.tags.map(item => item.id);
      } catch (e) {
        this.$httpErrorHandle(this, e);
      }
    },
  },
  mounted() {
    this.getAdditionalData();
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
