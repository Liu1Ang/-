// pages/home/childComps/lz-tuiJian/lz-tuiJian.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recomments:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isimg:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isLoading(){
      if(!this.data.isimg){
        this.triggerEvent('isImgLoad');
        this.data.isimg = true
      }
    }
  }
})
