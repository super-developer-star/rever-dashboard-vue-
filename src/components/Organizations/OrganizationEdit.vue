<template lang="html">
  <div>
    <headermenu></headermenu>
    <alert :show="alertStatus" :message="alertMessage" :type='alertType' :onClose="hideAlert"></alert>

    <div v-if="organization" class="container padding-top-20">
      <h2>{{ organization.name }}</h2>
      <hr />

      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12 form-group">
              <div class="tabless">

                <div v-if="organization.id == null">
                  <h2>Organization not found</h2>
                </div>

                <form v-on:submit="formSubmit($event)" v-if="organization.id">
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <label>Organization name*</label>
                      <input v-model="organization.name" required name="name" id="name" type="text" class="form-control clear-border-radius"
                        placeholder="" />
                      <p class="help-block">Enter the organization name, this name must be unique.</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12 form-group">
                      <label>Domains in this organization*</label>
                      <input v-model="organization.domains"  name="domains" id="domains" type="text" class="form-control clear-border-radius" required />
                      <p class="help-block">Enter the domains available for this organization separated by commas.</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>User authentication to use</label>
                        <select v-model="organization.authenticationType" name="authenticationType" id="authenticationType" class="form-control" required>
                          <option value="local">Local authentication</option>
                          <option value="activeDirectory">Active Directory</option>
                          <option value="ldap">LDAP</option>
                          <option value="provider">Third party provider</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <!-- Active Directory Options -->
                      <div v-if="organization.authenticationType === 'activeDirectory'">
                        <div class="form-group">
                          <label>Active Directory URL*</label>
                          <input type="text" v-model="organization.activeDirectorySettings.url" name="url" class="form-control clear-border-radius" />
                          <p class="help-block">Example: ldap://18.109.19.51</p>
                        </div>

                        <div class="form-group">
                          <label>User DN*</label>
                          <input type="text" v-model="organization.activeDirectorySettings.userDn" name="userDN" class="form-control clear-border-radius" />
                          <p class="help-block">The User DN can either be an email or a user in the form of cn=admin,dc=ldap,dc=example,dc=com</p>
                        </div>

                        <div class="form-group">
                          <label>User Password*</label>
                          <input type="password" v-model="organization.activeDirectorySettings.userPassword" name="password" class="form-control clear-border-radius" />
                          <p class="help-block">Enter the password</p>
                        </div>

                        <div class="form-group">
                          <label>Search Base*</label>
                          <input type="text" v-model="organization.activeDirectorySettings.searchBase" name="searchBase" class="form-control clear-border-radius" />
                          <p class="help-block">Example: cn=users,dc=ldap,dc=reverscore,dc=net</p>
                        </div>

                        <div class="form-group">
                          <label>Search Field*</label>
                          <input type="text" v-model="organization.activeDirectorySettings.searchField" name="searchField" class="form-control clear-border-radius" />
                          <p class="help-block">Enter the field that it's going to be used to search for a user, Example: userPrincipalName</p>
                        </div>
                      </div>
                      <!-- End Active Directory Options -->

                      <!-- LDAP Options -->
                      <div v-if="organization.authenticationType === 'ldap'">
                        <div class="form-group">
                          <label>LDAP URL*</label>
                          <input type="text" v-model="organization.ldapSettings.url" name="url" class="form-control clear-border-radius" />
                          <p class="help-block">Example: ldap://ldap.reverscore.net:389</p>
                        </div>

                        <div class="form-group">
                          <label>User DN*</label>
                          <input type="text" v-model="organization.ldapSettings.userDn" name="userDn" class="form-control clear-border-radius" />
                          <p class="help-block">The User DN is usually a user in the form of cn=rever,ou=users,dc=ldap,dc=reverscore,dc=net</p>
                        </div>

                        <div class="form-group">
                          <label>User Password*</label>
                          <input type="password" v-model="organization.ldapSettings.userPassword" name="userPassword" class="form-control clear-border-radius" />
                          <p class="help-block">Enter the password</p>
                        </div>

                        <div class="form-group">
                          <label>Search Base*</label>
                          <input type="text" v-model="organization.ldapSettings.searchBase" name="searchBase" class="form-control clear-border-radius" />
                          <p class="help-block">Example: ou=users,dc=ldap,dc=reverscore,dc=net</p>
                        </div>

                        <div class="form-group">
                          <label>Search Field*</label>
                          <input type="text" v-model="organization.ldapSettings.searchField" name="searchField" class="form-control clear-border-radius" />
                          <p class="help-block">Enter the field that it's going to be used to search for a user, Example: uid</p>
                        </div>
                      </div>
                      <!-- End LDAP Options -->
                    </div>
                  </div>

                  <div class="row" v-if="organization.authenticationType === 'ldap' || organization.authenticationType === 'activeDirectory'">
                    <div class="col-md-12">
                      <h4>Attributes Mapping</h4>

                      <div class="form-group">
                        <label>Identifier*</label>
                        <input type="text" v-model="organization.attributesMapping.identifier" name="identifier" class="form-control clear-border-radius" />
                        <p class="help-block">Enter the identifier name, usually is an email or username</p>
                      </div>

                      <div class="form-group">
                        <label>Display Name or First Name*</label>
                        <input type="text" v-model="organization.attributesMapping.displayname" name="displayname" class="form-control clear-border-radius" />
                        <p class="help-block">Enter the name of the field that representes the first name</p>
                      </div>

                      <div class="form-group">
                        <label>Family Name or Last Name*</label>
                        <input type="text" v-model="organization.attributesMapping.familyname" name="familyname" class="form-control clear-border-radius" />
                        <p class="help-block">Enter the name of the field that representes the family name</p>
                      </div>

                      <div class="form-group">
                        <label>Language</label>
                        <input type="text" v-model="organization.attributesMapping.language" name="language" class="form-control clear-border-radius" />
                        <p class="help-block">Enter the name of the field that representes the language </p>
                      </div>

                      <div class="form-group">
                        <label>Position</label>
                        <input type="text" v-model="organization.attributesMapping.position" name="position" class="form-control clear-border-radius" />
                        <p class="help-block">Enter the name of the field that representes the position or title</p>
                      </div>
                    </div>
                  </div>

                  <div class="clearfix"></div>
                  <div class="row">
                    <div class="col-md-12 form-group">
                      <button type="button" v-on:click="formSubmit($event)" name="update" class="btn btn-primary">Update</button>
                      <button type="button" v-on:click="cancel()" class="btn btn-danger">Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import Alert from '../utils/Alert.vue'
