<template lang="html">
  <div v-if="data.status === true">
    <alert :show.sync="showTop" placement="top" duration="3000" :type="data.type" width="400px" >
      <button type="button" class="close" @click="onClose">
        <span>&times;</span>
      </button>
      <span class="icon-ok-circled alert-icon-float-left"></span>
      <p>{{ data.message }}</p>
    </alert>
  </div>
</template>

<script>
import { alert } from 'vue-strap'

export default {
  components: {
    'alert': alert
  },

  data: function () {
    return {
      showTop: 'Hello'
    }
  },

  methods: {
    onClose: function () {
      this.data.status = false
    }
  },

  props: ['data']
}
</script>

<style lang="css">
</style>
