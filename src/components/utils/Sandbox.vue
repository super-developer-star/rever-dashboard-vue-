<template lang="html">
  <div>
    <div class="imageContainer" @click="onImageContainerClick" :style="{ backgroundImage: 'url(' + imageBackground + ')' }">
      <input id="fileInput" class="fileInput hidden" type="file" name="image" @change="onFileChange">
    </div>
  </div>
</template>

<script>
import api from '../../api'

export default {
  data: function () {
    return {
      imageBackground: '/static/assets/images/default-user-picture.png'
    }
  },

  methods: {
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.uploadImage(files[0])
    },

    onImageContainerClick: function (e) {
      document.getElementById('fileInput').click()
    },

    uploadImage: function (file) {
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
    margin: 0 auto;
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
</style>