import api from '../../api'
import HeaderMenu from '../HeaderMenu/HeaderMenu.vue'

export default {
  components: {
    'headermenu': HeaderMenu,
    'alert': Alert
  },
  data () {
    return {
      alertMessage: '',
      alertType: '',
      alertStatus: false
    }
  },
  asyncComputed: {
    organization () {
      this.$parent.showLoader()
      let token = this.$parent.getToken()
      let id = this.$parent.getRouteParams().organizationId

      return api.Organization.getById(token, id)
      .then((response) => {
        this.$parent.hideLoader()
        return this.parseOrganizationOnRender(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  methods: {
    cancel: function () {
      this.$parent.goBack()
    },
    showAlert: function (type, message) {
      this.$parent.hideLoader()
      this.alertStatus = true
      this.alertMessage = message
      this.alertType = type
    },
    hideAlert: function () {
      this.alertStatus = false
      this.alertMessage = ''
    },
    parseOrganizationOnRender: function (data) {
      if (data.domains) {
        data.domains = data.domains.join(',')
      }

      return data
    },
    formSubmit: function (e) {
      e.preventDefault()
      this.$parent.showLoader()
      let token = this.$parent.getToken()
      let id = this.$parent.getRouteParams().organizationId
      let data = this.parseOrganizationOnSubmit(this.organization)

      api.Organization.update(token, id, data)
      .then((response) => {
        this.$parent.navigateTo('/organizations/' + this.$route.params.organizationId)
        this.showAlert('success', 'Organization saved')
      })
      .catch((err) => {
        this.showAlert('error', err.message)
      })
    },
    parseOrganizationOnSubmit: function (data) {
      if (data.domains) {
        data.domains = data.domains.split(',')
      }

      return data
    }
  }
}
</script>

<style lang="css">
</style>
