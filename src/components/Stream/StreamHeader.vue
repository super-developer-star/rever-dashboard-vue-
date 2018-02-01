<template lang="html">
  <div>
    <div class="container">
      <div class="row">
        <div class="container">
          <div class="title-header">
            <div class='pull-right'>
              <a href="/rev/create" class="btn btn-primary btn-create-rev">CREATE REV</a>
            </div>
            <h1>{{ title }}</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="container">
          <div class="col-sm-12">
            <ul class="nav nav-pills nav-pills-rever">
              <li role="presentation" class="active"><a href="/stream">ALL</a></li>
              <li role="presentation"><a href="/stream/user">MY REVS</a></li>
              <li role="presentation"><a href="#">COLLABORATING</a></li>
              <li role="presentation"><a href="#">COACHING</a></li>
              <li role="presentation"><a href="#">FAVORITES</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stream-header',
  props: ['title']
}
</script>

<style lang="less">
@import '../../styleConfig.less';

.title-header {
  .btn {
    margin-top: 1rem;
  }
}

.nav-pills-rever {
  border-bottom: 1px solid #acb3bf;

  li.active {
    border-bottom: 4px solid #003170;

    a {
      background: none;
      color: #26a3ef;
      font-weight: bold;
      font-family: @font-source-sans-pro;

      &:hover {
        font-weight: bold;
        background: none;
        color: #26a3ef;
      }
    }
  }

  li {
    &:hover {
      background: none;
      border-bottom: 4px solid #003170;
    }

    a {
      background: none;
      border-radius: 0;
      color: #87888c;
      font-family: @font-source-sans-pro;

      &:hover {
        color: #26a3ef;
      }

      .active {
        font-weight: bold;
        background: none;
      }
    }

  }
}
</style>
