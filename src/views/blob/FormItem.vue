<template>
  <el-form-item :label="label" :prop="prop">
    <component :is="currentComponent"></component>
  </el-form-item>
</template>

<script setup lang="tsx">
import { h, ref, watch, computed } from 'vue'
import { ElInput, ElSelect, ElDatePicker } from 'element-plus'

const props = defineProps({
  type: {
    type: String,
    default: 'input',
    validator: (type: string) => ['input', 'select', 'date-picker'].includes(type)
  },
  label: String,
  prop: String,
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

const updateValue = (value) => {  
  if (localValue.value === value) return
  localValue.value = value;
  emit('update:modelValue', value);
}

const currentComponent = computed(() => {
  switch (props.type) {
    case 'input':
      return (props) => h(ElInput, { modelValue: localValue.value, 'onUpdate:modelValue': updateValue, ...props });
    case 'select':
      return (props) => h(ElSelect, { ...props, ...props.componentProps, modelValue: localValue.value, 'onUpdate:modelValue': updateValue });
    case 'date-picker':
      return (props) => h(ElDatePicker, { ...props, ...props.componentProps, modelValue: localValue.value, 'onUpdate:modelValue': updateValue });
    default:
      return () => null;
  }
});
</script>
