<template lang="html">
  <div>
    <div :class="backgroundImageClass" class="wrapper-error">
      <div class="col-lg-6 col-lg-offset-3 margin-top-50">
        <img class="login-img" src="static/assets/images/logo.svg" />
        <h1 class="white-text">
          The page you're looking for does not exist. Maybe in another universe does
        </h1>
        <div class="margin-top-50"></div>
        <a href="/stream" class="btn btn-lg btn-primary">Go back to the Stream</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error404',
  data () {
    return {
      backgroundImageClass: 'wrapper-img1'
    }
  },

  mounted () {
    this.$parent.hideLoader()
  }
}
</script>

<style lang="css">
  .wrapper-error {
    position: fixed;
    top:0px;
    right:0px;
    left:0px;
    bottom:0px;
    margin: 0px;
    background-position: center;
    background-size: cover;
    overflow: auto;
  }

  .wrapper-img1 {
    background-image: url("/static/assets/images/IMA01.png") ;
  }

  .wrapper-img2 {
    background-image: url("/static/assets/images/IMA02.png") ;
  }
</style>
