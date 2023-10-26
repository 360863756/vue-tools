import { MockMethod } from 'vite-plugin-mock'
import pkg from 'mockjs';
const { mock } = pkg;

const data = mock({
    "promissionList":[{
        path:"/"
    }]
})

export default [
    {
      url: "/api/getPromissionList",
      method: "get",
      response: () => {
        return {
            status: 200,
            message: '查询成功',
            data
        };
      }
    }
  ] as MockMethod[];