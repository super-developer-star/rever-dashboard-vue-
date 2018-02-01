<template lang="html">
  <div>
    <headermenu></headermenu>
    <div class="container padding-top-20">
      <div class="col-sm-4 challenger-left-side">
        <h3>CREATE NEW CHALLENGE</h3>
        <div class="col-lg-12">
          <p>PICK A DATE</p>
          <PickDate class="col-lg-12"></PickDate>
        </div>
        <div class="col-lg-12">
          <p>REWARDS CHALLENGE</p>
        </div>
        <div class="clear"></div>
      </div>
      <div class="col-sm-8 challenger-right-side pull-right">
        Content here
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../HeaderMenu/HeaderMenu.vue'
import PickDate from '../Challenger/PickDate.vue'

export default {
  name: 'challenger',
  components: {
    'headermenu': HeaderMenu,
    'PickDate': PickDate
  }
}
</script>

<style scoped lang="less">
  @import '../../styleConfig.less';

  .challenger-left-side {
    background-color: @sidebar-blue;
    color: @white-font;
    height: 500px;
  }

  .challenger-right-side {

  }
</style>
