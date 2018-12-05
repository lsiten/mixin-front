<template>
  <div class="lsiten-content">
    <x-table>
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t('components.home.table.domain') }}</th>
          <th>{{ $t('components.home.table.cost') }}</th>
          <th>{{ $t('components.home.table.status') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in domains" :key="index">
          <td>{{(index + 1)}}</td>
          <td>{{item.domain}}</td>
          <td>{{item.cost}}</td>
          <td><span class="lsiten-click-able">{{ $t('components.home.wantBuy') }}</span></td>
        </tr>
      </tbody>
    </x-table>
  </div>
</template>
<script>
import {XTable} from 'vux'

export default {
  name: 'order-index',
  components: {
    XTable
  }
}
</script>

<style lang="less" scoped>
.lsiten-content {
  padding: 10px;
}
</style>

