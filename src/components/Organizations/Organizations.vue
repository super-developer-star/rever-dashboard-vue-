<template lang="html">
  <div>
    <headermenu></headermenu>
    <div class="container">
      <div class="row">
        <h2 class="col-md-9">Organizations</h2>
        <div class="pull-right top-15">
          <button type="button" v-on:click="createOrganization()" class="btn btn-primary">Create organization</button>
        </div>
      </div>
      <hr />

      <div class="row">
        <div class="container">
          <table v-if="organizations" class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th colspan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="organization in organizations">
                <td>
                  <a class="pointer" v-on:click="viewOrganization(organization.id)">
                    {{organization.name}}
                  </a>
                </td>
                <td>
                  <a class="pointer" v-on:click="editOrganization(organization.id)">
                    Edit
                  </a>
                </td>
                <td>
                  <a class="pointer" v-if="!organization.deletedAt" @click="deactivateOrganization(organization)">
                    <img src="/static/assets/images/active.svg" />
                  </a>
                  <a class="pointer" v-if="organization.deletedAt" @click="activateOrganization(organization)">
                    <img src="/static/assets/images/inactive.svg" />
                  </a>
                </td>
                <td>
                  <a class="pointer">
                    <span class="glyphicon glyphicon-trash"></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-infinite-scroll="paginate" infinite-scroll-disabled="busy" infinite-scroll-distance="3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paginator from '../../api/Paginator.js'
import api from '../../api'
import HeaderMenu from '../HeaderMenu/HeaderMenu.vue'
import PageTitle from '../PageTitle/PageTitle.vue'

var paginator = new Paginator(10)

export default {
  name: 'organizations',

  data () {
    return {
      busy: false
    }
  },

  created () {
    if (!this.$parent.hasAccess()) {
      this.$parent.navigateTo('/access')
    }
  },

  mounted () {
    paginator.reset()
  },

  asyncComputed: {
    organizations () {
      return this.getOrganizations()
    }
  },

  components: {
    'headermenu': HeaderMenu,
    'page-title': PageTitle
  },

  methods: {
    paginate () {
      this.busy = true
      paginator.next()
      this.getOrganizations()
    },
    getOrganizations: function () {
      this.$parent.showLoader()
      var token = this.$parent.getToken()
      let filter = paginator.get()

      console.log(this.$parent.$store.getters)

      console.log('Account')
      console.log(this.$parent.$store.getters.getAccount)
      console.log('UserId')
      console.log(this.$parent.$store.getters.getUserId)
      console.log('Organization')
      console.log(this.$parent.$store.getters.getOrganization)
      console.log('OrganizationId')
      console.log(this.$parent.$store.getters.getOrganizationId)

      return api.Organization.getAll(token, filter)
      .then((response) => {
        this.$parent.hideLoader()
        this.busy = false
        if (this.organizations) {
          response.data.forEach((organization) => {
            this.organizations.push(organization)
          })
        }
        else {
          return response.data
        }
      })
      .catch((err) => {
        console.log('Error')
        this.busy = false
        this.$parent.hideLoader()
        console.log(err)
      })
    },
    deactivateOrganization: function (organization) {
      this.$parent.showLoader()
      var token = this.$parent.getToken()
      return api.Organization.update(token, organization.id, {
        deletedAt: true
      })
      .then((response) => {
        this.$parent.hideLoader()
        organization.deletedAt = response.data.deletedAt
        return response.data
      })
      .catch(err => {
        this.$parent.hideLoader()
        console.log(err)
      })
    },
    activateOrganization: function (organization) {
      this.$parent.showLoader()
      var token = this.$parent.getToken()
      return api.Organization.update(token, organization.id, {
        deletedAt: false
      })
      .then((response) => {
        this.$parent.hideLoader()
        organization.deletedAt = response.data.deletedAt
        return response.data
      })
      .catch(err => {
        this.$parent.hideLoader()
        console.log(err)
      })
    },
    viewOrganization: function (id) {
      this.$parent.navigateTo('/organizations/' + id)
    },

    editOrganization: function (id) {
      this.$parent.navigateTo('/organizations/' + id + '/edit')
    },

    createOrganization: function () {
      this.$parent.navigateTo('/organizations/create')
    }
  }
}
</script>

<style lang="css">

</style>
