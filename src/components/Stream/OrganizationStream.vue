<template lang="html">
  <div>
    <headermenu></headermenu>
    <stream-header title="Revstream"></stream-header>
    <stream streamType="organization" :token="getToken()" :loader="getLoader()"></stream>
  </div>
</template>

<script>
import Stream from './Stream.vue'
import HeaderMenu from '../HeaderMenu/HeaderMenu.vue'
import StreamHeader from './StreamHeader.vue'

export default {
  name: 'userStream',

  components: {
    'headermenu': HeaderMenu,
    'stream': Stream,
    'stream-header': StreamHeader
  },

  methods: {
    getToken () {
      return this.$parent.getToken()
    },

    getLoader () {
      return this.$parent.getLoader()
    }
  }
}
</script>

<style lang="less">
@import '../../styleConfig.less';
</style>
