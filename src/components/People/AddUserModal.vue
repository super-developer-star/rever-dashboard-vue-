<template lang="html">
  <div>
    <modal
      title="Add Users"
      effect="zoom"
      width="400"
      :value="show"
      @cancel="onCancel"
      cancel-text="Cancel"
      ok-text="Create users"
      :callback="onSubmit"
    >
      <div slot="modal-body" class="modal-body">
        <p>Invite your team members to join your organization's Rever account by entering each email</p>

        <div class="form-group">
          <label for="email">Email</label>
          <div class = "input-group">
            <input type="text" class="form-control input-lg" v-model="inputEmail" v-on:keyup.enter="addEmail" />
            <span class="input-group-btn">
              <button class="btn btn-primary btn-lg" v-on:click="addEmail">+</button>
            </span>
          </div>
        </div>

        <div class="emails">
          <table class="table table-bordered table-striped">
            <tbody>
              <tr class="" v-for="(user, index) in users">
                <td class="col-md-1">
                  <span class="glyphicon glyphicon-remove" v-on:click="removeUserInIndex(index)"></span>
                </td>
                <td class="col-md-9">{{ user.email }}</td>
                <td class="col-md-2">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" v-on:click="toogleCoach(user.email, $event)"> Coach
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import _ from 'lodash'
import { modal } from 'vue-strap'
import Q from 'q'
import api from '../../api'
import mixin from '../../mixins/mixin.vue'

export default {
  name: 'add-user-modal',
  components: {
    'modal': modal
  },

  props: ['show', 'onCancel'],

  mixins: [mixin],

  data: function () {
    return {
      users: [],
      inputEmail: null
    }
  },

  methods: {
    addEmail: function () {
      this.users.push({
        email: this.inputEmail,
        isCoach: false
      })

      this.inputEmail = null
    },

    removeUserInIndex: function (index) {
      this.users.splice(index, 1)
    },

    toogleCoach: function (email, event) {
      var userSelectedIndex = _.findIndex(this.users, (item) => {
        return item.email === email
      })

      this.users[userSelectedIndex].isCoach = event.target.checked
    },

    onSubmit: function () {
      var organizationId = this.getOrganizationId()

      Q.all(this.users.map((user) => {
        return api.account.create(organizationId, user)
        .then((response) => {
          return response.data
        })
        .catch((err) => {
          console.log(err)
          this.onCancel()
        })
      }))
    }
  }
}
</script>

<style lang="less">
  @import '../../styleConfig.less';
</style>
