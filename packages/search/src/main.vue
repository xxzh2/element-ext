<template>
	<div class="el-search">
		<el-row type="flex" class="row-bg" justify="left" align="middle" style="">
			<el-col :span="22" style="text-align: left;margin-right: 13px;padding-right: 29px;">
				<div><slot></slot></div>
				<div v-if="show"><slot name="more"></slot></div>
			</el-col>
			<!--<el-col v-if="disabled" class="toggle" >-->
			<!--&lt;!&ndash;<p @click="hidde">{{text}}</p>&ndash;&gt;-->
			<!--<i :class="icon" @click="hidde"  style="color: #3a8ee6"></i>-->
			<!--<i  :class="icon" @click="hidde"  style="color: #3a8ee6;margin-top: -30px"></i>-->
			<!--</el-col>-->
			<el-col :span="2" style="display: flex;  text-align: right;position: absolute;right: 4px;top: 6px;">
				<el-button type="primary" @click="search" size="mini">查询</el-button>
				<el-button  type='warning' @click="reset" size="mini">重置</el-button>
			</el-col>
		</el-row>
		<el-row v-if="disabled" class="toggle" >
			<!--<p @click="hidde">{{text}}</p>-->
			<i :class="icon" @click="hidde"  style="color: #3a8ee6"></i>
			<i  :class="icon" @click="hidde"  style="color: #3a8ee6;margin-top: -21px"></i>
		</el-row>
	</div>
</template>
<script>
export default {
  name: "ElSearch",
  props: {
    disabled: {
      type: Boolean,
      value: false
    },
    "on-search": {},
    "on-reset": {}
  },
  data() {
    return {
      show: false,
      icon: "el-icon-arrow-down",
      text: "展开更多"
    };
  },
  mounted() {
    this.$root.eventHub.$on("Open", () => {
      this.open();
    });
  },
  computed: {},
  methods: {
    search() {
      this.$emit("search");
    },
    reset() {
      this.$emit("reset");
      this.$emit("search");
    },
    open() {
      this.show = true;
      if (this.show) {
        this.icon = "el-icon-arrow-up";
        this.text = "收起";
      } else {
        this.icon = "el-icon-arrow-down";
        this.text = "展开更多";
      }
      this.$root.eventHub.$emit("SearchToggled");
    },

    hidde() {
      this.show = !this.show;
      if (this.show) {
        this.icon = "el-icon-arrow-up";
        this.text = "收起";
      } else {
        this.icon = "el-icon-arrow-down";
        this.text = "展开更多";
      }
      this.$root.eventHub.$emit("SearchToggled");
    },
    onCommand(cmd) {
      switch (cmd) {
        case "more":
          this.show = true;
          break;
        case "reset":
          this.onReset();
          break;
        default:
      }
    }
  }
};
</script>

<style lang="scss">
.toggle {
  display: flex;
  bottom: 2px;
  align-items: center;
  flex-direction: column;
  left: 50%;
  width: 80px;
  height: 15px;
  margin: 0 !important;
  transform: translateX(-40px);
  font-size: 12px;
  justify-content: space-evenly;
  color: #606266;
  /*box-shadow: 0 0 8px 2px #d3d2d2 ,0 0 8px 2px #d3d2d2 ,0 0 8px 2px #d3d2d2;*/
  .el-icon-arrow-down:before {
    font-size: 15px;
  }
}

.el-search .el-form-item--mini.el-form-item,
.el-search .el-form-item--small.el-form-item {
  margin-bottom: 0px !important;
}

.el-row {
  .el-col {
    margin: 5px 0;
  }
}
</style>
