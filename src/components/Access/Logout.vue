<template>
  <div></div>
</template>

<script>
export default {
  name: 'logout',

  created () {
    this.$localStorage.remove('token')
    this.$store.dispatch('logout')
    this.$root.$router.push('/access')
  }
}
</script>
