<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="() => this.$router.push('/selfMentionPoint/selfMentionPointCRU')"
      fixed
      left-arrow
      right-text="创建"
      title="自提点管理"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <div :key="index" v-for="(item, index) in list">
      <van-panel
        :desc="`${item.area_info.province}-${item.area_info.city}-${item.area_info.area}`"
        :status="item.phone"
        :title="item.name"
      >
        <div>
          <van-button :to="`/selfMentionPoint/selfMentionPointCRU/${item.pick_addr_id}`" size="small">编辑</van-button>
          <van-button @click="_del(item.pick_addr_id)" class="sel_button" type="danger" size="small">删除</van-button>
        </div>
      </van-panel>
      <div class="white-space"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'selfMentionPointList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      error: false,
      loading: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getSelfMentionPointList()
  },

  destroyed() {},

  methods: {
    ...mapActions('selfMentionPoint', ['getSelfMentionPointList', 'delSelfMentionPoint']),
    _getSelfMentionPointList() {
      this.getSelfMentionPointList().then(res => {
        this.list = res
      })
    },
    _del(id) {
      if (this.loading) return
      this.loading = true
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认要删除该自提点地址？',
        })
        .then(() => {
          this.delSelfMentionPoint(id)
            .then(() => {
              this.$toast.success({
                message: '操作成功',
                forbidClick: true,
                duration: 1500,
                onClose: () => {
                  // 解锁
                  this.loading = false
                  this._getSelfMentionPointList()
                },
              })
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(() => {
          // 解锁
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel__header-value {
  color: @black-c;
}

.sel_button {
  // color: @nav-bar-icon-color;
  // background-color: @nav-bar-background-color;
  margin-left: 4vw;
}

.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
  text-align: right;
}
</style>
