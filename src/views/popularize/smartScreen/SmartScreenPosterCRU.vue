<template>
  <div>
    <van-nav-bar
      :title="`${type}机器人推广`"
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="排序" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="排序"
            placeholder="请填写排序"
            required
            type="number"
            v-model.trim="formData.sort"
          />
        </ValidationProvider>
        <ValidationProvider name="服务范围" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="formData.guest_demand_ids.length ? '1' : ''"
            @click="_controlServiceScopePopup"
            error-message-align="right"
            input-align="right"
            is-link
            label="选择服务范围"
            placeholder="请选择"
            readonly
            required
          >
            <div slot="input" v-if="formData.guest_demand_ids.length">
              <div :key="item" v-for="item in formData.guest_demand_ids">
                <van-tag type="primary">{{ _serviceScopeLabel(item) }}</van-tag>
              </div>
            </div>
          </van-field>
        </ValidationProvider>
        <!-- <van-field
          :value="guestType"
          @click="_controlGuestTypePicker"
          clickable
          input-align="right"
          label="客人数量"
          placeholder="点击选择"
          readonly
        /> -->
        <!-- <van-field input-align="right" label="人数" v-if="formData.guest_num_type === '1'">
          <van-stepper slot="input" v-model="formData.guest_num" />
        </van-field>
        <van-field input-align="right" label="最少人数" v-if="formData.guest_num_type === '2'">
          <van-stepper :max="formData.guest_num_max - 0" slot="input" v-model="formData.guest_num_min" />
        </van-field>
        <van-field input-align="right" label="最多人数" v-if="formData.guest_num_type === '2'">
          <van-stepper :min="formData.guest_num_min - 0 + 1" slot="input" v-model="formData.guest_num_max" />
        </van-field> -->
        <!-- <ValidationProvider name="标签" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="formData.label_ids.length ? '1' : ''"
            @click="_controlTagPicker"
            @click-left-icon.stop="$toast('用于店内与同城推广')"
            error-message-align="right"
            input-align="right"
            is-link
            label="推广标签"
            left-icon="question-o"
            placeholder="请选择"
            readonly
            required
          >
            <div :key="index" slot="input" v-for="(item, index) in formData.label_ids">
              <van-tag type="primary">{{ _tagLabel(item, index) }}</van-tag>
            </div>
          </van-field>
        </ValidationProvider>-->
        <!-- <ValidationProvider name="分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="cateLabel"
            @click="_controlCatePicker"
            @click-left-icon.stop="$toast('用于店内与同城推广')"
            error-message-align="right"
            input-align="right"
            is-link
            label="推广分类"
            left-icon="question-o"
            placeholder="请选择"
            readonly
            required
          />
        </ValidationProvider>-->
        <!-- <van-cell title="选择商品">
          <van-switch active-value="1" inactive-value="0" v-model="formData.data_type"></van-switch>
        </van-cell>-->
      </van-cell-group>
      <van-cell-group title="选择推广内容">
        <van-tabs :lazy-render="false" v-model="formData.data_type">
          <van-tab title="商品" name="1">
            <commodity-radio
              :cacheImg="radioImg"
              :id="formData.goods_id"
              :name="goods_name"
              :pickCommodity="_pickCommodity"
              :type="formData.goods_type"
              v-show="formData.data_type == 1"
            ></commodity-radio>
          </van-tab>
          <van-tab title="海报" name="0">
            <ValidationProvider
              name="海报标题"
              rules="required"
              slim
              v-if="formData.data_type == 0"
              v-slot="{ errors }"
            >
              <van-field
                :error-message="errors[0]"
                label="海报标题"
                placeholder="请填写海报标题"
                required
                v-model.trim="formData.title"
              />
            </ValidationProvider>
            <ValidationProvider
              name="关键词1"
              rules="required|min:2|max:6"
              slim
              v-if="formData.data_type == 0"
              v-slot="{ errors }"
            >
              <van-field
                :error-message="errors[0]"
                label="关键词1"
                placeholder="关键词1"
                required
                v-model.trim="keywords[0]"
              />
            </ValidationProvider>
            <ValidationProvider name="关键词2" rules="min:2|max:6" slim v-slot="{ errors }">
              <van-field :error-message="errors[0]" label="关键词2" placeholder="关键词2" v-model.trim="keywords[1]" />
            </ValidationProvider>
            <ValidationProvider name="关键词3" rules="min:2|max:6" slim v-slot="{ errors }">
              <van-field :error-message="errors[0]" label="关键词3" placeholder="关键词3" v-model.trim="keywords[2]" />
            </ValidationProvider>
            <ValidationProvider
              name="海报网址"
              rules="required"
              slim
              v-if="formData.data_type == 0"
              v-slot="{ errors }"
            >
              <van-field
                :error-message="errors[0]"
                clearable
                label="海报网址"
                placeholder="请填写海报网址"
                required
                v-model.trim="formData.url"
              />
            </ValidationProvider>
            <ValidationProvider
              name="播报语音"
              rules="required"
              slim
              v-if="formData.data_type == 0"
              v-slot="{ errors }"
            >
              <van-field
                :error-message="errors[0]"
                label="播报语音"
                maxlength="200"
                placeholder="请填写播报语音"
                required
                rows="3"
                show-word-limit
                type="textarea"
                v-model.trim="formData.read_txt"
              />
            </ValidationProvider>
            <!-- <ValidationProvider
              name="商品原价"
              rules="required|decimal-max2"
              slim
              v-if="formData.data_type == 0"
              v-slot="{ errors }"
            >
              <van-field
                :error-message="errors[0]"
                label="商品原价"
                placeholder="请确认商品原价，避免虚假宣传"
                required
                type="number"
                v-model.trim="formData.old_price"
              />
            </ValidationProvider>
            <ValidationProvider
              name="商品现价"
              rules="required|decimal-max2"
              slim
              v-if="formData.data_type == 0"
              v-slot="{ errors }"
            >
              <van-field
                :error-message="errors[0]"
                label="商品现价"
                placeholder="请确认商品现价，避免虚假宣传"
                required
                type="number"
                v-model.trim="formData.price"
              />
            </ValidationProvider>-->
            <img-cropper
              :confirm="_pickPoster"
              :delete="_deletePoster"
              :list="posterList"
              field="海报图片"
              title="海报图片"
              v-if="formData.data_type == 0"
            ></img-cropper>
            <div class="tip">海报建议上传700*1000分辨率的图片</div>
          </van-tab>
        </van-tabs>
      </van-cell-group>
    </ValidationObserver>
    <!-- 标签选择 -->
    <!-- <van-popup class="normal-popup" position="bottom" safe-area-inset-bottom v-model="showTagPicker">
      <van-list :finished="tFinished" :finished-text="tFinishText" @load="_tOnLoad" v-model="loading">
        <van-checkbox-group :max="3" v-model="formData.label_ids">
          <van-cell-group>
            <van-cell :key="index" :title="item.name" @click="_tToggle(index)" clickable v-for="(item, index) in tList">
              <van-checkbox :name="item.cat_id" ref="checkboxesT" slot="right-icon" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-list>
      <van-button @click="_controlTagPicker">关闭</van-button>
    </van-popup> -->
    <!-- 分类选择 -->
    <!-- <van-popup class="normal-popup" position="bottom" safe-area-inset-bottom v-model="showCatePicker">
      <van-list :finished="cFinished" :finished-text="cFinishText" @load="_cOnLoad" v-model="loading">
        <van-radio-group v-model="formData.cate_id">
          <van-cell-group>
            <van-cell :key="index" :title="item.name" @click="_cToggle(index)" clickable v-for="(item, index) in cList">
              <van-radio :name="item.cat_id" ref="radioC" slot="right-icon" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-list>
      <van-button @click="_controlCatePicker">关闭</van-button>
    </van-popup> -->
    <!-- 选择服务范围 -->
    <van-popup class="service-popup" position="top" safe-area-inset-bottom v-model="showServiceScopePopup">
      <van-checkbox-group class="cache-list" v-model="cache">
        <van-cell-group>
          <van-cell
            :key="index"
            :title="item.name"
            @click="_toggle(index)"
            clickable
            v-for="(item, index) in serviceScopeList"
          >
            <van-checkbox :name="item.id" ref="checkboxes" slot="right-icon"></van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-row>
        <van-col span="12">
          <van-button @click="_controlServiceScopePopup">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_pickServiceScope" type="primary">确定</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <!-- 客人数量类型选则 -->
    <!-- <van-popup position="bottom" safe-area-inset-bottom v-model="showGuestTypePicker">
      <van-picker
        :columns="guestTypeColumns"
        :default-index="statusIndex"
        @cancel="_controlGuestTypePicker"
        @confirm="_pickGuestType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'
