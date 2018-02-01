<template lang="html">
  <div>
    <form v-on:submit="formSubmit($event)" class="row col-xs-12 clear-margin">
      <div>
        <div class="imageContainer" @click="onImageContainerClick" :style="{ backgroundImage: 'url(' + imageBackground + ')' }">
          <input id="fileInput" class="fileInput hidden" type="file" name="image" @change="onFileChange">
        </div>
        <div class="imageContainerText"><a class="pointer" @click="onImageContainerClick">Upload new picture</a></div>
      </div>

      <div class="form-group">
        <input name="email" type="email" id="email" v-model="account.email" autocomplete="on" class="form-control col-md-1 clear-border-radius" placeholder="Email" required disabled />
      </div>
      <div class="form-group">
        <input name="displayname" type="text" id="displayname" v-model="account.displayname" class="form-control clear-border-radius"
          placeholder="First name" />
      </div>
      <div class="form-group">
        <input name="familyname" type="text" id="familyname" v-model="account.familyname" class="form-control clear-border-radius"
          placeholder="Last name" />
      </div>
      <div class="form-group">
        <input name="jobtitle" type="text" id="jobtitle" v-model="account.jobtitle" class="form-control clear-border-radius"
          placeholder="Job title" autofocus />
      </div>
      <div class="form-group">
        <input name="password" type="password" id="password" v-model="account.password" autocomplete="off" class="form-control clear-border-radius"
        placeholder="Password" />
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block col-xs-8 col-sm-8 col-md-8 clear-float button-login">Create account</button>
      </div>
      <div class="form-group">
        <p>By clicking CREATE ACCOUNT, you agree to Rever's <a v-on:click="openPolicy()" class="pointer">Privacy Policy</a> and <a @click="openTerms()" class="pointer">Terms of use</a>
        </p>
      </div>
      <div class="signup-links row col-xs-12 clear-margin">
        Already have an account? <a href="/access" class="white-link pointer"><strong>Sign in</strong></a>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../../api'

export default {
  name: 'register',

  components: {
  },

  props: ['email'],

  data () {
    return {
      backgroundImageClass: 'wrapper-img1',
      account: {
        email: '',
        password: '',
        displayname: '',
        familyname: '',
        jobtitle: ''
      },
      imageBackground: '/static/assets/images/default-user-picture.png',
      canUpload: false,
      file: ''
    }
  },

  created: function () {
    this.account.email = this.email
  },

  methods: {
    formSubmit: function (e) {
      e.preventDefault()
      // let account = this.account

      // api.Account.createFromInvitation(invitationId, account)
      // .then((response) => {
      //   console.log(response.data)
      //   this.doLogin()
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
    },

    doLogin: function () {
      let account = {
        email: this.account.email,
        password: this.account.password
      }

      this.$store.dispatch('login', account)
      .then((result) => {
        this.$localStorage.set('token', this.$store.state.access.token)

        this.canUpload = true
        this.uploadImage(this.file)

        setTimeout(() => {
          console.log('Hiding alert and navigating to stream')
          this.$parent.hideAlert()
          this.$parent.navigateTo('/stream')
        }, 4000)

        this.$parent.showAlert('info', 'Creating your account, give us a few seconds')
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.$parent.showError('The email or password are wrong')
        }
        else {
          this.$parent.showError(err.response.statusText)
        }
      })
    },

    onImageContainerClick: function (e) {
      document.getElementById('fileInput').click()
    },

    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      this.uploadImage(files[0])
    },

    uploadImage: function (file) {
      if (this.canUpload) {
        console.log('User can upload files, uploading...')
        var self = this
        let token = this.$parent.getToken()

        let transformations = [{
          width: 400,
          height: 400,
          gravity: 'face',
          radius: 'max',
          crop: 'crop'
        }, {
          width: 100
        }]

        api.Media.upload(token, 'image', file, transformations)
        .then((response) => {
          self.imageBackground = response.path
        })
        .catch((err) => {
          console.log(err)
        })
      }
      else {
        console.log('User cannot upload files, queuing file')
        this.file = file

        this.setPreviewImage(file)
      }
    },

    setPreviewImage: function (file) {
      var self = this
      var reader = new window.FileReader()

      reader.onload = function (e) {
        self.imageBackground = e.target.result
      }

      reader.readAsDataURL(file)
    },

    openPolicy: function () {
      let modal = {
        title: 'Privacy policy',
        text: 'Privacy policy here',
        actionLabel: 'Cierrame'
      }

      this.$parent.showModal(modal)
    },

    openTerms: function () {
      let modal = {
        title: 'Terms',
        text: 'Terms',
        actionLabel: 'OK'
      }

      this.$parent.showModal(modal)
    }
  }
}
</script>

