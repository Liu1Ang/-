// pages/detail/detail.js
import { getGoodsList, getGoodsTuiJian, baseInfo, shopInfo } from '../../server/details.js'

const app = getApp()

Page({
  data: {
    iid:'',
    titleImg:[],
    baseInfos:{},
    shopInfos:{},
    paramInfos:{},
    goodsXq:{},
    goodsPj:{},
    tuijian:[]
  },

  onLoad: function (options) {
    this.setData({
      iid:options.iid
    })
    this._getGoodsLists();
    this._getGoodsTuiJian();
  },
  // 请求商品
  _getGoodsLists(){
    getGoodsList(this.data.iid).then(res => {
      // console.log(res);
      const data = res.data.result;
      const titleImg = data.itemInfo.topImages;
      const baseInfos = baseInfo(data.skuInfo.title, data.itemInfo, data.columns);
      const shopInfos = data.shopInfo;
      const paramInfos = data.itemParams;
      const goodsXq = data.detailInfo;
      const goodsPj = data.rate;
      this.setData({
        data: data,
        titleImg: titleImg,
        baseInfos: baseInfos,
        shopInfos: shopInfos,
        paramInfos: paramInfos,
        goodsXq: goodsXq,
        goodsPj: goodsPj
      })
    })
  },
  // 商品推荐
  _getGoodsTuiJian(){
    getGoodsTuiJian().then(res =>{
      // console.log(res);
      const datas = [];
      const list = res.data.data.list;
      datas.push(...list);
      this.setData({
        tuijian:datas
      })
    })
  },
  onAddCart(){
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.titleImg[0];
    obj.title = this.data.baseInfos.title;
    obj.desc = this.data.goodsXq.desc;
    obj.price = this.data.baseInfos.lowNowPrice;

    app.addToCart(obj);

    wx.showToast({
      title: '加入购物车成功',
    })
  }
})