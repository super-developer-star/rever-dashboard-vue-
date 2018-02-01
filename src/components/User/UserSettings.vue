<template lang="html">
  <div>
    <headermenu></headermenu>
    <div class="container padding-top-20">
      <div class="col-lg-12">
        <ul class="nav nav-pills">
          <li role="presentation" class="active"><a href="#">Profile</a></li>
          <li role="presentation"><a href="#">Password</a></li>
        </ul>
      </div>
      <div class="margin-top-50"></div>
      <div class="row">
        <div class="col-lg-4 col-lg-offset-4">
          <div v-if="account">
            <form @submit="onFormSubmit($event)" class="form">
              <div class="media">
                <div class="media-left">
                  <div class="imageContainer" @click="onImageContainerClick" :style="{ backgroundImage: 'url(' + imageBackground + ')' }">
                    <input id="fileInput" class="fileInput hidden" type="file" name="image" @change="onFileChange" />
                  </div>
                </div>
                <div class="media-body">
                  <div class="imageContainerText">
                    <a class="btn btn-default pointer" @click="onImageContainerClick">Update</a>
                  </div>
                </div>
              </div>

              <div class="margin-top-50"></div>

              <div class="form-group">
                <label for="">Email</label>
                <input v-model="account.email" type="text" class="form-control" id="" placeholder="" disabled>
                <p class="help-block">Your email cannot be changed</p>
              </div>
              <div class="form-group">
                <label for="displayname">First name</label>
                <input v-model="account.displayname" type="text" class="form-control" id="displayname" placeholder="First name">
                <p class="help-block">Enter your first name</p>
              </div>
              <div class="form-group">
                <label for="lastname">Last name</label>
                <input v-model="account.familyname" type="text" class="form-control" id="familyname" placeholder="Family name">
                <p class="help-block">Enter your family name</p>
              </div>
              <div class="form-group">
                <label for="position">Job title</label>
                <input v-model="account.position" type="text" class="form-control" id="position" placeholder="Enter your job title">
                <p class="help-block">Enter your job title</p>
              </div>
              <div class="form-group">
                <label for="Language">Language</label>
                <select v-model="account.language" class="form-control">
                  <option v-for="language in languages" v-bind:value="language.value">
                    {{ language.name }}
                  </option>
                </select>
                <p class="help-block">Select the language you want to use</p>
              </div>
              <div class="form-group">
                <label for="tags">Tags</label>
                <div class="tags">
                  <span v-for="tag in account.tags" class="label label-primary">{{ tag.name }}</span>
                </div>
                <p class="help-block">You cannot change your tags</p>
              </div>
              <div class="margin-top-50"></div>
              <div class="form-group">
                <button type="button" @click="onFormSubmit($event)" class="btn btn-block btn-primary">Update settings</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import HeaderMenu from '../HeaderMenu/HeaderMenu.vue'
import hasAccess from '../../lib/hasAccess'

export default {
  components: {
    'headermenu': HeaderMenu
  },

  data () {
    return {
      languages: [
        { value: 'en', name: 'English' },
        { value: 'es', name: 'Spanish' }
      ],
      imageBackground: '/static/assets/images/default-user-picture.png',
      file: ''
    }
  },

  computed: {},

  asyncComputed: {
    account () {
      return this.getAccount()
    }
  },

  created: function () {
    if (!hasAccess(this.$store.state)) {
      this.$parent.navigateTo('access')
    }
  },

  mounted: function () {
  },

  methods: {
    getAccount: function () {
      let token = this.$parent.getToken()

      return api.Account.getMe(token)
      .then((response) => {
        try {
          if (response.data.photo.path) {
            this.imageBackground = response.data.photo.path
          }
        }
        catch (e) {
        }
        return response.data
      })
      .catch((err) => {
        console.log(err)
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

      console.log('Calling API to Upload file')
      console.log(file)
      api.Media.upload(token, 'image', file, transformations)
      .then((response) => {
        console.log('Media response')
        console.log(response)
        self.imageBackground = response.path
        self.account.photo = response._id

        self.updateAccount()
      })
      .catch((err) => {
        console.log(err)
      })
    },

    setPreviewImage: function (file) {
      var self = this
      var reader = new window.FileReader()

      reader.onload = function (e) {
        self.imageBackground = e.target.result
      }

      reader.readAsDataURL(file)
    },

    onFormSubmit: function (e) {
      e.preventDefault()
      console.log('Updating account')
      this.updateAccount()
    },

    updateAccount: function () {
      let token = this.$parent.getToken()
      let userId = this.$parent.getUserId()
      let organizationId = this.$parent.getOrganizationId()

      var data = Object.assign({}, this.account)

      return api.Account.update(token, userId, organizationId, data)
      .then((response) => {
        if (response.data) {
          console.log(response.data)
          this.$parent.showAlert('success', 'Your settings have been saved')

          setTimeout(() => {
            this.$parent.hideAlert()
          }, 3000)

          console.log(token)
          this.$parent.$store.dispatch('refreshAccountData', token)
        }
      })
      .catch((err) => {
        console.log(err)
        this.$parent.showAlert('danger', err.message)
      })
    }
  }
}
</script>

<style lang="css" scoped>
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

.imageContainerText {
  margin: 20px 20px;
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

.btn-default {
  background-color: #f1f1f1;
  width: 100px;
}
</style>