import CommodityRadio from '@/components/CommodityRadio'

export default {
  name: 'smartScreenPosterCRU',

  mixins: [],

  components: {
    ImgCropper,
    CommodityRadio,
  },

  props: {},

  data() {
    return {
      formData: {
        data_type: '1',
        sort: '',
        guest_demand_ids: [],
        title: '',
        keywords: '',
        read_txt: '',
        ad_img: '',
        url: '',
        // width: '0.32',
        goods_id: '',
        goods_type: '',
        // cate_id: '',
        // label_ids: [],
        // guest_num: '',
        // guest_num_type: '0',
        // guest_num_min: '',
        // guest_num_max: '',
        // price: '',
        // old_price: '',
      },
      keywords: [],
      posterList: [],
      // showCatePicker: false,
      // showTagPicker: false,
      showServiceScopePopup: false,
      // cPage: 1,
      // cList: [],
      // cFinished: false,
      // tPage: 1,
      // tList: [],
      // tFinished: false,
      loading: false,
      cateName: '',
      tagName: [],
      radioImg: '',
      goods_name: '',
      cache: [],
      serviceScopeList: [],
      // guestTypeColumns: [
      //   {
      //     label: '不限',
      //     value: '0',
      //   },
      //   {
      //     label: '固定人数',
      //     value: '1',
      //   },
      //   {
      //     label: '人数区间',
      //     value: '2',
      //   },
      // ],
      // showGuestTypePicker: false,
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    // cFinishText() {
    //   return this.cList.length ? '没有更多了' : '暂无分类'
    // },
    // tFinishText() {
    //   return this.tList.length ? '没有更多了' : '暂无标签'
    // },
    cateLabel() {
      const item = this.cList.find(item => item.cat_id === this.formData.cate_id)
      return (item && item.name) || this.cateName
    },
    // guestType() {
    //   const item = this.guestTypeColumns.find(item => item.value === this.formData.guest_num_type)
    //   return item && item.label
    // },
  },

  watch: {},

  created() {},

  mounted() {
    this.getSmartScreenDemandList().then(res => {
      this.serviceScopeList = res
      const { id } = this.$route.params
      id && this._getPosterDetail(id)
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', [
      'createPoster',
      'getPosterDetail',
      'updatePoster',
      'getSmartScreenPosterTagAndCateList',
      'getSmartScreenDemandList',
    ]),
    // _controlTagPicker() {
    //   this.showTagPicker = !this.showTagPicker
    // },
    // _controlCatePicker() {
    //   this.showCatePicker = !this.showCatePicker
    // },
    // 服务范围选择开关
    _controlServiceScopePopup() {
      this.showServiceScopePopup = !this.showServiceScopePopup
    },
    // _controlGuestTypePicker() {
    //   this.showGuestTypePicker = !this.showGuestTypePicker
    // },
    // _pickGuestType(item) {
    //   this.formData.guest_num_type = item.value
    //   this._controlGuestTypePicker()
    // },
    _pickPoster(data) {
      this.formData.ad_img = data[0].url
    },
    _deletePoster(data, index) {
      this.formData.ad_img = ''
      this.posterList.splice(index, 1)
    },
    // 获取店铺名称
    _serviceScopeLabel(id) {
      const item = this.serviceScopeList.find(item => item.id === id)
      if (item) {
        return `${item.name}`
      } else {
        return 'index'
      }
    },
    // _tOnLoad() {
    //   const { id } = this.$route.params
    //   this.getSmartScreenPosterTagAndCateList({
    //     page: this.tPage,
    //     data_type: 1,
    //   }).then(res => {
    //     this.loading = false
    //     if (res.lists.length < 10) {
    //       this.tFinished = true
    //     } else {
    //       this.tPage += 1
    //     }
    //     this.tList.push(...res.lists)
    //   })
    // },
    // _cOnLoad() {
    //   const { id } = this.$route.params
    //   this.getSmartScreenPosterTagAndCateList({
    //     page: this.cPage,
    //     data_type: 0,
    //   }).then(res => {
    //     this.loading = false
    //     if (res.lists.length < 10) {
    //       this.cFinished = true
    //     } else {
    //       this.cPage += 1
    //     }
    //     this.cList.push(...res.lists)
    //   })
    // },
    _getPosterDetail(id) {
      this.getPosterDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
        let demand_ids_arr = res.guest_demand_ids.split(',')
        let demand_ids_arr_real = []
        demand_ids_arr.forEach(item => {
          let s = this.serviceScopeList.find(s => {
            if (s.id === item) return s
          })
          if (s) {
            demand_ids_arr_real.push(item)
          }
        })
        this.formData.guest_demand_ids = demand_ids_arr_real
        this.goods_name = res.goods_info.goods_name
        this.cache = demand_ids_arr_real
        if (res.ad_img) {
          this.posterList = [{ url: res.ad_img }]
        }
        // this.formData.width = '0.32'
        this.keywords = res.keywords.split(',')
        // this.tagName = res.label_names
        // this.cateName = res.cate_name
        this.radioImg = res.goods_info.goods_icon
        if (res.goods_id == 0) {
          this.formData.goods_id = ''
        }
      })
    },
    _pickCommodity(id, type) {
      this.formData.goods_id = id
      this.formData.goods_type = type
    },
    _pickServiceScope() {
      const arr = []
      this.cache.forEach(item => {
        arr.push(item)
      })
      this.formData.guest_demand_ids = arr
      this._controlServiceScopePopup()
    },
    _tagLabel(id, index) {
      const item = this.tList.find(item => item.cat_id === id)
      return (item && item.name) || this.tagName[index]
    },
    // 分类选择
    // _cToggle(index) {
    //   this.$refs.radioC[index].toggle()
    // },
    // 标签选择
    // _tToggle(index) {
    //   this.$refs.checkboxesT[index].toggle()
    // },
    // 服务范围选中状态切换
    _toggle(index) {
      // 判断是否选可选
      this.$refs.checkboxes[index].toggle()
    },
    // 提交表单
    async _submit() {
      // 锁
      if (this.loading) return
      // 验证表单
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        // 加锁
        this.loading = true
        // 表单完整，进行数据修改并提交
        const params = JSON.parse(JSON.stringify(this.formData))
        // 去除空的关键词
        let keyArr = []
        this.keywords.forEach(item => {
          if (item != null && item != '' && item != undefined) {
            keyArr.push(item)
          }
        })
        params.keywords = keyArr.join()
        let method = 'createPoster'
        const { imax, id } = this.$route.params
        params.imax_id = imax
        if (id) {
          method = 'updatePoster'
          params.id = id
        } else {
          params.isnew = 1
        }
        // 判断是否选择商品
        if (params.data_type == '1') {
          if (!params.goods_id) {
            this.$toast.info({
              message: '请选择推广商品',
              forbidClick: true,
              duration: 1000,
            })
            this.loading = false
            return
          } else {
            delete params.title
            delete params.url
            delete params.keywords
            delete params.read_txt
            delete params.ad_img
          }
        } else {
          delete params.goods_id
          delete params.goods_type
        }
        params.guest_demand_ids = params.guest_demand_ids.join()

        // 修改label_ids为字符串
        // params.label_ids = params.label_ids.join()
        this[method](params)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this.$goBack()
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
/deep/.tip {
  font-size: 14px;
  padding: 4px 15px;
  color: @gray-deep-c;
}

.normal-popup {
  height: 100vh;
  .van-list {
    padding-bottom: 44px;
  }
  .van-button {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
}

.service-popup {
  .cache-list {
    height: 65vh;
    overflow: scroll;
  }
  .van-button {
    width: 100%;
  }
}
</style>
