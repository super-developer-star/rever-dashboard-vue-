<script>
import store from '../store/index'
import hasAccess from '../lib/hasAccess'

export default {
  localStorage: {
    token: ''
  },

  store: store,

  methods: {
    hasAccess: function () {
      return hasAccess(this.$store.state)
    },
    getToken: function () {
      var token = this.$store.state.access.token
      return token
    },
    showLoader: function () {
      this.$refs.loader.show()
    },
    hideLoader: function () {
      this.$refs.loader.hide()
    },
    getLoader: function () {
      return this.$refs.loader
    },
    navigateTo: function (path) {
      this.$root.$router.push(path)
    },
    goBack: function () {
      this.$root.$router.go(-1)
    },
    getRouteParams: function () {
      return this.$route.params
    },
    getAccount: function () {
      return this.$store.getters.getAccount
    },
    getUserId: function () {
      return this.$store.getters.getUserId
    },
    getOrganizationId: function () {
      return this.$store.getters.getOrganizationId
    },
    getOrganization: function () {
      return this.$store.getters.getOrganization
    },
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
    showError: function (message) {
      this.$store.dispatch('showAlert', {
        type: 'danger',
        message: message,
        status: true
      })
    },
    showSuccess: function (message) {
      this.$store.dispatch('showAlert', {
        type: 'success',
        message: message,
        status: true
      })
    },
    showWarning: function (message) {
      this.$store.dispatch('showAlert', {
        type: 'warning',
        message: message,
        status: true
      })
    },
    decideWhereToRedirectBasedOnHistory: function () {
      if (this.historyPathExists()) {
        this.navigateToDefaultPath()
      }
      else {
        this.navigateToDefaultPath()
      }
    },
    historyPathExists: function () {
      return this.$router.history
    },
    navigateToHistoryPath: function () {
      this.$root.$router.push(this.$router.history.current.path)
    },
    navigateToDefaultPath: function () {
      this.$root.$router.push('stream')
    },
    pathIs: function (path) {
      return this.$route.matched[0].path === path
    },
    pathIsNot: function (path) {
      return this.$route.matched[0].path !== path
    }
  }
}
</script>
