<template>
  <div>
    <!-- 筛选 -->
    <div class="filter-container">
      <el-input placeholder="请输入标题" v-model.trim="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.importance" placeholder="请选择重要性" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.type" placeholder="请选择类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.timestamp">{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" min-width="150">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.title }}</span>
          <el-tag>{{ scope.row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重要性">
        <template slot-scope="scope">
          <i class="el-icon-star-on" v-for="n in +scope.row.importance"></i>
          <!-- <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/> -->
        </template>
      </el-table-column>
      <el-table-column label="阅读数" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.pageviews" class="link-type" @click="handleFetchPv(scope.row.pageviews)">{{ scope.row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})
export default {
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      sortOptions: [
        { label: '正序', key: '+id' },
        { label: '倒序', key: '-id' }
      ],
      calendarTypeOptions,
      // 重要性下拉选
      importanceOptions: [
        { label: '3星', key: 3 },
        { label: '2星', key: 2 },
        { label: '1星', key: 1 }
      ],
      // 表格数据
      list: [],
      // 数据总条数
      total: 0,
      // 所有筛选条件
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
    }
  },
  created() {
    this.getList()
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  methods: {
    getList() {
      let url = '/article/list'
      let params = this.listQuery
      this.$http.get(url, { params }).then(res => {
        console.log('--- 返回数据如下 ↓ ---')
        console.log(res)
        this.list = res.data.items
        this.total = res.data.total
      })
    },
    // 查询
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-container{
  margin: 20px 0;
}
</style>