<style scoped>
  input[type="text"],
  input[type="email"],
	input[type="password"] {
		border: 1px solid #ccc;
		border-radius: 0;
		margin-bottom: 15px;
		background-color:rgba(255, 255, 255, 0.27);
    color: #333;
    outline:none;
    height:38px;
    transition:height 1s;
    -webkit-transition:height 1s;
	}

  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus {
    border: 1px solid #fff;
  }

	::-webkit-input-placeholder {
		color: #aaa;
	}

	:-moz-placeholder { /* Firefox 18- */
		color: #aaa;
	}

	::-moz-placeholder {  /* Firefox 19+ */
		color: #aaa;
	}

	:-ms-input-placeholder {
		color: #aaa;
	}

	.button-login {
		border-radius: 0;
		background-color: #1783C6;
		opacity: 80%;
		height: 38px;
		text-transform: uppercase;
		margin-top: 10px;
	}

  .reset {
      padding-bottom: 30px;
      background-color: #1e2e35;
      margin: auto;
      margin-top: 100px;
      -webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
      text-align: center;
      border-radius: 10px;
      font-size: 15px;

  }

  .title {
      font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
      font-size: 20px;
      font-weight: lighter;
      text-align: center;
      margin-bottom: 30px;
  }

  .form-control{
      border-bottom: 1px solid;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
  }

  .form-control:focus {
     -webkit-box-shadow: none;
  }

  .account{
      font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
      font-size: 15px;
      font-weight: 600;
      text-align: center;
  }

  .account-text{
      margin: 0;
  }

  .register {
      padding-top: 20px;
      padding-bottom: 30px;
      margin: auto;
      margin-top: 100px;
      background-color: #1e2e35;
      border-radius: 10px;
  }

  .photo-text{
      color: hsl(24, 100%, 50%);
      text-decoration: none;
      margin-top: 19px;
  }

  .user a {
      margin-left: 5px;
      font-size:15px;
  }

  .logo-register{
      float:right;
      margin-bottom:41px;
  }

  .register-form {
      text-align:center;
  }

  .confirmation {
      margin-top: 55px;
      margin-bottom: 84px;
  }

  .retrieve-field{
      margin-top:80px;
      margin-bottom: 110px;
  }
  .photo-container {
      border-radius: 50%;
  }

  @media only screen and (max-width : 992px){
      .center-legend {
          text-align: center;
      }
      .login{
          margin-top: 50px;
      }
  }

  @media only screen and (max-width : 768px){
      .div-mobile {
          margin-top: 100px;
      }
      .login{
          margin-top: 20px;
      }
  }

  .imageContainer {
    overflow: hidden;
    position: relative;
    cursor: pointer;
    height: 80px;
    width: 80px;
    border-radius: 50px;
    margin: 0 auto 0;
    padding-bottom: 15px;
    background-size: cover;
    background-position-x: 50%;
  }

  .imageContainerText a {
    font-weight: bold;
    margin: 0px 0 25px;
    font-size: 1.1em;
    color: #fff;
    display: block;
    padding-top: 10px;
  }

  .imageContainerText a:hover {
    text-decoration: none;
  }

  .fileInput {
    cursor: pointer;
    height: 100%;
    position:absolute;
    top: 0;
    right: 0;
    /*This makes the button huge so that it can be clicked on*/
    font-size:50px;
  }

  .hidden {
    opacity: 0;
    -moz-opacity: 0;
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0)
  }

  label {
    color: "#747579";
	}
</style>
