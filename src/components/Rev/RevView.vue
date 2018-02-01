<template lang="html">
  <div>
    <headermenu></headermenu>
    <alert :show="alertStatus" :message="alertMessage" :type='alertType' :onClose="hideAlert"></alert>
    <div v-if="rev" class="rev-wrapper">
      <div class="rev-header">
        <div class="container">
          <div class="col-lg-12">
            <h1 class="revTitle">{{ rev.name }}</h1>
          </div>
        </div>
      </div>
      <div class="container padding-top-20">
        <div class="col-lg-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Relate</h3>
            </div>
            <div class="panel-body">
              <div v-if="rev.cycle" class="rev-relate row">
                <div class="col-lg-6">
                  <div class="rev-questions">
                    <h3>What's the problem?</h3>
                    <p>{{ rev.cycle.relateProblem }}</p>

                    <h3>What's the idea?</h3>
                    <p>{{ rev.cycle.relateIdea }}</p>

                    <h3>What's the solution?</h3>
                    <p>{{ rev.cycle.relateResult }}</p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="rev-photo">
                    <img v-bind:src="rev.cycle.relatePhotoPath" width="300" >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Experiment</h3>
            </div>
            <div class="panel-body">
              <div v-if="rev.cycle" class="rev-experiment row">
                <div class="col-lg-6">
                  <div class="rev-questions">
                    <h3>What did you do?</h3>
                    <p>{{ rev.cycle.experimentDone }}</p>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="rev-photo">
                    <img v-bind:src="rev.cycle.experimentPhotoPath" width="300" >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Verify</h3>
            </div>
            <div class="panel-body">
              <div v-if="rev.cycle.verify" class="rev-verify row">
                <div class="col-lg-6">
                  <div class="rev-questions">
                    <h3>Did it work?</h3>
                    <p>{{ rev.cycle.verify ? 'Yes' : 'No'}}</p>
                  </div>
                </div>
                <div class="col-lg-4">
                </div>
              </div>
            </div>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Extend</h3>
            </div>
            <div class="panel-body">
              <div v-if="rev.cycle" class="rev-extend row">
                <div class="col-lg-6">
                  <div class="rev-questions">
                    <div v-if="rev.cycle.verify === true">
                      <h3>How to sustain?</h3>
                      <p>{{ rev.cycle.extendSustain }}</p>

                      <h3>How to implement?</h3>
                      <p>{{ rev.cycle.extendImplement }}</p>
                    </div>
                    <div v-if="rev.cycle.verify === false">
                      <h3>What did you learn?</h3>
                      <p>{{ rev.cycle.extendLearn }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="rev-photo">
                    <img v-bind:src="rev.cycle.extendPhotoPath" width="300" >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Review</h3>
            </div>
            <div class="panel-body">
              <div v-if="rev.cycle.review" class="rev-review row">
                <div class="col-lg-12">
                  <h3>Review Here</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      alertMessage: '',
      alertType: '',
      alertStatus: false
    }
  },

  components: {
    'headermenu': HeaderMenu,
    'alert': Alert
  },

  asyncComputed: {
    rev () {
      return this.getRev()
    }
  },

  methods: {
    showAlert: function (type, message) {
      this.alertStatus = true
      this.alertMessage = message
      this.alertType = type
    },

    hideAlert: function () {
      this.alertStatus = false
      this.alertMessage = ''
    },

    getRev: function () {
      this.$parent.showLoader()
      let organizationId = this.$parent.getOrganizationId()
      let revId = this.$parent.getRouteParams().revId

      return api.rev.getById(organizationId, revId)
      .then((response) => {
        this.$parent.hideLoader()
        return response.data
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.$parent.navigateTo('/404')
        }

        if (err.response.status === 403) {
          this.$parent.navigateTo('/404')
        }

        if (err.response.status === 401) {
          this.$parent.navigateTo('/404')
        }

        if (err.response.status === 500) {
          this.$parent.navigateTo('/500')
        }
      })
    }

  }
}
</script>

<style lang="css">
.rev-wrapper {
  background-color: #091B39;
}

.rev-header {
  background-color: #05142D;
}

.revTitle {
  color: #1783C6;
  font-weight: 200;
}
</style>
