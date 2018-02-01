<template lang="html">
  <div v-if="status" class="loader">
    <svg class="circular" viewBox="25 25 50 50">
      <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
    </svg>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: false
    }
  },
  methods: {
    hide: function () {
      this.status = false
    },
    show: function () {
      this.status = true
    }
  }
}
</script>

<style lang="css">
  .loader {
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -50px 0px 0px -50px;
  }
</style>
