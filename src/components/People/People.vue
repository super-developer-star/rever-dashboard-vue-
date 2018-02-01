<template>
  <div>
    <headermenu></headermenu>
    <div class="container padding-top-20">

      <div class="rever-page-header">
        <div class="rever-page-title">
          <h1>List of users</h1>
        </div>

        <div class="rever-people-search">
          <input
            v-model="tableFilter"
            placeholder="Filter results" />
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" v-on:click="openModal">Add users</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <table v-if="accounts" class="table table-hover rever-table">
            <TableHeader
              :headers='headers'
              :tableStatus="tableStatus"
              @onChangeStatus="onChangeTableStatus"></TableHeader>

            <tbody class="rever-table-body">
              <tr v-if="sortedAccounts && sortedAccounts.length === 0" class="rever-table_no-results">
                Nothing matches your filter :(
              </tr>
              <tr v-for="account in sortedAccounts">
                <td>
                  <a v-bind:href="'/profile/' + account.id">
                    <span class="account-photo" v-if="account.photo">
                      <img :src="account.photo.path" />
                    </span>
                    <span class="account-name">{{account.displayname}} {{account.familyname}}</span>
                  </a>
                </td>
                <td>
                  <span class="account-email">{{account.email}}</span>
                </td>
                <td>
                  <span v-if="account.status === 'joined'" class="joined">Joined</span>
                  <span v-if="account.status === 'pending'" class="pending">Pending</span>
                  <span v-if="account.status === 'blocked'" class="pending">Blocked</span>
                </td>
                <td>
                  <span class="checkbox">
                    <label v-if="account.isCoach && !account.isAdmin">
                      <input type="checkbox" v-on:click="togglePermission(account._id)" checked> Coach
                    </label>
                    <label v-if="!account.isCoach && !account.isAdmin">
                      <input type="checkbox" v-on:click="togglePermission(account._id)"> Coach
                    </label>
                    <span v-if="account.isAdmin">
                      Owner
                    </span>
                  </span>
                </td>
                <td>
                  <span class="label label-info" v-for="tag in account.tags" v-if="!tag.isDefault">
                    <span>{{ tag.name }}</span>
                  </span>
                  <a href="#" v-on:click="openAddTagModal(account)">Add/Edit tags</a>
                </td>
                <td>
                  <a href=""><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <add-user-modal :show="modalOpen" :onCancel="closeModal"></add-user-modal>
    <AddTagModal :show="addTagModalShow" :onCancel="closeAddTagModal" :item="account"></AddTagModal>
  </div>
</template>

<script>
import _ from 'lodash'
import HeaderMenu from '../HeaderMenu/HeaderMenu.vue'
import {
  dropdown
} from 'vue-strap'
import hasAccess from '../../lib/hasAccess'
import isCoach from '../../lib/isCoach'
import TableHeader from '../UI/Table/TableHeader.vue'
import AddUserModal from './AddUserModal.vue'
import AddTagModal from './AddTagModal.vue'
import infiniteScroll from 'vue-infinite-scroll'
import mixin from '../../mixins/mixin.vue'
import api from '../../api'

export default {
  name: 'people',
  mixins: [mixin],
  components: {
    'headermenu': HeaderMenu,
    'dropdown': dropdown,
    'TableHeader': TableHeader,
    'AddUserModal': AddUserModal,
    'AddTagModal': AddTagModal,
    'infiniteScroll': infiniteScroll
  },
  data () {
    return {
      headers: {
        name: {
          label: 'Name'
        },
        email: {
          label: 'Email',
          isSortable: true
        },
        status: 'Status',
        role: 'Role',
        tags: 'Tags',
        controls: 'Actions'
      },
      tableStatus: {
        sortBy: null,
        ascendingSort: true
      },
      tableFilter: '',
      tableFilterKeys: ['name', 'familyname', 'email'],
      lastCursor: null,
      modalOpen: false,
      addTagModalShow: false,
      busy: false,
      accounts: [],
      account: {}
    }
  },
  created () {
    if (!hasAccess(this.$store.state)) {
      this.$parent.navigateTo('access')
    }

    if (!isCoach(this.$parent.$store)) {
      this.$parent.navigateTo('/404')
    }

    this.getAccounts()
  },

  computed: {
    sortedAccounts () {
      // accounts is async
      if (!this.accounts) {
        return null
      }

      return _.chain(this.accounts)
        // filter results by string
        .thru(sortedAccounts => {
          if (!this.tableFilter || this.tableFilter === '') {
            return sortedAccounts
          }

          return _.filter(sortedAccounts, account => {
            return _.chain(account)
              // only search on the properties that we want
              .pick(this.tableFilterKeys)
              // if any of our properties matches, return true
              .some(value => {
                return _.toString(value)
                  .toLowerCase()
                  .includes(this.tableFilter.toLowerCase())
              })
              .value()
          })
        })

        // sort the account results
        .thru(accounts => {
          // only sort if necessary
          if (!this.tableStatus.sortBy) {
            return accounts
          }

          const sortedAccounts = _.sortBy(accounts, this.tableStatus.sortBy)

          if (!this.tableStatus.ascendingSort) {
            return sortedAccounts.reverse()
          }

          return sortedAccounts
        })
        .value()
    }
  },
  filters: {

  },
  methods: {
    getAccounts: function (startAfter) {
      this.busy = true

      const organizationId = this.getOrganizationId()
      return api.organization.getAccounts(organizationId, startAfter)
        .then((response) => {
          this.busy = false
          this.lastCursor = response.data.lastCursor ? response.data.lastCursor : this.lastCursor

          if (response.data.results) {
            response.data.results.forEach((result) => {
              this.accounts.push(result)
            })
          }
        })
        .catch((err) => {
          this.busy = false
          console.log(err)
        })
    },

    loadMore: function () {
      this.getAccounts(this.lastCursor)
    },

    togglePermission: function (accountId) {
      const organizationId = this.getOrganizationId()
      return api.account.getById(organizationId, accountId)
      .then((response) => {
        const account = response.data
        if (account.isCoach) {
          this.removeCoachPermission(accountId)
        }
        else {
          this.addCoachPermission(accountId)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },

    addCoachPermission: function (accountId) {
      const organizationId = this.getOrganizationId()
      const data = {
        isCoach: true
      }

      return api.account.update(organizationId, accountId, data)
    },

    removeCoachPermission: function (accountId) {
      const organizationId = this.getOrganizationId()
      const data = {
        isCoach: false
      }

      return api.account.update(organizationId, accountId, data)
    },

    onChangeTableStatus: function (newTableStatus) {
      this.tableStatus = newTableStatus
    },

    openModal: function () {
      this.modalOpen = true
    },

    closeModal: function () {
      this.modalOpen = false
    },

    openAddTagModal: function (val) {
      this.account = val
      this.addTagModalShow = true
    },

    closeAddTagModal: function () {
      this.addTagModalShow = false
    }
  }
}
</script>

<style lang="less">
@import '../../styleConfig.less';

.rever-table_no-results {
    padding: 2rem;
    text-align: center;
}

.rever-page-header {
    display: flex;
    align-items: center;
}

.rever-page-title {
    flex: 1;
}

.rever-people-search {
    input {
        padding: 0.5rem;
        border: 1px solid transparent;
        border-radius: 2px;
    }
}

.rever-table {
    td {
      font-size: 14px;
      font-family: @font-source-sans-pro;
    }
}

.rever-table .checkbox {
    margin-top: 0;
}

.rever-table .label {
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.55rem;
    display: inline-block;
    font-size: 0.9em;
}

.rever-table .label-primary {
    border: 1px solid #bddff1;
    background: #cff2fe;
    color: #797e8a;
}

.account-photo {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    padding-right: 10px;

    img {
        width: 35px;
        height: 35px;
        border-radius: 50px;
    }
}
</style>
