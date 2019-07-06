// components/l-tab/l-tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(event){
      const index = event.currentTarget.dataset.index;
      this.setData({
        currIndex:index
      });
      const data = {index:index}
      this.triggerEvent("tabclick",data,{})
    }
  }
})
