// pages/home/home.js
import { getMultiData, getgoods } from '../../server/home.js'

const types = ['pop','new','sell'];
const top_number = 1000

Page({
  data: {
    banners:[],
    recomments:[],
    titles:['流行','新款','精选'],
    goods:{
      "pop":{page:0,list:[]},
      "new":{page:0,list:[]},
      "sell":{page:0,list:[]}
    },
    currentType:'pop',
    isBackTop:false,
    isTab:false,
    tabScrollTop:0
  },
  onLoad: function (options) {
    // 轮播图请求
    this._getMultiData();
    // 商品数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
  },
  _getGoodsData(type){
    const page = this.data.goods[type].page + 1;
    getgoods(type, page).then(res =>{
      // console.log(res);
      const list = res.data.data.list;
      const oldlist = this.data.goods[type].list;
      // 将每一项push 列表中
      oldlist.push(...list);
      // 拼接对象
      const goodstype = `goods.${type}.list`;
      const goodspage = `goods.${type}.page`;
      this.setData({
        [goodstype]:oldlist,
        [goodspage]:page
      })
    })
  },
  _getMultiData(){
    // 1、请求数据
    getMultiData().then(res => {
      const banners = res.data.data.banner.list;
      const recomments = res.data.data.recommend.list;
      this.setData({
        banners: banners,
        recomments: recomments
      })
    })
  },
  // 事件监听
  handTabclick(event){
   const index = event.detail.index;
    this.setData({
      currentType:types[index]
    })
  },
  // 底部刷新
  onReachBottom(){
    // 上拉加载
    this._getGoodsData(this.data.currentType);
  },
  // 推荐商品加载完成
  handisImgLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect =>{
      this.data.tabScrollTop = rect.top;
      console.log(rect)
    }).exec()
  },
  // 滚动事件
  onPageScroll(options){
    // 返回顶部
    const topScroll = options.scrollTop;
    const flag = topScroll >= top_number;
    if (flag != this.data.isBackTop){
      this.setData({
        isBackTop:flag
      })
    }
    const flag1 = topScroll >= this.data.tabScrollTop;
    if (flag1 != this.data.isTab){
      this.setData({
        isTab: flag1
      })
    }
  }
})