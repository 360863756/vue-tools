<script lang="ts" setup>
import bgImage from '@/assets/img/bgImage.jpeg'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import { useMouse } from '@vueuse/core'
import { reactive, watch } from 'vue'
import type { FormRules } from 'element-plus'
import { useLogin } from './hooks/useLogin'
import { UserInfoInterface } from './types'

const { userInfo, login, error } = useLogin()
watch(error, (value) => {
  value && ElMessage(value)
})

const { x, y } = useMouse()

const rules = reactive<FormRules<UserInfoInterface>>({
  username: [{ required: true, message: 'Please input username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
})
</script>

<template>
  <div class="h-full w-full fixed">
    <div class="h-full w-full flex justify-center items-center">
      <img class="object-cover" :src="bgImage" alt="" />
    </div>
    <div>{{ x }},{{ y }}</div>
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 bg-transparent"
    >
      <el-form :model="userInfo" :rules="rules" label-width="120px">
        <el-form-item label="username" prop="username">
          <el-input v-model="userInfo.username" />
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="userInfo.password" />
        </el-form-item>
        <el-button type="primary" @click="login"> login </el-button>
      </el-form>
    </div>
  </div>
</template>
