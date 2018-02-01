<template lang="html">
  <div>
    <div class="rev" :class="'rev-'+revPhoto.orientation">
      <div class="rev-photo" v-bind:style="{ backgroundImage: 'url(' + revPhoto.path + ')' }">
      </div>
      <div class="rev-content">
        <div class="rev-title">
          <a v-bind:href="'/rev/' + rev._id">
            {{ rev.name }}
          </a>
        </div>
        <div class="rev-owner">
          {{ rev.owner.displayname }} {{ rev.owner.familyname }}
        </div>
        <hr />
        <div class="rev-icons clearfix">
          <div class="rev-icon–group">
            <div>
              {{ rev.commentsTotal }}
            </div>
          </div>
          <div class="rev-icon–group">
            <div>
              {{ rev.likes.total }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rev'],

  computed: {
    revPhoto: function () {
      var photo = {
        orientation: 'squared'
      }

      try {
        if (this.rev.cycle.relatePhoto.thumbnail_small_path) {
          photo.path = this.rev.cycle.relatePhoto.thumbnail_small_path
          photo.orientation = this.rev.cycle.relatePhoto.metadata.orientation
          return photo
        }
      }
      catch (err) {
        return photo
      }
    },

    userPhoto: function () {
      try {
        if (this.rev.owner.photo.thumbnail_mini_path) {
          return this.rev.owner.photo.thumbnail_mini_path
        }
      }
      catch (err) {
        return ''
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styleConfig.less';

.rev {
  background: #fff;
  box-shadow: 0 1px 1px 0 #cad0da;
  height: 100%;
}

.rev-squared {
  .rev-photo {
    height: 250px;
  }
}

.rev-portrait {
  .rev-photo {
    height: 300px;
  }
}

.rev-landscape {
  .rev-photo {
    height: 200px;
  }
}

.rev-photo {
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
}

.rev-content {
  background: #fff;
  padding: 10px;
}

.rev-title {
  font-size: 18px;
  text-align: left;
  text-transform: uppercase;
	font-size: 16px;
	font-weight: 900;
	letter-spacing: -0.3px;
  font-family: @font-source-sans-pro;
}

.rev-title a {
  color: #26a3ef;
}

.rev-owner {
  font-family: @font-source-sans-pro;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.3px;
  font-style: italic;
  color: #a6a8ab;
}

.rev-icons {
  margin: 0 auto;
  text-align: center;
  font-size: 16px;
  bottom: 0;
  position: absolute;
}

.rev-icon–group {
  float: left;
  margin-right: 5px;
}
</style>
