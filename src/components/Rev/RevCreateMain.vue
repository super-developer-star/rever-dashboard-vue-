<template lang="html">
  <div class="rev-create_main">
		<RevCreateHeader />
  </div>
</template>

<script>
import RevCreateHeader from './RevCreateHeader.vue'
import RevCreateBody from './RevCreateBody.vue'

export default {
  components: {
    RevCreateHeader: RevCreateHeader,
    RevCreateBody: RevCreateBody
  }
}
</script>

<style lang="less">
	@import '../../styleConfig.less';

</style>
