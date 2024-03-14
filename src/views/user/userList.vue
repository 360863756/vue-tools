<script setup lang="ts">
import { watchEffect, ref, type Ref } from 'vue'
import { usePromission } from '@/stores/promission'
import { useFetch } from '@/hooks/useFetch'
import type { IRquestReturnData } from '@/types/request'
import type { TableColumnInstance } from "element-plus"
const { changePermCode } = usePromission()

const { data } = useFetch('/api/auth/getUserList')

const userList: Ref<IRquestReturnData[]> = ref([])

watchEffect(() => {
  userList.value = data.value || []
})

changePermCode()

function showDetail(scope: TableColumnInstance){
  console.log(scope)
}
</script>

<template>
  <el-table :data="userList" style="width: 100%">
    <el-table-column prop="username" label="Name" width="180" />
    <el-table-column prop="createdAt" label="created" width="180" />
    <el-table-colum  label="操作" >
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="showDetail(scope.row)"
          >
            查看详情
          </el-button>
        </template>
    </el-table-colum>
  </el-table>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
