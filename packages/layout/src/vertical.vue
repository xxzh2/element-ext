<template>
	<div class="el-vertical-layout">        
		<div ref="frameTop" class="el-vertical-layout-top  panel" style="z-index: 1;background-color: #fff">
			<slot name="top"></slot>           
		</div>
		<div class="panel" :style="'height: calc(100% - ' + (otherHeight) + 'px);padding: 0px 5px 5px 5px; margin-top: 5px'">
			<div ref="frameTool" class="el-vertical-layout-tool " style="margin: 5px 0">
				<slot name="toolbar"></slot>
			</div>
			<div ref="frameMain" class="el-vertical-layout-main" :style="'height: calc(100% - ' + 100 + 'px);'">
				<slot name="center"></slot>
			</div>
			<div ref="frameBottom" class="el-vertical-layout-bottom" style="text-align: left; padding: 7px 5px">
				<slot name="bottom"></slot>
			</div> 
		</div>        
	</div>
</template>
<script>
import { debounce } from "@/utils";
export default {
  name: "ElLayout",
  props: {},
  data() {
    return {
      show: false,
      icon: "el-icon-arrow-right",
      autoResize: true,
      mainHeight: "",
      // 设置表格自适应屏幕高度
      otherHeight: 10,
      defaultOtherHeight: 10
    };
  },
  created() {
    this.$root.eventHub.$on("SearchToggled", () => {
      this.__resizeHanlder();
    });
  },
  mounted() {
    // this.mainHeight = this.$refs.frameMain.clientHeight
    this.mainHeight = 400;
    this.otherHeight = this.$refs["frameTop"].clientHeight + 15;
    this.defaultOtherHeight = this.otherHeight;
    //
    // 设置表格自适应屏幕高度
    // this.mainOffsetTop = this.$refs.frameTop.offsetHeight + this.$refs.frameTool.offsetHeight
    // this.mainOffsetTop = this.$refs.frameTop.offsetHeight + this.$refs.frameTool.offsetHeight
    // this.mainOffsetTop = this.$refs.frameTool.offsetHeight
    // this.mainHeight = document.body.clientHeight - this.mainOffsetTop - 56

    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        let changedSize =
          this.$refs["frameTop"].clientHeight + 15 - this.defaultOtherHeight;

        this.otherHeight = this.defaultOtherHeight + changedSize;
        //console.log(' changedSize',  changedSize, this.defaultOtherHeight, this.otherHeight)
      }, 100);
      window.addEventListener("resize", this.__resizeHanlder);
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.addEventListener("transitionend", this.__resizeHanlder);
  },
  beforeDestroy() {
    //
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHanlder);
    }

    const sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    sidebarElm.removeEventListener("transitionend", this.__resizeHanlder);
  },
  computed: {
    // height: function () {
    //     console.log(this.$refs)
    //     console.log(this.$refs.frameMain)
    //     return 400//this.$refs.frameMain.offsetHeight
    // }
  },
  methods: {
    hidde() {
      this.show = !this.show;
      if (this.show) this.icon = "el-icon-arrow-up";
      else this.icon = "el-icon-arrow-right";
    }
  }
};
</script>

<style lang="scss" scoped>
.el-vertical-layout {
  height: 100%;
  overflow: hidden;
  // border: 1px solid red;
  .el-vertical-layout-top {
    // border: 1px solid red;
  }
  .el-vertical-layout-tool {
    min-height: 30px;
    padding: 5px 0;
    // border: 1px solid blue;
  }
  .el-vertical-layout-bottom {
    // border: 1px solid blue;
  }
  .el-vertical-layout-main {
    // height: 100%;
    overflow: auto;
    // border: 1px solid green;
    background-color: #fefefe;
  }
  .el-button:first-child {
    min-width: 50px;
  }
}
</style>


