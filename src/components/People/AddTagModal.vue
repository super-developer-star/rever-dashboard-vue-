<template>
  <div>
    <modal
      :title="'Add Tags to ' + title"
      effect="zoom"
      width="400"
      :value="show"
      @cancel="onCancel"
      cancel-text="Cancel"
      ok-text="Add Tags"
      :callback="onSubmit"
    >
      <div slot="modal-body" class="modal-body">
        <p>Tags assigned</p>
        <Multiselect
          v-model="tagList"
          :options="allTags"
          :multiple="true"
          :close-on-select="true"
          :hide-selected="true"
          placeholder="Type New Tag"
          label="name"
          track-by="name"
        >
          <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
        </Multiselect>
      </div>
    </modal>
  </div>
</template>

<script>
import VStrap from 'vue-strap'
import Multiselect from '../utils/Multi-Select/Multiselect.vue'
import mixin from '../../mixins/mixin.vue'
import api from '../../api'

export default {
  name: 'AddTagModal',
  components: {
    'modal': VStrap.modal,
    'Multiselect': Multiselect
  },
  mixins: [mixin],
  props: {
    show: Boolean,
    item: Object,
    onCancel: Function
  },
  data: function () {
    return {
      title: null,
      tagList: [],
      allTags: []
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.update()
        this.getTags()
      }
    }
  },
  methods: {
    getTags: function () {
      const organizationId = this.getOrganizationId()
      return api.organization.getTags(organizationId)
        .then((response) => {
          if (response.data) {
            this.allTags = response.data
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSubmit: function () {
      let that = this
      let data = {
        tags: this.tagList
      }

      return api.account.update(that.item.organization, that.item.id, data)
        .then((response) => {
          console.log(response.data)
          that.item.tags = that.tagList
          this.onCancel()
          return response.data
        })
        .catch((err) => {
          console.log(err)
          this.onCancel()
        })
    },
    update: function () {
      if (this.item.displayname && this.item.familyname) {
        this.title = this.item.displayname + ' ' + this.item.familyname
      }
      else {
        this.title = this.item.email
      }

      this.tagList = []
      this.item.tags.forEach((result) => {
        this.tagList.push(result)
      })
    }
  }
}
</script>

<style lang="less">
  @import '../../styleConfig.less';
</style>
