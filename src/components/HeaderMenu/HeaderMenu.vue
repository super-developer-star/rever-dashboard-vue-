<template lang="html">
  <div class="wrapper">
    <div class="rever-navbar">
      <div class="rever-navbar-content">

        <!-- logo -->
          <div class="navbar-header">
            <logo></logo>
          </div>
        <!-- logo -->

        <!-- menu -->
          <div class="rever-navbar-menu">
            <ul class="nav navbar-nav">
              <li>
                <router-link class="rever-navbar-link" to="/stream">
                  <span>Revstream</span>
                </router-link>
              </li>
              <li v-if="userHasAccess">
                <router-link class="rever-navbar-link" to="/people">
                  <span>Manage People</span>
                </router-link>
              </li>
              <li>
                <router-link class="rever-navbar-link" to="/challenger">
                  <span>Challenger</span>
                </router-link>
              </li>
              <li>
                <router-link class="rever-navbar-link" to="/innovation-stats">
                  <span>Innovation Stats</span>
                </router-link>
              </li>
            </ul>
          </div>
        <!-- /menu -->

        <!-- user -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <dropdown class="userDropdown pull-right" :text="userName" type="primary">
              <li>
                <router-link to="/settings" class="pointer">
                  <div class="glyphicon glyphicon-cog"></div>
                  <span>Account settings</span>
                </router-link>
              </li>
              <li>
                <router-link to="/logout" class="logout pointer">
                  <div class="glyphicon glyphicon-off"></div>
                  <span>Sign out</span>
                </router-link>
              </li>
            </dropdown>
            <!--
              <span>{{reverScore}} Reverscore</span>
            -->
          </div>
        <!-- /user -->

      </div><!-- /.rever-navbar-content -->
    </div>
    <div class="margin-top-50"></div>
  </div>
</template>

<script>
import Logo from '../Logo/Logo.vue'
import {dropdown} from 'vue-strap'
// import isCoach from '../../lib/isCoach'
// import hasAccess from '../../lib/hasAccess'

export default {
  name: 'headermenu',
  components: {
    'logo': Logo,
    'dropdown': dropdown
  },

  computed: {
    userName: function () {
      let account = this.$store.getters.getAccount
      return account.displayname + ' ' + account.familyname
    },

    reverScore: function () {
      let account = this.$store.getters.getAccount
      console.log(account)
      return account.reverScore
    },

    userHasAccess: function () {
      // if (this.$store.state.getters.account) {
      //   console.log(this.$store.state.getters)
      //   return false
      // } else {
      //   return false
      // }
      return true
    }
  }
}
</script>

<style lang="less">
  @import '../../styleConfig.less';

  .rever-navbar {
    background: #fff;
    margin: 0 auto;

    margin-bottom: -50px;

    padding: 2rem;

    box-shadow: @base-box-shadow;

    position: relative;

    // force z-index to make the shadow visible
    z-index: 100;
  }

  .rever-navbar-content {
    max-width: @width-page;
    margin: 0 auto;

    display: flex;
  }

  .rever-navbar-menu {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .rever-navbar-link {
    text-transform: uppercase;
    font-size: 0.9em;
    color: fade(@gray-dark, 75%);
  }

  .rever-navbar-link.router-link-active {
    color: @gray-dark;
  }

/*
header {
  padding: 10px;
  background-color:#091B39;
  -webkit-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);
  height: 70px;
}

.navbar-header {
  position: relative;
  top: 12px;
}


ul.navbar-nav li {
  padding-top: 0;
  padding-bottom: 0;
}

ul.navbar-nav li a {
  padding-top: 35px;
  padding-bottom: 0;
  color: #ccc;
  font-weight: 300;
}

ul.navbar-nav li a:hover {
  border-bottom: 5px solid #1783c6;
  background-color: #091B39;
}

ul.navbar-nav li a.active,
ul.navbar-nav li a.router-link-active{
  font-weight: 600;
  border-bottom: 5px solid #1783c6;
}

*/
</style>
