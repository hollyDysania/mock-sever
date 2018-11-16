<template>
  <div>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 表格分页筛选查询</span>
        <i-table></i-table>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-sort
"></i> 登录登出获取登录人信息</span>
        <i-login></i-login>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ITable from '@/components/table/i-table'
import ILogin from '@/components/login/'
export default {
  components: {
    ITable,
    ILogin
  },
  methods: {}
}
</script>

