import request from './network.js'
// 侧边导航
export function getCategory() {
  return request({
    url: '/category'
  })
}
// 分类商品
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}