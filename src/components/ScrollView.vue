<template>
  <!-- ref用以获取wrapper的dom元素 -->
  <div id="wrapper" ref="wrapper">
    <!-- 由于内部的内容不确定，所以放一个插槽在这，谁要使用iscroll再添加进来 -->
    <slot></slot>
  </div>
</template>

<script>
import IScroll from "iscroll/build/iscroll-probe";
export default {
  name: "ScrollView",
  components: "",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      /*需要使用iscroll-probe.js才能生效
      probeType：1  滚动不繁忙的时候触发
      probeType：2  滚动时每隔一定时间触发
      probeType：3  每滚动一像素触发一次*/
      probeType: 3,
      // 显示滚动条
      // scrollbars: true,

      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      // disablePointer: true,
      // disableTouch: false,
      // disableMouse: true,
    });
    // 创建一个观察者的对象
    /*
        MutationObserver只要监听到指定内容发生变化，就会执行回调函数
        mutationList：发生变化的数组
        observer：观察者的对象
    */
    var observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh();
    });
    // 2.告诉观察者对象观察什么内容
    const config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为 false，设置为 true 可以观察后代节点
      attributeFilter: ["height", "offsetHeight"], // 观察特定属性
    };
    // 3.告诉观察者对象需要观察谁，观察什么内容
    /**
     * 参数1：告诉观察者对象需要观察谁
     * 参数2：告诉观察者对象观察什么内容
     */
    observer.observe(this.$refs.wrapper, config);
  },
  methods: {
    // 监听滚动距离
    scrolling(fn) {
      this.iscroll.on("scroll", function () {
        fn(this.y);
      });
    },
    refresh() {
      setTimeout(() => {
        this.iscroll.refresh();
      }, 100);
    },
    scrollTo(x, y, time) {
      this.iscroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  height: 100%;
}
</style>
