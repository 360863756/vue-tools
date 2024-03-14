<template>
  <el-form :model="searchForm" @submit.native.prevent="onSearch">
    <filter-component
      v-for="field in fields"
      :key="field.prop"
      :type="field.type"
      :label="field.label"
      :prop="field.prop"
      :rules="field.rules"
      :model-value="searchForm[field.prop]"
      @update:model-value="(value) => updateFormField(field.prop, value)"
      :component-props="field.componentProps"
    />
    <el-form-item>
      <el-button type="primary" @click="onSearch">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import FilterComponent from './FilterComponent.vue'

const props = defineProps({
  searchForm: Object,
  fields: Array
})

const emit = defineEmits(['update:searchForm', 'search'])

const updateFormField = (prop, value) => {
  emit('update:searchForm', { ...props.searchForm, [prop]: value })
}

const onSearch = () => {
  emit('search', props.searchForm)
}
</script>
