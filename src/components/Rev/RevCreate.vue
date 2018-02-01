<template lang="html">
  <div>
    <headermenu></headermenu>
    <alert :show="alertStatus" :message="alertMessage" :type='alertType' :onClose="hideAlert"></alert>

    <div class="container">
      <form v-on:submit="formSubmit($event)">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" name="name" v-model="rev.name" required />
        </div>

        <div class="clearfix"></div>
        <div class="row">
          <div class="col-md-12 form-group">
            <button type="submit" class="btn btn-primary">Create</button>
            <button type="button" v-on:click="cancel()" class="btn btn-danger">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../HeaderMenu/HeaderMenu.vue'
import api from '../../api'
import Alert from '../utils/Alert.vue'

export default {
  data: function () {
    return {
      rev: {
        name: ''
      },
      alertMessage: '',
      alertType: '',
      alertStatus: false
    }
  },

  components: {
    'headermenu': HeaderMenu,
    'alert': Alert
  },

  methods: {
    showAlert: function (type, message) {
      this.alertStatus = true
      this.alertMessage = message
      this.alertType = type

      console.log('Showing alert')
    },

    hideAlert: function () {
      this.alertStatus = false
      this.alertMessage = ''
    },
    formSubmit: function (e) {
      e.preventDefault()
      let token = this.$parent.getToken()
      let organizationId = this.$parent.getOrganizationId()
      console.log(token)

      api.Rev.create(token, organizationId, this.rev)
      .then((response) => {
        console.log('Response')
        console.log(response.data)
        this.$router.push('/stream')
        this.showAlert('success', 'Rev ' + response.data.name + ' saved')
      })
      .catch((err) => {
        console.log(err)
        this.showAlert('error', err.message)
      })
    },

    cancel () {

    }
  }
}
</script>

<style lang="less">
</style>
