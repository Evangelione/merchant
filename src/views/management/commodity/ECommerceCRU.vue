<template>
  <div>
    <van-nav-bar
      :title="`${type}${goodsType}商品`"
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="商品名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :placeholder="`${goodsType}商品名称`"
            label="商品名称"
            required
            v-model.trim="formData.name"
          />
        </ValidationProvider>
        <ValidationProvider name="条形码" rules="alpha_num" slim v-if="$route.params.type !== '1'" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="条形码"
            placeholder="条形码数字（选填）"
            v-model.trim="formData.number"
          />
        </ValidationProvider>
        <ValidationProvider name="计数单位" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="计数单位"
            placeholder="如：个、斤、份"
            required
            v-model.trim="formData.unit"
          />
        </ValidationProvider>
        <ValidationProvider name="原价" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="原价"
            placeholder="用于展示给用户看"
            required
            type="number"
            v-model.trim="formData.old_price"
          />
        </ValidationProvider>
        <ValidationProvider name="现价" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="现价"
            placeholder="真实销售价"
            required
            type="number"
            v-model.trim="formData.price"
          />
        </ValidationProvider>
        <ValidationProvider
          name="进价"
          rules="required|decimal-max2"
          slim
          v-if="$route.params.type !== '1'"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            label="进价"
            placeholder="用户看不到进价"
            required
            type="number"
            v-model.trim="formData.cost_price"
          />
        </ValidationProvider>
        <ValidationProvider name="查询关键字1" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="查询关键字1"
            placeholder="查询关键字1"
            required
            v-model.trim="keyword1"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="查询关键字2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="查询关键字2"
            placeholder="查询关键字2"
            v-model.trim="keyword2"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="查询关键字3" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="查询关键字3"
            placeholder="查询关键字3"
            v-model.trim="keyword3"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider
          name="打包费"
          rules="required|decimal-max2"
          slim
          v-if="$route.params.type === '0'"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            label="打包费"
            placeholder="请输入打包费用"
            required
            type="number"
            v-model.trim="formData.packing_charge"
          />
        </ValidationProvider>
        <ValidationProvider name="库存" rules="required|gte-1" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="库存"
            placeholder="库存量"
            required
            v-model.trim="formData.stock_num"
          />
        </ValidationProvider>
        <van-cell title="需要桌台/房间" v-if="$route.params.type === '2'">
          <van-switch active-value="1" inactive-value="0" v-model="formData.need_table" />
        </van-cell>
        <!-- <van-cell title="需要服务人员">
          <van-switch active-value="1" inactive-value="0" v-model="formData.need_service_personnel" />
        </van-cell>-->
        <van-field
          :value="statusLabel"
          @click="_controlStatusPicker"
          error-message-align="right"
          input-align="right"
          is-link
          label="状态"
          readonly
        />
        <van-field
          :value="typesLabel"
          disabled
          error-message-align="right"
          input-align="right"
          is-link
          label="类型"
          readonly
        />
        <ValidationProvider name="商家分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="categoryLabel"
            @click="_controlCategoryPicker"
            @click-left-icon.stop="$toast('商家自定义的分类')"
            error-message-align="right"
            input-align="right"
            is-link
            label="所属分类"
            left-icon="question-o"
            placeholder="选择分类"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="商城分类" rules="required" slim v-if="$route.params.type === '0'" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="platformCategoryLabel"
            @click="_controlPlatformCategoryPicker"
            @click-left-icon.stop="$toast('平台商城的分类，用于商城内分类管理')"
            error-message-align="right"
            input-align="right"
            is-link
            label="所属商城分类"
            left-icon="question-o"
            placeholder="选择商城分类"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="运费模版" rules="required" slim v-if="$route.params.type === '0'" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="freightTemplateLabel"
            @click="_controlFreightTemplatePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="运费模版"
            placeholder="选择运费模版"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider
          name="其他区域运费"
          rules="required|decimal-max2"
          slim
          v-if="$route.params.type === '0'"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            label="其他区域运费"
            placeholder="其他区域运费"
            required
            type="number"
            v-model.trim="formData.freight_value"
          />
        </ValidationProvider>
        <van-field
          :value="freightTypeLabel"
          @click="_controlFreightTypePicker"
          error-message-align="right"
          input-align="right"
          is-link
          label="运费计算方式"
          readonly
          v-if="$route.params.type === '0'"
        />
        <img-cropper
          :confirm="_pickPic"
          :delete="_deletePic"
          :count="5"
          :list="pic"
          field="商品图片"
          title="商品图片"
        ></img-cropper>
        <ValidationProvider name="商品描述" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="商品描述"
            maxlength="100"
            placeholder="商品描述"
            required
            rows="3"
            show-word-limit
            type="textarea"
            v-model.trim="formData.description"
          />
        </ValidationProvider>
        <van-cell title="商品详情"></van-cell>
        <quill-editor :changeHtml="_changeHtml" :context="formData.des" ref="editor"></quill-editor>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 商品状态 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStatusPicker">
      <van-picker
        :columns="statusColumns"
        :default-index="statusIndex"
        @cancel="_controlStatusPicker"
        @confirm="_pickStatus"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 商品类型 -->
    <!-- 商品类型无法修改，暂时不需要 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showTypesPicker">
      <van-picker
        :columns="typesColumns"
        :default-index="typesIndex"
        @cancel="_controlTypesPicker"
        @confirm="_pickTypes"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 所属分类 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker
        :columns="categoryColumns"
        :default-index="categoryIndex"
        @cancel="_controlCategoryPicker"
        @change="_changeCategory"
        @confirm="_pickCategory"
        show-toolbar
        value-key="sort_name"
      ></van-picker>
    </van-popup>
    <!-- 所属商城分类 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showPlatformCategoryPicker">
      <van-picker
        :columns="platFormCategoryColumns"
        :default-index="platformIndex"
        @cancel="_controlPlatformCategoryPicker"
        @change="_changePlatFormCategory"
        @confirm="_pickPlatformCategory"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 运费模版 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showFreightTemplate">
      <van-picker
        :columns="freightTemplateColumns"
        :default-index="freightTemplateIndex"
        @cancel="_controlFreightTemplatePicker"
        @confirm="_pickFreightTemplate"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 运费计算方式 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showFreightType">
      <van-picker
        :columns="freightTypeColumns"
        :default-index="freightTypeIndex"
        @cancel="_controlFreightTypePicker"
        @confirm="_pickFreightType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'
