<template lang="html">
  <div>
    <headermenu></headermenu>
    <div class="wrapper">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-4">
            <div class="row">
              <div class="account-summary">
                <p class="txt-intro">User Account</p>
                <div class="user-photo">
                  <img class="img-user" src="/static/assets/images/icon-user.png">
                  <a class="btn-changePhoto">Change Photo</a>
                </div>
                <div class="ratings">
                  <p class="txt-small">Rev Score</p>
                  <p class="txt-rate">1234 Pts For Next Level</p>
                  <div class="progress">
                    <VProgresbar now="70" label="false" type="warning"></VProgresbar>
                  </div>
                  <p class="txt-small">All Time Points</p>
                  <p class="txt-rate">54,213 Points</p>
                </div>
                <div class="user-info">
                  <div class="user-name">
                    <p class="txt-small">Name</p>
                    <p class="txt-primary name">Mariana García</p>
                    <p class="txt-primary role">Sr Ux Designer</p>
                  </div>
                  <div class="user-email">
                    <p class="txt-small">Email</p>
                    <p class="txt-primary">mariana@barcel.com.mx</p>
                  </div>
                  <p class="txt-small">Select a Language</p>
                  <VSelect>
                    <VOption value="apple">Apple</VOption>
                    <VOption value="banana">Banana</VOption>
                    <VOption value="cherry">Cherry</VOption>
                    <VOption value="orange">Orange</VOption>
                    <VOption value="grape">Grape</VOption>
                  </VSelect>
                  <hr/>
                  <a class="btn-changePassword">Change Password</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="account-settings">
                <h3>Settings</h3>
                <div class="row">
                  <div class="col-md-3">
                    <div class="status">
                      <div class="rate">
                        <p><span>Total Revs</span>22</p>
                      </div>
                      <div class="graph">
                        <non-vue-line-chart></non-vue-line-chart>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="status">
                      <div class="rate">
                        <p><span>Time to <br/> close a Rev</span>2.45<span class="txt-day">days</span></p>
                      </div>
                      <div class="graph">
                        <non-vue-line-chart></non-vue-line-chart>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="status">
                      <div class="rate">
                        <p><span>Total cost <br/> reduced</span>324</p>
                      </div>
                      <div class="graph">
                        <non-vue-line-chart></non-vue-line-chart>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="status">
                      <div class="rate">
                        <p><span>Usage</span>30%</p>
                      </div>
                      <div class="graph">
                        <non-vue-line-chart></non-vue-line-chart>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    
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
// import _ from 'lodash'
import VStrap from 'vue-strap'
import NonVueLineChart from '../Chart/NonVueLineChart'
import HeaderMenu from '../HeaderMenu/HeaderMenu.vue'
import mixin from '../../mixins/mixin.vue'

export default {
  name: 'profile',
  mixins: [mixin],
  components: {
    'headermenu': HeaderMenu,
    'NonVueLineChart': NonVueLineChart,
    VSelect: VStrap.select,
    VOption: VStrap.option,
    VProgresbar: VStrap.progressbar
  },
  data () {
  },
  computed: {
  },
  methods: {

  }
}
</script>

<style lang="less">
  @import '../../styleConfig.less';
  body {
    background: #E7E9EF;
  }
  p {
    margin-bottom: 0;
  }
  .txt-small {
    font-size: 12px;
    text-transform: uppercase;
  }
  .txt-rate {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .account-summary {
    padding: 30px 70px;
    background-color: #495c7d;
    color: #fff;
    .txt-intro {
      // font-family: Avenir;
      text-transform: uppercase;
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 900;
      letter-spacing: -0.4px;
      text-align: center;
      color: #ffffff;
    }
    .user-photo {
      text-align: center;
      margin-bottom: 20px;
      .img-user {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
      }
      .btn-changePhoto {
        font-size: 16px;
        color: #fff;
        &:hover {
          text-decoration: none;
          cursor: pointer;
        }
      }
    }
    .ratings {
      margin-bottom: 45px;
    }
    .user-name {
      margin-bottom: 15px;
    }
    .user-email {
      margin-bottom: 19px;
    }
    hr {
      border-top: solid 1px #979797;
      background: none;
      margin: 27px 0;
    }
    .btn-changePassword {
      font-size: 12px;
      text-transform: uppercase;
      background-color: rgba(236, 239, 243, 0.55);
      border-radius: 2px;
      color: #fff;
      padding: 8px 10px;
      cursor: pointer;
    }
  }
  
  .account-settings {
    padding: 30px;
    .status {
      background: #fff;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14);
      display: table;
      height: 60px;
      padding: 6px 12px;
      width: 100%;
      .rate {
        display: table-cell;
        vertical-align: middle;
        width: 50%;
        font-size: 20px;
        font-weight: 900;
        color: #777b89;
        span {
          display: block;
          font-size: 12px;
          color: #a6a8ab;
          &.txt-day {
            display: inline-block;
            margin-left: 5px;
          }
        }
      }
      .graph {
        display: table-cell;
        vertical-align: middle;
        width: 50%;
      }
    }
  }
</style>