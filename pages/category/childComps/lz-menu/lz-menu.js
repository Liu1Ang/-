// pages/category/childComps/lz-menu/lz-menu.js
Component({
  properties: {
    categories: {
      type: Array
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    onItemClick(e) {
      const currentIndex = e.currentTarget.dataset.index;
      this.setData({
        currentIndex
      })
      this.triggerEvent('menuclick', { currentIndex }, {})
    }
  }
})
