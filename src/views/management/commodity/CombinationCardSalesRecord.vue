<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="套餐销售记录"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="index" v-for="(item, index) in list">
          <van-panel
            :desc="item.phone"
            :status="$moment(item.create_time * 1000).format('YYYY-MM-DD HH:mm')"
            :title="item.nickname"
          >
            <van-row>
              <van-col span="6">订单号：</van-col>
              <van-col span="18">{{ item.order_no }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">购买数量：</van-col>
              <van-col span="18">{{ item.meal_num }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">单价：</van-col>
              <van-col span="18">{{ item.unit_price }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">实付：</van-col>
              <van-col span="18">{{ item.paid === '0' ? '暂未支付' : item.pay_money }}</van-col>
            </van-row>
            <div class="white-space"></div>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'combinationCardSalesRecord',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      refreshing: false,
      finished: false,
      loading: false,
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : '暂无记录'
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('commodity', ['readCombinationCardSalesRecord']),
    // 刷新零售商品列表
    _onRefresh() {
      const { id } = this.$route.params
      this.readCombinationCardSalesRecord({
        page: 1,
        meal_id: id,
      }).then(res => {
        this.page = 2
        this.list = res.list
        this.refreshing = false
        if (res.list.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    // 异步更新零售商品数据
    _onLoad() {
      const { id } = this.$route.params
      this.readCombinationCardSalesRecord({
        page: this.page,
        meal_id: id,
      }).then(res => {
        this.loading = false
        if (res.list.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.list)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
}
</style>
