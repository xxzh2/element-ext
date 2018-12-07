<template>
	<div class="el-sift">
		{{msg}}
	</div>
</template>
<script>
export default {
  name: "ElSift",
  model: { prop: "value", event: "handleChanged" },
  props: {
    params: {},
    "get-item": {}
  },
  data() {
    return {
      msg: ""
    };
  },
  mounted() {
    this.load();
  },
  watch: {
    list() {
      this.load();
    },
    params: {
      handler(val) {
        this.load();
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    load() {
      this.getItem(this.params).then(resp => {
        // console.log(resp.result)
        this.msg =
          "共 " + resp.result[0] + "条 / 待整理 " + resp.result[1] + "条";
      });
    }
  }
};
</script>

<style lang="scss">
.el-sift {
  font-size: small;
  font-weight: 400;
  color: #717171;
}
.el-row {
  .el-col {
    margin: 5px 0;
  }
}
</style>
