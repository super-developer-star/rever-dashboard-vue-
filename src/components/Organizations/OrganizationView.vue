<template lang="html">
  <div>
    <headermenu></headermenu>
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

                <div class="row">
                  <div class="col-md-12 form-group">
                    <label>Organization name: </label>
                    <div>{{ organization.name }}</div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 form-group">
                    <label>Domains in this organization: </label>
                    <!-- <div>{{ organization.domains.join(',') }}</div> -->
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>User authentication to use: </label>
                      <div>{{ organization.authenticationType }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <!-- Active Directory Options -->
                    <div v-if="organization.authenticationType === 'activeDirectory'">
                      <div class="form-group">
                        <label>Active Directory URL:</label>
                        <div>{{ organization.activeDirectorySettings.url }}</div>
                      </div>

                      <div class="form-group">
                        <label>User DN:</label>
                        <div>{{ organization.activeDirectorySettings.userDn }}</div>
                      </div>

                      <div class="form-group">
                        <label>User Password:</label>
                        <div>Hidden</div>
                      </div>

                      <div class="form-group">
                        <div>{{ organization.activeDirectorySettings.searchBase }}</div>
                      </div>

                      <div class="form-group">
                        <label>Search Field:</label>
                        <div>{{ organization.activeDirectorySettings.searchField }}</div>
                      </div>
                    </div>
                    <!-- End Active Directory Options -->

                    <!-- LDAP Options -->
                    <div v-if="organization.authenticationType === 'ldap'">
                      <div class="form-group">
                        <label>LDAP URL:</label>
                        <div>{{ organization.ldapSettings.url }}</div>
                      </div>

                      <div class="form-group">
                        <label>User DN:</label>
                        <div>{{ organization.ldapSettings.userDn }}</div>
                      </div>

                      <div class="form-group">
                        <label>User Password:</label>
                        <div>Hidden</div>
                      </div>

                      <div class="form-group">
                        <label>Search Base:</label>
                        <div>{{ organization.ldapSettings.searchBase }}</div>
                      </div>

                      <div class="form-group">
                        <label>Search Field:</label>
                        <div>{{ organization.ldapSettings.searchField }}</div>
                      </div>
                    </div>
                    <!-- End LDAP Options -->
                  </div>
                </div>

                <div class="row" v-if="organization.authenticationType === 'ldap' || organization.authenticationType === 'activeDirectory'">
                  <div class="col-md-12">
                    <h4>Attributes Mapping</h4>

                    <div class="form-group">
                      <label>Identifier:</label>
                      <div>{{ organization.attributesMapping.identifier }}</div>
                    </div>

                    <div class="form-group">
                      <label>Display Name or First Name:</label>
                      <div>{{ organization.attributesMapping.displayname }}</div>
                    </div>

                    <div class="form-group">
                      <label>Family Name or Last Name:</label>
                      <div>{{ organization.attributesMapping.familyname }}</div>
                    </div>

                    <div class="form-group">
                      <label>Language:</label>
                      <div>{{ organization.attributesMapping.language }}</div>
                    </div>

                    <div class="form-group">
                      <label>Position:</label>
                      <div>{{ organization.attributesMapping.position }}</div>
                    </div>
                  </div>
                </div>

                <div class="clearfix"></div>
                <div class="row">
                  <div class="col-md-12 form-group">
                    <button type="button" v-on:click="editOrganization(organization.id)" class="btn btn-primary">Update</button>
                    <button type="button" v-on:click="cancel()" class="btn btn-danger">Cancel</button>
                  </div>
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

export default {
  components: {
    'headermenu': HeaderMenu
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
    parseOrganizationOnRender: function (data) {
      if (data.domains) {
        data.domains = data.domains.join(',')
      }

      return data
    },
    editOrganization: function (organizationId) {
      this.$parent.navigateTo('/organizations/' + organizationId + '/edit')
    },

    cancel: function () {
      this.$parent.navigateTo('/organizations')
    }
  }
}
</script>

<style lang="css">
</style>
