import { reactive, ref } from 'vue'
import router from '@/router'
import { UserInfoInterface } from '../types'
import request from '@/utils/request'
import { useAxios } from '@vueuse/integrations/useAxios'


export function useLogin() {
  // 创建响应式的变量
  const userInfo = reactive<UserInfoInterface>({
    username: '',
    password: ''
  })
  const error = ref<null | string>(null)

  // 处理登录逻辑
  async function login() {
    error.value = null

    try {

      const { response, error } = await useAxios('/api/auth/login', {
        method: 'POST',
        data: {
          username: userInfo.username,
          password: userInfo.password
        }
      }, request)
      console.log(response,"12312")
      if (!error && response.ok) {
        router.push({
          path:"/aa"
        })
      } else {
        error.value = '登录失败，请检查用户名和密码'
      }
    } catch (e) {

      error.value = '登录失败，请检查网络连接'
    }
  }

  return {
    userInfo,
    error,
    login
  }
}