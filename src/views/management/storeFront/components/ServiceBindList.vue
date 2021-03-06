<template>
  <div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-card
          :key="item.id"
          :num="item.stock_num === '-1' ? '∞' : item.stock_num"
          :price="item.old_price"
          :tag="item.payment_status === '1' ? '定金' : null"
          :thumb="item.pic"
          :title="item.appoint_name"
          lazy-load
          v-for="item in list"
        >
          <div slot="tags">
            <van-tag plain type="danger">
              <van-icon name="tosend" />
              {{ item.appoint_date_num }}天
            </van-tag>
            <van-tag plain type="danger">
              <van-icon name="clock-o" />
              {{ item.expend_time }}分钟
            </van-tag>
            <van-tag plain type="danger">
              <van-icon name="flag-o" />
              {{ item.appoint_type === '0' ? '到店' : '上门' }}
            </van-tag>
          </div>
          <div slot="bottom">
            <div v-if="item.payment_status === '1'">定金：¥{{ item.payment_money }}</div>
            <div>预约开始: {{ $moment(item.start_time * 1000).format('YYYY-MM-DD HH:mm') }}</div>
            <div>预约结束: {{ $moment(item.start_time * 1000).format('YYYY-MM-DD HH:mm') }}</div>
          </div>
          <div slot="footer">
            <van-button @click="_recommend(item.appoint_id)" v-if="item.is_recommend === '0'" size="mini"
              >推荐</van-button
            >
            <van-button @click="_recommend(item.appoint_id)" v-else size="mini">取消推荐</van-button>
            <van-button @click="_unbind(item.id)" size="mini" type="danger">解绑</van-button>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'serviceList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      loading: false,
      finished: false,
      refreshing: false,
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : '点击右上角添加按钮添加商品'
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('storeFront', ['getStoreFrontBindServiceList', 'unBindService', 'addServiceToRecommend']),
    // 刷新服务商品列表
    _onRefresh() {
      const { id } = this.$route.params
      this.getStoreFrontBindServiceList({
        store_id: id,
        page: 1,
      }).then(res => {
        this.page = 2
        this.list = res
        this.refreshing = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    // 异步更新服务商品数据
    _onLoad() {
      const { id } = this.$route.params
      this.getStoreFrontBindServiceList({
        store_id: id,
        page: this.page,
      }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res)
      })
    },
    _recommend(gid) {
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      this.addServiceToRecommend({
        store_id: id,
        appoint_id: gid,
      })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this._onRefresh()
              this.loading = false
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    _unbind(gid) {
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      this.unBindService({
        store_id: id,
        id: gid,
      })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this._onRefresh()
              this.loading = false
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped></style>
