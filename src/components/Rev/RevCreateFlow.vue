<template lang="html">
  <div>
    <headermenu />

    <div class="rev-create">
      <RevCreateSidebar :steps="steps" :activeStep="activeStep" @onChange="onChangeStep" />
      <div class="rev-create_main">
        <RevCreateMain />
        <div :is="activeStep" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../HeaderMenu/HeaderMenu.vue'
import RevCreateSidebar from './RevCreateSidebar'
import RevCreateMain from './RevCreateMain'

import RevCreateRelate from '../RevCreate/RevCreateRelate'
import RevCreateExperiment from '../RevCreate/RevCreateExperiment'
import RevCreateValidate from '../RevCreate/RevCreateValidate'
import RevCreateExpand from '../RevCreate/RevCreateExpand'
import RevCreateReview from '../RevCreate/RevCreateReview'

export default {
  components: {
    headermenu: HeaderMenu,
    RevCreateSidebar: RevCreateSidebar,
    RevCreateMain: RevCreateMain,

    RevCreateRelate: RevCreateRelate,
    RevCreateExperiment: RevCreateExperiment,
    RevCreateValidate: RevCreateValidate,
    RevCreateExpand: RevCreateExpand,
    RevCreateReview: RevCreateReview
  },
  data: () => {
    return {
      steps: [{
        key: 'RevCreateRelate',
        label: 'Relate'
      }, {
        key: 'RevCreateExperiment',
        label: 'Experiment'
      }, {
        key: 'RevCreateValidate',
        label: 'Validate'
      }, {
        key: 'RevCreateExpand',
        label: 'Expand'
      }, {
        key: 'RevCreateReview',
        label: 'Review'
      }],
      activeStep: 'RevCreateRelate'
    }
  },
  methods: {
    onChangeStep (newStep) {
      this.activeStep = newStep.key
    }
  }
}
</script>

<style lang="less">
  @import '../../styleConfig.less';

  .rev-create {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;

    height: calc(~"100vh - 90px");

    &_sidebar {
      width: 20em;
    }

    &_main {
      flex: 1;
    }
  }

  .rev-create_block {
    padding: 2rem 4rem;

    &_title {
      text-transform: uppercase;
      font-size: 3rem;
      color: @gray-dark;
      font-weight: 700;
    }
  }
</style>
