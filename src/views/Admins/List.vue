<template>
  <div class="grid-layout">
    <FilterBar class="header">
      <el-form :inline="true" size="small">
        <el-form-item label="关键词">
          <el-input
            placeholder="请输入关键词"
            v-model="filter.title"
            @blur="getDataList"
            @keyup.native="getDataListDebounce"
            @keyup.native.enter="getDataList"
            :clearable="true"
            @clear="getDataList"
          ></el-input>
        </el-form-item>
      </el-form>
    </FilterBar>
    <div class="action-bar">
      <el-button type="primary" @click="$router.push(`/${moduleName}/add`)">新增</el-button>
    </div>
    <div class="grid">
      <el-table style="height:100%;" :data="dataList" v-loading="isDataLoading">
        <el-table-column fixed type="index" width="50"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="username" label="用户名" min-width="150"></el-table-column>
        <el-table-column prop="role" label="角色" min-width="150"></el-table-column>
        <el-table-column prop="createAt" label="创建日期" min-width="150"></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="100"
          class-name="controls"
        >
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view"></el-button>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="editData(scope.row.id)"
            ></el-button>
            <el-button
              @click="deleteData(scope.row.id)"
              type="text"
              icon="el-icon-delete"
              class="text-danger"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div class="col"></div>
      <div class="col text-right">
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :total="dataRecords"
          :page-size.sync="pageSize"
          :current-page.sync="pageIndex"
          v-loading="isDataLoading"
          @current-change="getDataList"
          @size-change="getDataList"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import FilterBar from '@/components/FilterBar.vue';
import DataList from '@/components/DataList.vue';

export default {
  components: {
    FilterBar,
  },
  extends: DataList,
  data() {
    return {
      filter: {
        title: '',
        category: '',
      },
      moduleName: 'admins',
      moduleTitle: '管理员',
    };
  },
};
</script>
<style lang="scss" scoped>
.prices {
  display: flex;
  .price {
    width: 25%;
  }
}
</style>
