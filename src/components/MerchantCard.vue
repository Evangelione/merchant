<!--
  功能：首页公用用户信息卡片
  作者：cc
  时间：2019年10月12日
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
  props：
    暂无
-->
<template>
  <div class="container">
    <van-row align="center" type="flex">
      <van-col offset="1" span="4">
        <img :src="avatar" alt class="avatar" />
      </van-col>
      <van-col class="hi" span="16">Hi，{{ name }} 欢迎回来！</van-col>
      <van-col @click="_logout" class="logout" span="3">退出</van-col>
    </van-row>
    <div class="main-card">
      <div>{{ money }}</div>
      <div>
        <div>账户余额(元)</div>
        <div @click="_goWallet">
          <div>充值</div>
          <div class="with-draw">提现</div>
        </div>
      </div>
    </div>
    <!-- <van-row align="center" class="info" justify="center" type="flex">
      <van-col span="7">
        <div class="info-avatar"></div>
      </van-col>
      <van-col span="11">
        <div class="info-user van-ellipsis">Hi，Miss 欢迎回来！</div>
        <div class="info-price">账户余额（元）</div>
        <div class="info-balance van-ellipsis">99291092019201.12</div>
      </van-col>
      <van-col span="8" style="position: relative;">
        <i @click="_logout" class="iconfont info-icon">&#xe637;</i>
        <div @click="_goWallet" class="info-wallet">充值 | 提现</div>
      </van-col>
    </van-row>-->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MerchantCard',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      merchant_user: '',
      merchant_money: '',
    }
  },

  computed: {
    ...mapState('home', ['money']),
    avatar() {
      return this.merchant_user && JSON.parse(this.merchant_user).avatar
    },
    name() {
      return this.merchant_user && JSON.parse(this.merchant_user).name
    },
  },

  watch: {},

  created() {},

  mounted() {
    // 读取首页信息
    this.getHomeInfo()
    this.merchant_user = localStorage.getItem('merchant_user')
  },

  destroyed() {},

  methods: {
    ...mapActions('home', ['getHomeInfo']),
    // 退出登录
    _logout() {
      // 清除环境变量
      localStorage.removeItem('ticket')
      localStorage.removeItem('merchant_global')
      localStorage.removeItem('merchant_user')
      sessionStorage.removeItem('merchant_wx_appid')
      sessionStorage.removeItem('merchant_wx_code')
      this.$router.push('/login')
      this.$toast.success({
        message: '退出登录',
        forbidClick: true,
        duration: 1000,
      })
    },
    // 充值提现
    _goWallet() {
      this.$router.push('/wallet')
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  padding-top: 8px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
  margin: 0 auto;
}

.hi {
  font-size: 14px;
}

.logout {
  color: @gray-deep-c;
  font-size: 12px;
}

.main-card {
  background-color: @primary-c;
  height: 94px;
  margin: 6px 10px 0;
  border-radius: 8px;
  // box-shadow: 0 3px 6px 0 @primary-deep-c;
  padding: 10px 20px;
  box-sizing: border-box;

  & > div:first-child {
    color: #fff;
    font-size: 32px;
  }

  & > div:last-child {
    color: #fff;
    font-size: 12px;
    margin-top: 8px;
    font-weight: 100;

    div {
      display: inline-block;
    }

    & > div:last-child {
      font-size: 14px;
      float: right;
      font-weight: 400;

      .with-draw {
        // background-color: @primary-c;
        padding: 2px 10px;
        border-radius: 10px;
        margin-left: 22px;
      }
    }
  }
}
</style>