import QuillEditor from '@/components/QuillEditor'

export default {
  name: 'eCommerceCRU',

  mixins: [],

  components: {
    ImgCropper,
    QuillEditor,
  },

  props: {},

  data() {
    return {
      formData: {
        name: '',
        number: '',
        unit: '',
        old_price: '',
        price: '',
        cost_price: '',
        packing_charge: '0',
        stock_num: '',
        status: '1',
        goods_type: '0',
        sort_id: '',
        freight_template: '',
        freight_value: '',
        freight_type: '0',
        pic: [],
        cat_fid: '',
        cat_id: '',
        des: '',
        description: '',
        need_table: '0',
        // need_service_personnel: '0',
        keyword: '',
      },
      statusColumns: [
        { label: '在售', value: '1' },
        { label: '停售', value: '0' },
      ],
      typesColumns: [
        { label: '配送产品', value: '0' },
        { label: '虚拟产品', value: '1' },
        { label: '到店消费产品', value: '2' },
      ],
      freightTemplateColumns: [],
      freightTypeColumns: [
        { label: '按订单最大值', value: '0' },
        { label: '单独计算', value: '1' },
      ],
      categoryColumnsOrigin: [],
      categoryColumns: [],
      platFormCategoryColumnsOrigin: [],
      platFormCategoryColumns: [],
      showStatusPicker: false,
      showTypesPicker: false,
      showCategoryPicker: false,
      showPlatformCategoryPicker: false,
      showFreightTemplate: false,
      showFreightType: false,
      pic: [],
      // submit锁
      loading: false,
      // 后期需要修改的
      sort_fid: '',
      keyword1: '',
      keyword2: '',
      keyword3: '',
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    goodsType() {
      let label = ''
      if (this.$route.params.type === '0') {
        label = '配送'
      } else if (this.$route.params.type === '1') {
        label = '虚拟'
      } else if (this.$route.params.type === '2') {
        label = '到店消费'
      }
      return label
    },
    // 商品状态
    statusLabel() {
      const { label } = this.statusColumns.find(item => item.value === this.formData.status)
      return label
    },
    // 商品状态默认数据
    statusIndex() {
      const index = this.statusColumns.findIndex(item => item.value === this.formData.status)
      return index
    },
    // 商品类型
    typesLabel() {
      const { label } = this.typesColumns.find(item => item.value === this.formData.goods_type)
      return label
    },
    // 商品类型默认数据
    typesIndex() {
      const index = this.statusColumns.findIndex(item => item.value === this.formData.status)
      return index
    },
    // 商品分类默认数据
    categoryIndex() {
      return 0
    },
    // 商城商品分类默认数据
    platformIndex() {
      return 0
    },
    // 运费模版默认数据
    freightTemplateIndex() {
      return 0
    },
    // 运费计算方式默认数据
    freightTypeIndex() {
      return 0
    },
    // 所属零售分类非空验证
    categoryLabel() {
      let resultStr = ''
      if (this.sort_fid) {
        const item = this.categoryColumnsOrigin.find(item => item.sort_id === this.sort_fid)
        if (item) {
          resultStr += item.sort_name
          const child = item.children.find(item => item.sort_id === this.formData.sort_id)
          child && (resultStr += ' / ' + child.sort_name)
        }
      } else {
        const item = this.categoryColumnsOrigin.find(item => item.sort_id === this.formData.sort_id)
        item && (resultStr += item.sort_name)
      }
      return resultStr
    },
    // 平台商城零售分类非空验证
    platformCategoryLabel() {
      let resultStr = ''
      const item = this.platFormCategoryColumnsOrigin.find(item => item.value === this.formData.cat_fid)
      if (item) {
        resultStr = item.label
        if (item.children) {
          const { label } = item.children.find(item => item.value === this.formData.cat_id)
          resultStr += ' / ' + label
        }
      }
      return resultStr
    },
    // 运费模版非空验证
    freightTemplateLabel() {
      const item = this.freightTemplateColumns.find(item => item.value === this.formData.freight_template)
      return item && item.label
    },
    // 运费计算方式非空验证
    freightTypeLabel() {
      const item = this.freightTypeColumns.find(item => item.value === this.formData.freight_type)
      return item && item.label
    },
  },

  watch: {},

  created() {},

  mounted() {
    // 运费模版
    this._getFreightTemPlateList()
    // 平台零售分类
    this._getPlatformECommerceCategoryList()
    // 是否为编辑店铺
    const { id } = this.$route.params
    if (id) {
      this._readECommerceDetail(id)
    } else {
      // 零售分类
      this._getECommerceFirstCategoryList()
    }
    this.formData.goods_type = this.$route.params.type
  },

  destroyed() {},

  methods: {
    ...mapActions('commodity', [
      'getECommerceFirstCategoryList',
      'getPlatformEcommerceCommodityCategoryList',
      'createECommerce',
      'updateECommerce',
      'readECommerceDetail',
    ]),
    ...mapActions('freight', ['getFreightTemPlateList']),
    // 商品状态开关
    _controlStatusPicker() {
      this.showStatusPicker = !this.showStatusPicker
    },
    // 商品类型开关
    _controlTypesPicker() {
      if (this.$route.params.id) return
      this.showTypesPicker = !this.showTypesPicker
    },
    // 商品分类选择开关
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    // 平台商城 商品分类 选择开关
    _controlPlatformCategoryPicker() {
      this.showPlatformCategoryPicker = !this.showPlatformCategoryPicker
    },
    // 运费模版开关
    _controlFreightTemplatePicker() {
      this.showFreightTemplate = !this.showFreightTemplate
    },
    // 运费计算方式开关
    _controlFreightTypePicker() {
      this.showFreightType = !this.showFreightType
    },
    // 商品状态选择
    _pickStatus(data) {
      this.formData.status = data.value
      this._controlStatusPicker()
    },
    // 商品类型选择
    _pickTypes(data) {
      this.formData.goods_type = data.value
      this._controlTypesPicker()
    },
    // 商品分类选择
    _pickCategory(data) {
      if (data[1]) {
        this.sort_fid = data[0].sort_id
        this.formData.sort_id = data[1].sort_id
      } else {
        this.sort_fid = ''
        this.formData.sort_id = data[0].sort_id
      }
      this._controlCategoryPicker()
    },
    // 平台商城 商品分类 选择开关
    _pickPlatformCategory(data) {
      this.formData.cat_fid = data[0].value
      if (data[1]) {
        this.formData.cat_id = data[1].value
      } else {
        this.formData.cat_id = ''
      }
      this._controlPlatformCategoryPicker()
    },
    // 生成商品分类 第二行数据
    _changeCategory(picker, values) {
      picker.setColumnValues(1, values[0].children)
    },
    // 生成平台商城 商品分类 第二行数据
    _changePlatFormCategory(picker, values) {
      if (values[0].children) {
        picker.setColumnValues(1, values[0].children)
      } else {
        picker.setColumnValues(1, [])
      }
    },
    // 运费模版选择
    _pickFreightTemplate(data) {
      this.formData.freight_template = data.value
      this._controlFreightTemplatePicker()
    },
    // 运费计算方式选择
    _pickFreightType(data) {
      this.formData.freight_type = data.value
      this._controlFreightTypePicker()
    },
    // 商品图片截取
    _pickPic(data) {
      this.formData.pic = data.map(item => item.url)
    },
    _deletePic(data, index) {
      this.formData.pic.splice(index, 1)
      this.pic.splice(index, 1)
    },
    _changeHtml(data) {
      this.formData.des = data.html
    },
    // 读取商品分类
    _getECommerceFirstCategoryList(fid, id) {
      this.getECommerceFirstCategoryList().then(res => {
        this.categoryColumnsOrigin = res
        this._serializationECommerceCategory(fid, id)
      })
    },
    // 读取平台平台商城 商品分类
    _getPlatformECommerceCategoryList(fid, id) {
      this.getPlatformEcommerceCommodityCategoryList().then(res => {
        this.platFormCategoryColumnsOrigin = res
        this._serializationPlatformECommerceCategory(fid, id)
      })
    },
    // 读取运费模版列表
    _getFreightTemPlateList() {
      this.getFreightTemPlateList().then(res => {
        this.freightTemplateColumns = res
      })
    },
    // 根据columns原始数据序列化商家商品分类
    _serializationECommerceCategory(fid, id) {
      const data = this.categoryColumnsOrigin
      let index1 = 0
      let index2 = 0
      if (fid && id) {
        index1 = data.findIndex(item => item.sort_id === fid) >= 0 ? data.findIndex(item => item.sort_id === fid) : 0
        index2 =
          data[index1].children.findIndex(item => item.sort_id === id) >= 0
            ? data[index1].children.findIndex(item => item.sort_id === id)
            : 0
      } else if (fid) {
        index1 = data.findIndex(item => item.sort_id === fid) >= 0 ? data.findIndex(item => item.sort_id === fid) : 0
      }

      this.categoryColumns = [
        {
          values: data,
          defaultIndex: index1,
        },
        {
          values: data[index1].children,
          defaultIndex: index2,
        },
      ]
    },
    // 序列化平台商城 商品分类
    _serializationPlatformECommerceCategory(fid, id) {
      const data = this.platFormCategoryColumnsOrigin
      let index1 = 0
      let index2 = 0
      if (fid && id) {
        index1 = data.findIndex(item => item.value === fid) >= 0 ? data.findIndex(item => item.value === fid) : 0
        index2 =
          data[index1].children.findIndex(item => item.value === id) >= 0
            ? data[index1].children.findIndex(item => item.value === id)
            : 0
      }
      this.platFormCategoryColumns = [
        {
          values: data,
          defaultIndex: index1,
        },
        {
          values: data[index1].children,
          defaultIndex: index2,
        },
      ]
    },
    _readECommerceDetail(id) {
      this.readECommerceDetail(id).then(res => {
        // 阻止编辑器自动获取焦点
        this.$refs.editor.$refs.quillEditor.quill.enable(false)
        const keys = Object.keys(this.formData)
        let arr = res['keyword'].split(',')
        this.keyword1 = arr[0]
        this.keyword2 = arr[1]
        this.keyword3 = arr[2]

        keys.forEach(item => {
          this.formData[item] = res[item] || ''
        })

        this.formData.pic = [res.pic[0].url]
        this.pic = res.pic
        if (res.sort_fid) {
          this.sort_fid = res.sort_fid
          this._getECommerceFirstCategoryList(res.sort_fid, res.sort_id)
        } else {
          this._getECommerceFirstCategoryList(res.sort_id)
        }
        this.$nextTick(function() {
          this.$refs.editor.$refs.quillEditor.quill.enable(true)
          this.$refs.editor.$refs.quillEditor.quill.blur()
          window.scroll(0, 0)
        })
      })
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
        let method = 'createECommerce'
        const { id } = this.$route.params
        if (id) {
          method = 'updateECommerce'
          this.formData.goods_id = id
        }
        this.formData.keyword = this.keyword1
        if (this.keyword2) {
          this.formData.keyword += ',' + this.keyword2
        }
        if (this.keyword3) {
          this.formData.keyword += ',' + this.keyword3
        }

        const toast = this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
        })
        this[method](this.formData)
          .then(() => {
            toast.clear()
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1000,
              onClose: () => {
                // 解锁
                this.loading = false
                this.$goBack()
              },
            })
          })
          .catch(() => {
            toast.clear()
            this.loading = false
          })
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
