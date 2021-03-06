<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="绑定粉丝"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <div class="white-space"></div>
      <time-picker-box :pickEndTime="_pickEndTime" :pickStartTime="_pickStartTime"></time-picker-box>
      <van-divider>共 {{ total }} 条记录</van-divider>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <van-card :key="item.uid" :thumb="item.avatar" :title="item.nickname" lazy-load v-for="item in list">
          <div class="desc" slot="desc">
            <a :href="'tel:' + item.phone">
              {{ item.phone }}
              <van-icon color="#1989fa" name="phone-o" />
            </a>
          </div>
          <div slot="tags">
            <van-tag plain type="danger">{{ item.sex === '1' ? '男' : '女' }}</van-tag>
          </div>
          <div class="footer" slot="footer">
            <div>
              <div>推广店员：{{ item.staff_name }}</div>
              <div style="float: left;">
                绑定时间：{{ $moment(item.spread_time * 1000).format('YYYY-MM-DD HH:mm') }}
              </div>
            </div>
            <van-button @click="_controlBehaviorPopup(item.uid)" size="small" type="primary">用户行为</van-button>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>

    <!-- 弹出层 -->
    <!-- 用户行为 -->
    <van-popup class="behavior" position="bottom" safe-area-inset-bottom v-model="showBehaviorPopup">
      <van-pull-refresh @refresh="_behaviorOnRefresh" v-model="behaviorRefreshing">
        <van-list
          :finished="behaviorFinished"
          :immediate-check="false"
          @load="_behaviorOnLoad"
          finished-text="没有更多了"
          v-model="loading"
        >
          <div :key="item.maycms_id" v-for="item in behaviorList">
            <van-panel
              :desc="$moment(item.date * 1000).format('YYYY-MM-DD HH:mm')"
              :status="item.name"
              :title="`行为编号：${item.biz_id}`"
            ></van-panel>
            <div class="white-space"></div>
          </div>
        </van-list>
      </van-pull-refresh>
      <van-button @click="_controlBehaviorPopup(0)" type="primary">关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TimePickerBox from '@/components/TimePickerBox'

export default {
  name: 'bindingFansList',

  mixins: [],

  components: {
    TimePickerBox,
  },

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      total: 0,
      refreshing: false,
      finished: false,
      loading: false,
      showBehaviorPopup: false,
      startTime: this.$moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD'),
      endTime: this.$moment().format('YYYY-MM-DD'),
      behaviorPage: 1,
      behaviorList: [],
      behaviorRefreshing: false,
      behaviorFinished: false,
      lastUid: '',
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    startTimeLabel() {
      return this.$moment(this.startTime).format('YYYY-MM-DD')
    },
    endTimeLabel() {
      return this.$moment(this.endTime).format('YYYY-MM-DD')
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('member', ['getBindingFansList', 'getBindingFansBehaviorList']),
    _controlBehaviorPopup(uid) {
      if (uid) {
        this.lastUid = uid
        this.behaviorPage = 1
        this.behaviorList = []
        this.behaviorRefreshing = false
        this.behaviorFinished = false
        this.loading = false
        this.$nextTick(() => {
          this.getBindingFansBehaviorList({
            uid,
            page: 1,
          }).then(res => {
            this.loading = false
            if (res.behavior_list) {
              if (res.behavior_list.length < 10) {
                this.behaviorFinished = true
              } else {
                this.behaviorPage += 1
              }
              this.behaviorList.push(...res.behavior_list)
            } else {
              this.behaviorFinished = true
            }
            this.showBehaviorPopup = !this.showBehaviorPopup
          })
        })
      } else {
        this.showBehaviorPopup = !this.showBehaviorPopup
      }
    },
    _pickStartTime(data) {
      this.startTime = this.$moment(data).format('YYYY-MM-DD')
      this._onRefresh()
    },
    _pickEndTime(data) {
      this.endTime = this.$moment(data).format('YYYY-MM-DD')
      this._onRefresh()
    },
    _onRefresh() {
      this.getBindingFansList({
        page: 1,
        begin_time: this.startTime,
        end_time: this.endTime,
      }).then(res => {
        this.page = 2
        this.list = res.list
        this.total = res.total
        this.refreshing = false
        if (res.list.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    _onLoad() {
      this.getBindingFansList({
        page: this.page,
        begin_time: this.startTime,
        end_time: this.endTime,
      }).then(res => {
        this.loading = false
        if (res.list.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.list)
        this.total = res.total
      })
    },
    _behaviorOnRefresh() {
      this.getBindingFansBehaviorList({
        uid: this.lastUid,
        page: 1,
      }).then(res => {
        this.behaviorPage = 2
        this.behaviorList = res.behavior_list
        this.behaviorRefreshing = false
        if (res.behavior_list) {
          if (res.behavior_list.length < 10) {
            this.behaviorFinished = true
          } else {
            this.behaviorFinished = false
          }
        } else {
          this.behaviorFinished = true
        }
      })
    },
    _behaviorOnLoad() {
      this.getBindingFansBehaviorList({
        uid: this.lastUid,
        page: this.behaviorPage,
      }).then(res => {
        this.loading = false
        if (res.behavior_list) {
          if (res.behavior_list.length < 10) {
            this.behaviorFinished = true
          } else {
            this.behaviorPage += 1
          }
          this.behaviorList.push(...res.behavior_list)
        } else {
          this.behaviorFinished = true
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.sp-line {
  color: @gray-deep-c;
}

.desc {
  margin-bottom: 1px;
  a {
    color: @black-light-c !important;
    .van-icon {
      vertical-align: -2px;
    }
  }
  font-size: 12px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  & > div:first-child {
    text-align: left;
  }
}

/deep/.van-sticky {
  background-color: @gray-background-c;
  overflow: hidden;
}

.van-popup {
  background-color: @gray-background-c;
  .van-pull-refresh {
    margin-bottom: 44px;
  }
  .van-button {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
