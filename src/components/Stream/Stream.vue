<template lang="html">
  <div>
    <alert :data="alertData"></alert>
    <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
      <div class="margin-top"></div>
      <div>
        <waterfall
          :line-gap="250"
          :min-line-gap="250"
          :max-line-gap="300"
          :watch="stream"
        >
          <waterfall-slot
            v-for="(item, index) in stream"
            :width="item.width"
            :height="item.height"
            :order="index"
            :key="item._id"
          >
            <rev class="item" :rev="item"></rev>
          </waterfall-slot>
        </waterfall>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import HeaderMenu from '../HeaderMenu/HeaderMenu.vue'
import PageTitle from '../PageTitle/PageTitle.vue'
import Rev from '../Rev/Rev.vue'
import Alert from '../utils/Alert2.vue'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import infiniteScroll from 'vue-infinite-scroll'
import processRevStreamItems from '../lib/processRevStreamItems.js'

export default {
  name: 'stream',

  data: function () {
    return {
      alertData: {
        status: false,
        type: '',
        message: ''
      },
      lastCursor: null,
      stream: []
    }
  },

  props: ['streamType', 'token', 'loader'],

  components: {
    'headermenu': HeaderMenu,
    'page-title': PageTitle,
    'rev': Rev,
    'alert': Alert,
    'waterfall': Waterfall,
    'waterfall-slot': WaterfallSlot,
    'infiniteScroll': infiniteScroll
  },

  methods: {
    showAlert: function (type, message) {
      this.alertData = {
        type: type,
        message: message,
        status: true
      }

      setTimeout(this.hideAlert, 5000)
    },

    hideAlert: function () {
      this.alertData = {
        type: '',
        message: '',
        status: false
      }
    },

    loadMore: function () {
      this.getStream(this.lastCursor)
    },

    getStream: function (startAfter) {
      this.busy = true
      this.loader.show()

      var query
      if (this.streamType === 'user') {
        query = api.stream.getUserStream(startAfter)
      }
      else if (this.streamType === 'organization') {
        query = api.stream.getOrganizationStream(startAfter)
      }
      else {
        throw new Error('Stream type is not valid')
      }

      query
      .then(this.processResults)
      .catch(this.handleError)
    },

    processResults: function (response) {
      this.loader.hide()
      this.busy = false

      // always keep the last cursor if there's no new data
      this.lastCursor = response.data.lastCursor ? response.data.lastCursor : this.lastCursor

      if (response.data.results) {
        let items = processRevStreamItems(response.data.results)
        items.forEach((item) => {
          this.stream.push(item)
        })
      }
      else {
        this.showAlert('info', 'No more revs found')
      }
    },

    handleError: function (err) {
      console.log(err)
      this.busy = false
      this.loader.hide()
    }
  }
}
</script>

<style lang="less">
@import '../../styleConfig.less';
  .margin-top {
    margin-top: 20px;
  }

  .item {
    position: absolute;
    top: 5px;
    left: 10px;
    right: 10px;
    bottom: 5px;
  }

  .item:after {
    content: attr(index);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
</style>
