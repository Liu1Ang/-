// pages/category/category.js
import { getCategory, getCategoryDetail } from '../../server/category.js'

Page({
  data: {
    categories: [],
    categoryData: [],
    currentIndex: 0
  },
  onLoad: function (options) {
    this._getCategorys();
  },
  _getCategorys(){
    getCategory().then(res=>{
      // console.log(res);
      const data = res.data.data;
      const list = data.category.list;
      const categorie = [];
      categorie.push(...list);
      this.setData({
        categories: categorie
      })
      const miniWall = this.data.categories[0].miniWallkey;
      this._getCategoryDetails(miniWall, 'pop')
    })
   
  },
  _getCategoryDetails(){
    const index = this.data.currentIndex;
    // console.log(index);
    const miniWall = this.data.categories[index].miniWallkey;
    getCategoryDetail(miniWall, 'pop').then(res=>{
      // console.log(res);
      const list = res.data;
      const arr = [];
      arr.push(...list);
      this.setData({
        categoryData: arr
      })
    })
  },
  menuclick(options){
    this.setData({
      currentIndex:options.detail.currentIndex
    })
    this._getCategoryDetails()
  }
})