<template>
  <el-form-item :label="label" :prop="prop" :rules="rules">
    {{ currentComponent() }}
    <component :is="currentComponent()"></component>
  </el-form-item>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElInput, ElSelect, ElDatePicker } from 'element-plus'

const props = defineProps({
  type: {
    type: String,
    default: 'input',
    validator: (type) => ['input', 'select', 'date-picker'].includes(type)
  },
  label: String,
  prop: String,
  rules: Array,
  modelValue: [String, Number, Array, Date, Object],
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== localValue.value) {
      localValue.value = newValue
    }
  }
)

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue)
})

// const componentMapping = {
//   input: ElInput,
//   select: ElSelect,
//   'date-picker': ElDatePicker
// }

const currentComponent = () => {
  switch (props.type) {
    case 'input':
      return (props) => <ElInput {...props} onChange={() => {
            console.log(1)
    }} />
    case 'select':
      return (props) => <ElSelect {...props} />
    case 'date-picker':
      return (props) => <ElDatePicker {...props} />
    default:
      return () => null;
  }
}
</script>
