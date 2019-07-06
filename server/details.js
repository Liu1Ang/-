import request from './network.js'
// 商品详情
export function getGoodsList(iid) {
  return request({
    url: '/detail',
    data: {
      iid
    }
  })
}
// 推荐商品
export function getGoodsTuiJian() {
  return request({
    url: '/recommend'
  })
}

export function baseInfo(desc,Info,columns){
  return {
    title: desc,
    price:Info.price,
    oldPrice:Info.oldPrice,
    lowNowPrice: Info.lowNowPrice,
    discountDesc:Info.discountDesc,
    columns: columns
  }
}