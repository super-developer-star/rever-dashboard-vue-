<template>
  <div>
    <div class="wrapper backgroundGray">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-5 access-left-side">
            <img class="logo-img" src="static/assets/images/logo.png" />
            <div class="login-copy-head">
              Rever Enterprise Edition
            </div>
            <div class="login-copy-title">
              The Team Idea Collaboration Tool
            </div>
            <div class="login-copy-subtitle">
              Unlimited projects. Unlimited creativity.
            </div>
          </div>
          <div class="col-sm-7 access-right-side pull-right">
            <div class="row">
              <div class="col-sm-9 col-sm-offset-1">
                <form v-if="currentStep === 'firstStep' || currentStep === 'secondStep'" v-on:submit="formSubmit($event)" class="row col-xs-12 clear-margin">
                  <div class="login-message">
                    Good Morning!
                  </div>

                  <div id="login-form">
                    <div class="form-group" v-if="currentStep === 'firstStep'">
                      <label for="email">EMAIL:</label>
                      <input name="email" type="email" id="email" v-model="account.email" autocomplete="on" class="form-control col-md-1 clear-border-radius" autofocus />
                    </div>

                    <div class="form-group" v-if="currentStep === 'secondStep'">
                      <label for="email">PASSWORD:</label>
                      <input name="password" type="password" id="password" v-model="account.password" autocomplete="off" class="form-control clear-border-radius" />
                    </div>

                    <div class="form-group margin-top-50">
                      <button v-if="currentStep === 'firstStep'" v-on:click="checkEmail" class="btn btn-primary col-xs-offset-3 col-xs-6 col-sm-6 col-md-6 clear-float button-next">Next</button>

                      <button v-if="currentStep === 'secondStep'" class="btn btn-primary col-xs-offset-3 col-xs-6 col-sm-6 col-md-6 clear-float button-login">Login</button>
                    </div>
                  </div>

                </form>
                <register v-if="currentStep === 'register'" :email="account.email"></register>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import Register from './Register.vue'
import mixin from '../../mixins/mixin.vue'

export default {
  name: 'access',

  components: {
    'register': Register
  },

  data () {
    return {
      backgroundImageClass: 'wrapper-img1',
      token: {
        userId: '',
        id: '',
        ttl: ''
      },
      account: {
        email: '',
        password: ''
      },
      interval: null,
      currentStep: 'firstStep'
    }
  },

  mixins: [mixin],

  created () {
    this.interval = setInterval(() => {
      this.changeBackground()
    }, 15000)
  },

  methods: {
    changeBackground () {
      let number = Math.floor(Math.random() * 2) + 1
      let backgroundClass = 'wrapper-img' + number.toString()
      this.backgroundImageClass = backgroundClass
    },

    stopSetInterval () {
      clearTimeout(this.interval)
    },

    checkEmail: function (e) {
      e.preventDefault()

      if (this.account.email) {
        var data = {
          email: this.account.email
        }

        api.account.accountStatus(data)
        .then((response) => {
          if (response.data.status === 'pending') {
            this.currentStep = 'register'
          }
          else if (response.data.status === 'blocked') {

          }
          else if (response.data.status === 'joined') {
            this.currentStep = 'secondStep'
          }
          else {

          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },

    formSubmit: function (e) {
      e.preventDefault()

      this.$store.dispatch('login', this.account)
      .then((result) => {
        this.$localStorage.set('token', this.$store.state.access.token)
        this.$parent.navigateTo('stream')
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.$parent.showError('The email or password are wrong')
        }
        else {
          this.$parent.showError(err.response.statusText)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../../styleConfig.less';

  .wrapper{
		position: fixed;
    top:0px;
    right:0px;
    left:0px;
    bottom:0px;
    margin: 0px;
    background-position: center;
    background-size: cover;
    overflow: auto;
	}

  .access-left-side {
    background-color: #ffcccc;
    background-position: center;
    background-size: cover;
    overflow: auto;
    position: fixed;
    height: 100%;
    background-image: url('/static/assets/images/access-intro-1.png');
    background-repeat: no-repeat;
    padding-top: 180px;
  }

  .access-right-side {
    padding-top: 25%;
  }

  #login-form {
    margin-top: 50px;
  }

  .login-copy-head {
    padding-left: 70px;
    font-family: @font-helvetica;
    color: @white-font;
    text-transform: uppercase;
    font-size: 20px;
    letter-spacing: 3px;
  }

  .login-copy-title {
    padding-left: 70px;
    padding-right: 70px;
    padding-top: 10px;
    font-family: @font-helvetica;
    color: @white-font;
    text-transform: uppercase;
    font-size: 26px;
    letter-spacing: 3px;
  }

  .login-copy-subtitle {
    padding-left: 70px;
    padding-top: 30px;
    font-family: @font-helvetica;
    color: @white-font;
    font-size: 18px;
    font-style: italic;
    letter-spacing: 3px;
  }

  .login-message {
    color: @blue-font;
    font-weight: 300;
    font-size: 36px;
    font-family: @font-source-sans-pro;
  }

	.logo {
		margin: 20px auto 40px;
	}

  .logo-img {
    width: 55px;
    margin: 50px auto 50px;
    display: block;
  }

  .login{
    padding-bottom: 30px;
    margin: auto;
    margin-top: 100px;
    text-align: center;
    font-size: 15px;
  }

	.login-img {
		margin: 20px 0px 40px -30px;
	}

	input#email,
	input#password {
    border-top: none;
    background: none;
    box-shadow: none;
    border-right: none;
    border-left: none;
    font-size: 16px;
    color: @gray-font;
    border-radius: 0;
  }

	::-webkit-input-placeholder {
		color: @gray-font;
	}

	:-moz-placeholder { /* Firefox 18- */
		color: @gray-font;
	}

	::-moz-placeholder {  /* Firefox 19+ */
		color: @gray-font;
	}

	:-ms-input-placeholder {
		color: @gray-font;
	}

	label {
    color: @gray-font;
    font-family: @font-source-sans-pro;
    font-size: 16px;
	}
</style>
