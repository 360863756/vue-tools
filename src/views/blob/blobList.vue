<template>
  <search-form :search-data="searchFormData" @change="changeFormData" :fields="searchFields" @search="onSearch" >
    <template #default>
      <el-button type="primary"  @click="onSearch">搜索</el-button>
    </template>
  </search-form>
</template>
<script lang="tsx" setup>
import { h, reactive } from 'vue';
import SearchForm from './SearchForm.vue';
import { ElInput } from 'element-plus'

let searchFormData = reactive({
  keyword: '',
  category: null,
  date: null
});

const searchFields = [
   {
    type: 'input',
    label: '关键字',
    prop: 'keyword',
    col: 3,
    formItemRender: () => h(ElInput, {
      modelValue: searchFormData.keyword,
      'onUpdate:modelValue': (value) => {
        searchFormData.keyword = value;
      },
      onChange: (value) => {
        console.log(value)
      }
    })
   },
   {
    type: 'date-picker',
    label: '日期',
    prop: 'date',
    col: 4,
    componentProps: {
      format: 'YYYY-MM-DD'
    }
   }
];

const onSearch = () => {
  console.log('执行搜索，搜索数据为:', searchFormData);
};

const changeFormData = (data) => {
  searchFormData = data;
}

</script>
