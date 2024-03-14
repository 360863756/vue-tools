<template>
  <div>{{ loading }}</div>
  <el-table :data="data?.promissionList" :loading="loading">
    <el-table-column prop="path" label="path" />
  </el-table>
  <el-pagination ></el-pagination>
  <search-form :searchForm="searchFormData" :fields="searchFields" @search="doSearch" />
</template>
<script lang="tsx" setup>
import { reactive } from 'vue';
import SearchForm from './SearchForm.vue';

const searchFormData = reactive({
  keyword: '',
  category: null,
  startDate: null,
  endDate: null
});

const searchFields = [
   {
    type: 'input',
    label: '关键字',
    prop: 'keyword'
   }
];

const doSearch = searchData => {
  console.log('执行搜索，搜索数据为:', searchData);
};

</script>
