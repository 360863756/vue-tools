<template>
  <el-form v-model="localValue" @submit.prevent="onSearch">
      <el-row>
        <template v-for="field in fields"  :key="field.prop">
          <el-col v-if="!field.formItemRender" :span="field.col || 6">
          <FormItem
            :type="field.type"
            :label="field.label"
            :prop="field.prop"
            :model-value="localValue[field.prop]"
            @update:model-value="(value) => updateFormField(field.prop, value)"
            :component-props="field.componentProps"
          />
          </el-col>
          <el-col v-else :span="field.col || 6">
            <el-form-item :label="field.label" :prop="field.prop">
              <component :is="field.formItemRender"></component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    <slot>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>

<script setup lang="tsx">
import { ref, defineProps, defineEmits } from 'vue'
import FormItem from './FormItem.vue'

const props = defineProps({
  searchData: Object,
  fields: Array
})

const emit = defineEmits(['change', 'search', 'reset'])

const localValue = ref({ ...props.searchData })

const updateFormField = (prop, value) => {
  if(localValue.value[prop] === value) return
  localValue.value[prop] = value;
  emit('change', localValue.value)
}

const onSearch = () => {
  emit('search', localValue.value)
}

const onReset = () => {
  emit('reset', localValue.value)
}
</script>
