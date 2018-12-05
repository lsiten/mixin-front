<template>
  <div class="home-index">
    <div ref="lsitenTopBox">
      <swiper @on-index-change="onFocusIndexChange" v-model="focusIndex">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in focusData" :key="index">
          <img :src="item.img">
        </swiper-item>
      </swiper>
      <group gutter="0">
        <cell>
          <span slot="title" class="notice-title">
            {{$t('components.home.notice')}}
            <i class="iconfont icon-gonggao"></i>
          </span>
          <marquee>
            <marquee-item v-for="(notice, key) in notices" :key="key">{{ notice.title}}</marquee-item>
          </marquee>
        </cell>
      </group>
    </div>
    <div :class="['lsiten-content', {'fixedTop': noShowAll}]">
      <button-tab v-model="showSelect">
        <button-tab-item>{{ $t('components.home.welfareZone') }}</button-tab-item>
        <button-tab-item>{{ $t('components.home.haveDomain') }}</button-tab-item>
        <button-tab-item>{{ $t('components.home.needDomain') }}</button-tab-item>
      </button-tab>
      <scroller lock-x height="-150">
        <div class="lsiten-tabs-content" >
          <!-- 福利区 -->
          <div class="lsiten-tab-item lsiten-tab-1" v-if="showSelect === 0">
            <x-table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ $t('components.home.table.domain') }}</th>
                  <th>{{ $t('components.home.table.cost') }}</th>
                  <th>{{ $t('components.home.table.status') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in domains" :key="index">
                  <td>{{(index + 1)}}</td>
                  <td>{{item.domain}}</td>
                  <td>{{item.cost}}</td>
                  <td><span class="lsiten-click-able">{{ $t('components.home.wantBuy') }}</span></td>
                </tr>
              </tbody>
            </x-table>
          </div>
          <!-- 有域名 -->
          <div class="lsiten-tab-item lsiten-tab-2" v-if="showSelect === 1">
            <group>
              <x-input :title="$t('components.home.form.domain')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form.domain')" novalidate v-model="haveForm.domain"></x-input>
              <x-input :title="$t('components.home.form.account')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form.account')" novalidate v-model="haveForm.account"></x-input>
              <x-input :title="$t('components.home.form.cost')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form.cost')" novalidate v-model="haveForm.cost"></x-input>
              <x-input :title="$t('components.home.form.qq')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form.qq')" novalidate v-model="haveForm.qq"></x-input>
              <x-input :title="$t('components.home.form.wx')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form.wx')" novalidate v-model="haveForm.weixin"></x-input>              
              <x-input :title="$t('components.home.form.phone')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form.phone')" novalidate v-model="haveForm.phone"></x-input>              
            </group>
            <group>
               <x-button type="primary" >{{$t('components.home.form.submit')}}</x-button>
            </group>
          </div>
          <!-- 要域名 -->
          <div class="lsiten-tab-item lsiten-tab-3" v-if="showSelect === 2">
            <group>
              <x-input :title="$t('components.home.form2.domain')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form2.domain')" novalidate v-model="needForm.domain"></x-input>
              <x-input :title="$t('components.home.form2.account')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form2.account')" novalidate v-model="needForm.account"></x-input>
              <x-input :title="$t('components.home.form2.qq')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form2.qq')" novalidate v-model="needForm.qq"></x-input>
              <x-input :title="$t('components.home.form2.wx')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form2.wx')" novalidate v-model="needForm.weixin"></x-input>              
              <x-input :title="$t('components.home.form2.phone')" :placeholder="$t('components.home.form.prefix') + $t('components.home.form2.phone')" novalidate v-model="needForm.phone"></x-input>              
            </group>
            <group>
               <x-button type="primary" >{{$t('components.home.form2.submit')}}</x-button>
            </group>
          </div>
        </div>
      </scroller>
    </div>
    <div class="showAll" @click="showAllClick" v-show="noShowAll">
      <x-icon type="ios-arrow-thin-up" size="30" class="icon"></x-icon>
    </div>
  </div>
</template>

<script>
import { Radio, Group, Swiper, SwiperItem, Cell, Marquee, MarqueeItem, Scroller, ButtonTab, ButtonTabItem, XTable, XInput, XButton } from 'vux'

const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
  title: '送你一次旅行'
}]

const bastDataDomain = [
  {
    id: 1,
    domain: 'lsiten.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 3,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  },
  {
    id: 2,
    domain: 'yizhao.cn',
    cost: '0.012XIN',
    status: 0
  }
]
export default {
  name: 'home-index',
  components: {
    Radio,
    Group,
    SwiperItem,
    Swiper,
    Marquee,
    MarqueeItem,
    Cell,
    Scroller,
    ButtonTab,
    ButtonTabItem,
    XTable,
    XInput,
    XButton
  },
  mounted () {
    let _this = this
    document.addEventListener('scroll', function (e) {
      if (_this.showAll) {
        return false
      }
      let ele = e.target || e.srcElement
      if (ele.id === 'vux_view_box_body') {
        let scrollTop = ele.scrollTop
        if (scrollTop >= _this.scrollTop / 2) {
          ele.scrollTop = _this.scrollTop
          _this.noShowAll = true
        }
      }
      e.stopImmediatePropagation()
    }, true)
  },
  data () {
    return {
      noShowAll: false,
      scrollTop: 224,
      showSelect: 0,
      focusData: baseList,
      focusIndex: 0,
      notices: [
        {
          title: '测试1'
        },
        {
          title: '测试2'
        },
        {
          title: '测试3'
        }
      ],
      domains: bastDataDomain,
      haveForm: {
        domain: '',
        account: '',
        cost: '',
        qq: '',
        weixin: '',
        phone: ''
      },
      needForm: {
        domain: '',
        account: '',
        qq: '',
        weixin: '',
        phone: ''
      }
    }
  },
  created () {
    this.$vux.bus && this.$vux.bus.$on('vux:after-view-enter', this.init)
  },
  destroyed () {
    this.$vux.bus && this.$vux.bus.$off('vux:after-view-enter', this.init)
  },
  methods: {
    init () {
      console.log(1)
    },
    onFocusIndexChange: function (lang) {
    },
    showAllClick () {
      this.noShowAll = false
    }
  }
}
</script>

<style lang="less" scoped>
.home-index {
   height: 100%;
   position: relative;
  .fixedTop{
    position: fixed;
    top: 46px;
    width: 100%;
    box-sizing: border-box;
  }
  .showAll {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    border-radius: 50% 50%;
    background: #F09805;
    text-align: center;
    .icon {
      fill: #fff;
    }
  }
  .lsiten-content {
    padding: 20px 10px 50px 10px;
    background-color: #ffffff;
    height: 100%;
    .lsiten-tabs-content {
      width: 100%;
      margin-top: 10px;
    }
    .lsiten-click-able {
      color: #608698;
    }
  }
  .swiper-demo-img img {
    width: 100%;
  }
  .notice-title {
    color: #9f0000;
  }
  .weui-cells {
    margin-top: 0;
  }
}

</style>

