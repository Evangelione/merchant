<template>
  <div>
    <div v-if="active === 0">
      <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
        <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
          <van-card
            :key="item.package_id"
            :num="item.stock"
            :origin-price="item.old_price"
            :price="item.price"
            :thumb="item.pic"
            :title="item.name"
            lazy-load
            v-for="item in list"
          >
            <!-- <div slot="tags">
            <van-tag plain type="danger">每人限购：{{ item.person_num }}</van-tag>
            </div>-->
            <div slot="bottom">
              <div>创建时间：{{ $moment(item.create_time * 1000).format('YYYY-MM-DD') }}</div>
            </div>
            <div slot="footer" v-if="$route.fullPath === '/commodity'">
              <!-- <van-button @click="_deleteCommodity(item.package_id)" size="small" type="danger">删除</van-button> -->
              <van-button
                @click="_changeGoodStatus(item.package_id, item.status)"
                size="small"
                type="danger"
                v-if="item.status == 0"
              >
                停售
              </van-button>
              <van-button @click="_changeGoodStatus(item.package_id, item.status)" size="small" type="primary" v-else>
                启售
              </van-button>
              <van-button :to="`/commodity/packageSalesRecord/${item.package_id}`" size="small">销售记录</van-button>
              <van-button :to="`/commodity/packagePreferential/${item.package_id}`" size="small">优惠</van-button>
              <van-button :to="`/commodity/packageCRU/${item.package_id}`" size="small" v-if="!item.type">
                编辑
              </van-button>
            </div>
            <div slot="footer" v-else>
              <van-button :to="`/reward/packageReward/${item.package_id}`" size="small" type="primary">
                推广分佣设置
              </van-button>
            </div>
          </van-card>
        </van-list>
      </van-pull-refresh>
      <van-divider :hairline="false" v-show="!loading && !list.length && $route.fullPath === '/commodity'">
        点击右上角创建套餐
      </van-divider>
    </div>
    <div v-if="active === 1">
      <van-sticky :offset-top="offsetTop">
        <div style="background-color: #f5f5f9;">
          <div class="white-space"></div>
          <van-cell @click="_controlCategoryCRUPopup" center clickable title="新增分类">
            <van-icon class="add-icon" color="#1989fa" name="add" slot="icon" />
          </van-cell>
          <div class="white-space"></div>
        </div>
      </van-sticky>
      <van-collapse accordion v-model="activeCategory">
        <van-collapse-item :key="item.cat_id" :name="item.cat_id" v-for="item in firstCategoryList">
          <div slot="title">
            {{ item.cat_name }}
            <van-button @click.stop="modifyCategory(item)" size="mini" style="margin-left: 10px;">
              编辑
            </van-button>
          </div>
          <div v-if="!item.children">暂无分类</div>
          <van-tag
            :key="child.cat_id"
            @click="modifyCategory(child)"
            size="medium"
            type="primary"
            v-for="child in item.children"
          >
            <div>{{ child.cat_name }}</div>
          </van-tag>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div class="tab-bar-holder-sp" v-if="$route.fullPath === '/commodity'"></div>
    <van-tabbar fixed v-if="$route.fullPath === '/commodity'" v-model="active" safe-area-inset-bottom>
      <van-tabbar-item icon="apps-o">套餐</van-tabbar-item>
      <van-tabbar-item icon="label-o">分类</van-tabbar-item>
    </van-tabbar>
    <van-popup class="category-cru-popup" position="bottom" safe-area-inset-bottom v-model="showCategoryCRUPopup">
      <ValidationObserver @submit.prevent="_submit" ref="observer" tag="form" v-slot="{ invalid }">
        <van-cell-group>
          <ValidationProvider name="分类名称" rules="required" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="分类名称"
              placeholder="请填写分类名称"
              required
              v-model="formData.cat_name"
            ></van-field>
          </ValidationProvider>
          <van-field
            v-show="curId == ''"
            :placeholder="categoryLabel"
            @click="_controlCategoryPicker"
            input-align="right"
            is-link
            label="分类归属"
            readonly
          ></van-field>
        </van-cell-group>
        <div class="white-space-lg"></div>
        <van-button
          style="position:absolute; bottom: 0px; width: 100%;"
          v-if="curId"
          @click="_deleteCategory"
          native-type="button"
          type="danger"
        >
          删除
        </van-button>
        <div class="wing-blank-lg">
          <van-button @click="_controlCategoryCRUPopup" native-type="button">取消</van-button>
          <van-button native-type="submit" type="primary">保存</van-button>
        </div>
      </ValidationObserver>
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker ref="catePicker" :columns="firstCategoryListAddNull" @change="_changeCategory" value-key="cat_name" />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'package',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        cat_name: '',
        cat_fid: '0',
      },
      list: [],
      page: 1,
      active: 0,
      loading: false,
      finished: false,
      refreshing: false,
      activeCategory: '',
      categoryLabel: '无',
      firstCategoryList: [],
      showCategoryCRUPopup: false,
      showCategoryPicker: false,
      curId: '',
    }
  },

  computed: {
    ...mapState('commodity'),
    finishText() {
      return this.list.length ? '没有更多了' : ''
    },
    offsetTop() {
      return (90 / 375) * document.body.clientWidth
    },
    firstCategoryListAddNull() {
      const arr = JSON.parse(JSON.stringify(this.firstCategoryList))
      arr.unshift({
        cat_id: '0',
        cat_name: '无',
      })
      return arr
    },
  },

  watch: {},

  created() {},

  mounted() {
    // 套餐商品一级分类
    this._getPackageCategoryList()
  },

  destroyed() {},

  methods: {
    ...mapMutations('commodity', ['changeRightText']),
    ...mapActions('commodity', [
      'getPackageList',
      'deletePackage',
      'getPackageCategoryList',
      'createPackageCategory',
      'deletePackageCategory',
      'changeCommodityStatus',
    ]),
    // 分类编辑开关
    _controlCategoryCRUPopup() {
      this.showCategoryCRUPopup = !this.showCategoryCRUPopup
      this.$nextTick(() => {
        this.$refs.observer.reset()
        this.categoryLabel = '无'
        this.$refs.catePicker && this.$refs.catePicker.setIndexes([0])
      })
      this.curId = ''
      this.formData = {
        cat_name: '',
        cat_fid: '0',
      }
    },
    modifyCategory(item) {
      this.showCategoryCRUPopup = !this.showCategoryCRUPopup
      this.$nextTick(() => {
        this.$refs.observer.reset()
        this.categoryLabel = '无'
        this.$refs.catePicker && this.$refs.catePicker.setIndexes([0])
      })
      this.curId = item.cat_id
      this.formData = {
        cat_name: item.cat_name,
        cat_fid: item.cat_fid,
      }
    },
    // 分类归属开关
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    // 切换产品状态
    _changeGoodStatus(id, status) {
      let s = 0
      if (status == 0) {
        s = 1
      }
      this.changeCommodityStatus({ id: id, status: s, model: 'package' }).then(() => {
        this.$toast.success({
          message: '操作成功',
          duration: 800,
          onClose: () => {
            this._onRefresh()
          },
        })
      })
    },
    // 刷新套餐列表
    _onRefresh() {
      this.getPackageList({ page: 1, all: 1 }).then(res => {
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
    // 异步更新零售商品数据
    _onLoad() {
      this.getPackageList({ page: this.page, all: 1 }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res)
      })
    },
    // 删除套餐
    _deleteCommodity(id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.deletePackage(id)
                .then(() => {
                  this.$toast.success({
                    message: '删除成功',
                    duration: 800,
                    onClose: () => {
                      this._onRefresh()
                    },
                  })
                  done()
                })
                .catch(() => {
                  done()
                })
            } else {
              done()
            }
          },
        })
        .catch(() => {})
    },
    // 删除分类
    _deleteCategory() {
      // type：1<Number> 1级分类
      // type：2<Number> 2级分类
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.deletePackageCategory({ cat_id: this.curId })
                .then(() => {
                  this.$toast.success({
                    message: '删除成功',
                    duration: 800,
                    onClose: () => {
                      this._getPackageCategoryList()
                      this._controlCategoryCRUPopup()
                    },
                  })
                  done()
                })
                .catch(() => {
                  done()
                })
            } else {
              done()
            }
          },
        })
        .catch(() => {})
    },
    // 获取套餐商品一级分类
    _getPackageCategoryList() {
      this.getPackageCategoryList().then(res => {
        this.firstCategoryList = res
      })
    },
    // 分类归属变更
    _changeCategory(picker, item) {
      this.formData.cat_fid = item.cat_id
      this.categoryLabel = item.cat_name
    },
    // 提交表单
    async _submit() {
      // 锁
      if (this.loading) return
      // 验证表单
      const isValid = await this.$refs.observer.validate()
      // 表单不完整
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        // 加锁
        this.loading = true
        if (this.curId) {
          this.formData.id = this.curId
        }
        this.createPackageCategory(this.formData)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this._getPackageCategoryList()
                this._controlCategoryCRUPopup()
                this.formData = {
                  cat_name: '',
                  cat_fid: '0',
                }
                this.$nextTick(() => {
                  this.$refs.observer.reset()
                })
              },
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.van-tag {
  .van-icon {
    margin-right: 4px;
  }
}

.add-icon {
  margin-right: 10px;
  font-size: 18px;
}
.delete-icon {
  margin-right: 5px;
  color: red;
  font-size: 15px;
  vertical-align: -3px;
}

.category-cru-popup {
  height: 80vh;
  background-color: #f2f2f2;

  .van-button {
    width: 50%;
    margin: 0;
  }
}

.van-card__footer {
  margin-top: 8px;
}
</style>
