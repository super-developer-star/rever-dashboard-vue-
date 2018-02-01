<template lang="html">
  <modal
    :title="data.title"
    :value="data.show"
    @ok="onAction"
    :ok-text="actionLabel"
    @cancel="onCancel">
    {{ data.text }}
  </modal>
</template>

<script>
import { modal } from 'vue-strap'

export default {
  components: {
    'modal': modal
  },

  computed: {
    actionLabel: function () {
      return this.data.actionLabel ? this.data.actionLabel : 'OK'
    }
  },

  methods: {
    onAction: function () {
      if (typeof this.data.onAction === 'function') {
        this.data.onAction()
      } else {
        this.data.onCancel()
      }
    },

    onCancel: function () {
      console.log('Executing cancel')
      this.data.show = false
    }
  },

  props: ['data']
}
</script>

<style lang="css">
</style>
