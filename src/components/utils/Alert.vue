<template lang="html">
  <div v-if='show'>
    <alert v-if="type === 'error'" placement="top" type="danger" width="400px">
      <button v-on:click="onClose">X</button>
      <div><strong>Error</strong></div>
      <p>{{ message }}</p>
    </alert>
    <alert v-if="type === 'success'" placement="top" type="success" width="400px">
      <button v-on:click="onClose">X</button>
      <div><strong>Success</strong></div>
      <p>{{ message }}</p>
    </alert>
  </div>
</template>

<script>
import { alert } from 'vue-strap'

export default {
  components: {
    'alert': alert
  },
  props: ['show', 'onClose', 'message', 'type']
}
</script>

<style lang="css">
</style>
