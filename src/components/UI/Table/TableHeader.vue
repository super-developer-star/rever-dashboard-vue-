<template lang="html">
  <thead class="rever-table-header">
    <tr>
      <th v-for="header in tableData" @click="onClickHeader(header)" v-bind:class="{'-sortable': header.isSortable}">
        <span v-if="header.sortedBy !== null">
          {{header.sortedBy ? 'V' : 'A'}}
        </span>

        {{header.label}}
      </th>
    </tr>
  </thead>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'table-header',
  props: ['headers', 'tableStatus'],

  computed: {
    tableData () {
      return _.map(this.headers, (header, headerKey) => {
        const label = _.get(header, 'label', header)

        return {
          id: headerKey,
          label: label,
          isSortable: _.get(header, 'isSortable', false),
          sortedBy: this.tableStatus.sortBy === headerKey ? this.tableStatus.ascendingSort : null
        }
      })
    }
  },

  methods: {
    onClickHeader (header) {
      if (header.isSortable) {
        this.$emit('onChangeStatus', _.merge({}, this.tableStatus, {
          sortBy: header.id,
          ascendingSort: this.tableStatus.sortBy === header.id ? !this.tableStatus.ascendingSort : true
        }))
      }
    }
  }
}
</script>

<style lang="less">
  @import '../../../styleConfig.less';

  .rever-table th {
    padding: 2rem 1.5rem !important;
    border: 0 !important;
    font-size: 12px;
    text-align: center;
  }

  .rever-table td {
    padding: 1em 1em 0.25em !important;
    border: 0 !important;
  }

  .rever-table td {
    border-left: 2px solid #ecf0f0 !important;
  }

  .rever-table-header {
    background: @gray;
    color: @gray-dark;
    text-transform: uppercase;
  }

  .rever-table-header td.-sortable {
    cursor: pointer;
  }

  .rever-table-body {
    color: @gray-dark;
  }
  .rever-table-body tr:nth-child(odd) {
    background: @gray-light-highlight;
  }

  .rever-table-body tr:nth-child(even) {
    background: #FFF;
  }
</style>
